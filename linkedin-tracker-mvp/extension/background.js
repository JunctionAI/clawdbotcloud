// Background service worker for LinkedIn Tracker

console.log('LinkedIn Tracker: Background script loaded');

// Initialize storage on install
chrome.runtime.onInstalled.addListener(async () => {
  console.log('LinkedIn Tracker: Extension installed');
  
  // Set default settings
  await chrome.storage.local.set({
    isPro: false,
    licenseKey: null,
    followUpIntervals: {
      first: 3, // 3 days
      second: 7, // 7 days
      third: 14 // 14 days
    },
    notificationsEnabled: true
  });
  
  // Set up alarms for follow-up checks
  chrome.alarms.create('checkFollowUps', {
    periodInMinutes: 60 // Check every hour
  });
  
  updateBadge();
});

// Listen for messages from content script and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('LinkedIn Tracker: Message received:', request.action);
  
  if (request.action === 'saveLead') {
    handleSaveLead(request.lead).then(result => {
      sendResponse(result);
    });
    return true; // Keep channel open for async response
  }
  
  if (request.action === 'getStats') {
    getStats().then(stats => {
      sendResponse(stats);
    });
    return true;
  }
  
  if (request.action === 'updateBadge') {
    updateBadge();
    sendResponse({ success: true });
  }
  
  if (request.action === 'markAsResponded') {
    markAsResponded(request.profileUrl).then(result => {
      sendResponse(result);
    });
    return true;
  }
  
  if (request.action === 'openDashboard') {
    chrome.tabs.create({
      url: chrome.runtime.getURL('dashboard.html')
    });
    sendResponse({ success: true });
  }
  
  if (request.action === 'checkLimit') {
    checkLeadLimit().then(result => {
      sendResponse(result);
    });
    return true;
  }
});

// Handle saving lead
async function handleSaveLead(lead) {
  try {
    // Check lead limit (free tier: 10 leads)
    const limitCheck = await checkLeadLimit();
    
    if (!limitCheck.canAdd) {
      // Show upgrade notification
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'Upgrade to Pro',
        message: `You've reached the free tier limit (10 leads). Upgrade to Pro for unlimited tracking!`,
        buttons: [{ title: 'Upgrade Now' }],
        requireInteraction: true
      });
      
      return { success: false, error: 'LIMIT_REACHED' };
    }
    
    // Import storage module
    const storage = await getStorage();
    await storage.addLead(lead);
    
    // Update badge
    updateBadge();
    
    // Schedule follow-up alarm
    scheduleFollowUpCheck();
    
    return { success: true };
  } catch (error) {
    console.error('Error saving lead:', error);
    return { success: false, error: error.message };
  }
}

// Check if user can add more leads (free tier limit)
async function checkLeadLimit() {
  const { isPro } = await chrome.storage.local.get(['isPro']);
  
  if (isPro) {
    return { canAdd: true, isProUser: true };
  }
  
  // Free tier: 10 leads max
  const storage = await getStorage();
  const leads = await storage.getLeads();
  
  return {
    canAdd: leads.length < 10,
    isProUser: false,
    current: leads.length,
    limit: 10
  };
}

// Mark lead as responded
async function markAsResponded(profileUrl) {
  try {
    const storage = await getStorage();
    const leads = await storage.getLeads();
    
    const lead = leads.find(l => l.profileUrl === profileUrl && l.status === 'pending');
    
    if (lead) {
      await storage.updateLead(lead.id, {
        status: 'responded',
        responded: true,
        responseTimestamp: Date.now(),
        temperature: 'warm' // Auto-upgrade temperature
      });
      
      updateBadge();
      
      return { success: true };
    }
    
    return { success: false, error: 'Lead not found' };
  } catch (error) {
    console.error('Error marking as responded:', error);
    return { success: false, error: error.message };
  }
}

// Get stats for badge
async function getStats() {
  try {
    const storage = await getStorage();
    return await storage.getStats();
  } catch (error) {
    console.error('Error getting stats:', error);
    return {
      total: 0,
      pending: 0,
      responded: 0,
      needFollowUp: 0,
      conversionRate: 0
    };
  }
}

// Update extension badge
async function updateBadge() {
  try {
    const stats = await getStats();
    const count = stats.needFollowUp;
    
    if (count > 0) {
      chrome.action.setBadgeText({ text: count.toString() });
      chrome.action.setBadgeBackgroundColor({ color: '#FF4444' });
    } else {
      chrome.action.setBadgeText({ text: '' });
    }
  } catch (error) {
    console.error('Error updating badge:', error);
  }
}

// Check for follow-ups and send notifications
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'checkFollowUps') {
    await checkAndNotifyFollowUps();
  }
});

async function checkAndNotifyFollowUps() {
  try {
    const { notificationsEnabled } = await chrome.storage.local.get(['notificationsEnabled']);
    if (!notificationsEnabled) return;
    
    const storage = await getStorage();
    const leads = await storage.getLeads({ status: 'pending' });
    const now = Date.now();
    
    const needFollowUp = leads.filter(l => l.nextFollowUp && l.nextFollowUp <= now);
    
    if (needFollowUp.length > 0) {
      const lead = needFollowUp[0]; // Show first one
      
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: '⏰ Follow-up Reminder',
        message: `Time to follow up with ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
        buttons: [
          { title: 'Open LinkedIn' },
          { title: 'Snooze 1 day' }
        ],
        requireInteraction: false
      });
      
      updateBadge();
    }
  } catch (error) {
    console.error('Error checking follow-ups:', error);
  }
}

function scheduleFollowUpCheck() {
  chrome.alarms.create('checkFollowUps', {
    periodInMinutes: 60
  });
}

// Handle notification button clicks
chrome.notifications.onButtonClicked.addListener(async (notificationId, buttonIndex) => {
  if (buttonIndex === 0) {
    // Open LinkedIn messaging
    chrome.tabs.create({ url: 'https://www.linkedin.com/messaging/' });
  } else if (buttonIndex === 1) {
    // Snooze for 1 day
    const storage = await getStorage();
    const leads = await storage.getLeads({ status: 'pending' });
    const now = Date.now();
    const needFollowUp = leads.filter(l => l.nextFollowUp && l.nextFollowUp <= now);
    
    if (needFollowUp.length > 0) {
      await storage.updateLead(needFollowUp[0].id, {
        nextFollowUp: now + (24 * 60 * 60 * 1000) // +1 day
      });
      updateBadge();
    }
  }
  
  chrome.notifications.clear(notificationId);
});

// Helper to get storage instance
async function getStorage() {
  // Import storage dynamically (service worker context)
  if (typeof storage === 'undefined') {
    // In service worker, we need to import the storage script
    // For now, we'll use chrome.storage as fallback
    // In production, you'd bundle this properly
    return {
      addLead: async (lead) => {
        const { leads = [] } = await chrome.storage.local.get(['leads']);
        const newLead = {
          id: Date.now(),
          ...lead,
          timestamp: Date.now(),
          status: 'pending',
          temperature: 'cold',
          responded: false,
          nextFollowUp: Date.now() + (3 * 24 * 60 * 60 * 1000),
          followUpsSent: 0,
          notes: ''
        };
        leads.push(newLead);
        await chrome.storage.local.set({ leads });
        return newLead.id;
      },
      getLeads: async (filter = {}) => {
        const { leads = [] } = await chrome.storage.local.get(['leads']);
        let filtered = leads;
        
        if (filter.status) {
          filtered = filtered.filter(l => l.status === filter.status);
        }
        
        return filtered.sort((a, b) => b.timestamp - a.timestamp);
      },
      updateLead: async (id, updates) => {
        const { leads = [] } = await chrome.storage.local.get(['leads']);
        const index = leads.findIndex(l => l.id === id);
        if (index !== -1) {
          leads[index] = { ...leads[index], ...updates };
          await chrome.storage.local.set({ leads });
        }
      },
      getStats: async () => {
        const { leads = [] } = await chrome.storage.local.get(['leads']);
        const now = Date.now();
        
        return {
          total: leads.length,
          pending: leads.filter(l => l.status === 'pending').length,
          responded: leads.filter(l => l.status === 'responded').length,
          dead: leads.filter(l => l.status === 'dead').length,
          needFollowUp: leads.filter(l => l.nextFollowUp && l.nextFollowUp <= now && l.status === 'pending').length,
          conversionRate: leads.length > 0 ? ((leads.filter(l => l.status === 'responded').length / leads.length) * 100).toFixed(1) : 0
        };
      }
    };
  }
  
  return storage;
}
