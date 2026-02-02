// IndexedDB wrapper for lead tracking

class LeadStorage {
  constructor() {
    this.dbName = 'LinkedInTrackerDB';
    this.version = 1;
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        if (!db.objectStoreNames.contains('leads')) {
          const leadStore = db.createObjectStore('leads', { keyPath: 'id', autoIncrement: true });
          leadStore.createIndex('profileUrl', 'profileUrl', { unique: false });
          leadStore.createIndex('timestamp', 'timestamp', { unique: false });
          leadStore.createIndex('status', 'status', { unique: false });
          leadStore.createIndex('nextFollowUp', 'nextFollowUp', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };
    });
  }

  async addLead(lead) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['leads'], 'readwrite');
      const store = transaction.objectStore('leads');
      
      const leadData = {
        name: lead.name,
        profileUrl: lead.profileUrl,
        company: lead.company || '',
        messageText: lead.messageText,
        timestamp: Date.now(),
        status: 'pending', // pending, responded, dead
        temperature: 'cold', // cold, warm, hot
        responded: false,
        responseText: null,
        responseTimestamp: null,
        nextFollowUp: Date.now() + (3 * 24 * 60 * 60 * 1000), // 3 days
        followUpsSent: 0,
        notes: ''
      };
      
      const request = store.add(leadData);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getLeads(filter = {}) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['leads'], 'readonly');
      const store = transaction.objectStore('leads');
      const request = store.getAll();
      
      request.onsuccess = () => {
        let leads = request.result;
        
        // Apply filters
        if (filter.status) {
          leads = leads.filter(l => l.status === filter.status);
        }
        if (filter.temperature) {
          leads = leads.filter(l => l.temperature === filter.temperature);
        }
        if (filter.search) {
          const search = filter.search.toLowerCase();
          leads = leads.filter(l => 
            l.name.toLowerCase().includes(search) || 
            (l.company && l.company.toLowerCase().includes(search))
          );
        }
        
        // Sort by timestamp (newest first)
        leads.sort((a, b) => b.timestamp - a.timestamp);
        
        resolve(leads);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getLeadById(id) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['leads'], 'readonly');
      const store = transaction.objectStore('leads');
      const request = store.get(id);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updateLead(id, updates) {
    if (!this.db) await this.init();
    
    return new Promise(async (resolve, reject) => {
      const lead = await this.getLeadById(id);
      if (!lead) return reject('Lead not found');
      
      const updatedLead = { ...lead, ...updates };
      
      const transaction = this.db.transaction(['leads'], 'readwrite');
      const store = transaction.objectStore('leads');
      const request = store.put(updatedLead);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteLead(id) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['leads'], 'readwrite');
      const store = transaction.objectStore('leads');
      const request = store.delete(id);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getStats() {
    const leads = await this.getLeads();
    const now = Date.now();
    
    return {
      total: leads.length,
      pending: leads.filter(l => l.status === 'pending').length,
      responded: leads.filter(l => l.status === 'responded').length,
      dead: leads.filter(l => l.status === 'dead').length,
      needFollowUp: leads.filter(l => l.nextFollowUp && l.nextFollowUp <= now && l.status === 'pending').length,
      conversionRate: leads.length > 0 ? ((leads.filter(l => l.status === 'responded').length / leads.length) * 100).toFixed(1) : 0,
      avgResponseTime: this.calculateAvgResponseTime(leads.filter(l => l.status === 'responded'))
    };
  }

  calculateAvgResponseTime(respondedLeads) {
    if (respondedLeads.length === 0) return 'N/A';
    
    const times = respondedLeads
      .filter(l => l.responseTimestamp)
      .map(l => l.responseTimestamp - l.timestamp);
    
    if (times.length === 0) return 'N/A';
    
    const avgMs = times.reduce((a, b) => a + b, 0) / times.length;
    const avgDays = Math.round(avgMs / (24 * 60 * 60 * 1000));
    
    return avgDays === 0 ? '< 1 day' : `${avgDays} days`;
  }

  async getSetting(key) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['settings'], 'readonly');
      const store = transaction.objectStore('settings');
      const request = store.get(key);
      
      request.onsuccess = () => resolve(request.result?.value);
      request.onerror = () => reject(request.error);
    });
  }

  async setSetting(key, value) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['settings'], 'readwrite');
      const store = transaction.objectStore('settings');
      const request = store.put({ key, value });
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async exportToCSV() {
    const leads = await this.getLeads();
    
    const headers = ['Name', 'Company', 'Profile URL', 'Message', 'Sent Date', 'Status', 'Temperature', 'Responded', 'Response Date', 'Notes'];
    const rows = leads.map(l => [
      l.name,
      l.company || '',
      l.profileUrl,
      l.messageText,
      new Date(l.timestamp).toLocaleDateString(),
      l.status,
      l.temperature,
      l.responded ? 'Yes' : 'No',
      l.responseTimestamp ? new Date(l.responseTimestamp).toLocaleDateString() : '',
      l.notes || ''
    ]);
    
    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    
    return csv;
  }
}

// Singleton instance
const storage = new LeadStorage();
