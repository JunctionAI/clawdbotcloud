// Dashboard script

let allLeads = [];
let filteredLeads = [];
let currentEditId = null;

document.addEventListener('DOMContentLoaded', async () => {
  await loadDashboard();
  
  // Event listeners
  document.getElementById('filter-status').addEventListener('change', applyFilters);
  document.getElementById('filter-temp').addEventListener('change', applyFilters);
  document.getElementById('filter-search').addEventListener('input', applyFilters);
  
  document.getElementById('export-csv').addEventListener('click', exportToCSV);
  document.getElementById('upgrade-pro').addEventListener('click', () => {
    window.open('https://linkedintracker.app/upgrade', '_blank');
  });
  
  document.getElementById('cancel-edit').addEventListener('click', closeEditModal);
  document.getElementById('edit-form').addEventListener('submit', saveEdit);
  
  // Close modal on background click
  document.getElementById('edit-modal').addEventListener('click', (e) => {
    if (e.target.id === 'edit-modal') {
      closeEditModal();
    }
  });
});

async function loadDashboard() {
  // Load stats
  chrome.runtime.sendMessage({ action: 'getStats' }, (stats) => {
    if (stats) {
      document.getElementById('stat-total').textContent = stats.total;
      document.getElementById('stat-pending').textContent = stats.pending;
      document.getElementById('stat-responded').textContent = stats.responded;
      document.getElementById('stat-followup').textContent = stats.needFollowUp;
      document.getElementById('stat-conversion').textContent = `${stats.conversionRate}% conversion`;
    }
  });
  
  // Load leads
  const { leads = [] } = await chrome.storage.local.get(['leads']);
  allLeads = leads;
  filteredLeads = leads;
  
  renderLeads();
}

function applyFilters() {
  const statusFilter = document.getElementById('filter-status').value;
  const tempFilter = document.getElementById('filter-temp').value;
  const searchFilter = document.getElementById('filter-search').value.toLowerCase();
  
  filteredLeads = allLeads.filter(lead => {
    if (statusFilter && lead.status !== statusFilter) return false;
    if (tempFilter && lead.temperature !== tempFilter) return false;
    if (searchFilter) {
      const searchable = `${lead.name} ${lead.company || ''}`.toLowerCase();
      if (!searchable.includes(searchFilter)) return false;
    }
    return true;
  });
  
  renderLeads();
}

function renderLeads() {
  const container = document.getElementById('leads-container');
  document.getElementById('lead-count').textContent = filteredLeads.length;
  
  if (filteredLeads.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <h3>No leads found</h3>
        <p>Start messaging on LinkedIn to track your outreach!</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Lead</th>
          <th>Message</th>
          <th>Date</th>
          <th>Status</th>
          <th>Temp</th>
          <th>Next Follow-up</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${filteredLeads.map(lead => `
          <tr>
            <td>
              <div class="lead-name">
                ${escapeHtml(lead.name)}
              </div>
              ${lead.company ? `<div class="lead-company">${escapeHtml(lead.company)}</div>` : ''}
            </td>
            <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${escapeHtml(lead.messageText.substring(0, 80))}${lead.messageText.length > 80 ? '...' : ''}
            </td>
            <td>${formatDate(lead.timestamp)}</td>
            <td>
              <span class="status-badge status-${lead.status}">
                ${lead.status}
              </span>
            </td>
            <td>
              <span class="temp-${lead.temperature}">
                ${getTemperatureIcon(lead.temperature)} ${capitalize(lead.temperature)}
              </span>
            </td>
            <td>
              ${lead.status === 'pending' ? formatFollowUpDate(lead.nextFollowUp) : '-'}
            </td>
            <td>
              <div class="action-btns">
                <button class="action-btn-small" onclick="editLead(${lead.id})">✏️ Edit</button>
                <button class="action-btn-small" onclick="openLinkedIn('${lead.profileUrl}')">💼 Open</button>
                <button class="action-btn-small" onclick="deleteLead(${lead.id})">🗑️</button>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function editLead(id) {
  const lead = allLeads.find(l => l.id === id);
  if (!lead) return;
  
  currentEditId = id;
  document.getElementById('edit-lead-id').value = id;
  document.getElementById('edit-status').value = lead.status;
  document.getElementById('edit-temp').value = lead.temperature;
  document.getElementById('edit-notes').value = lead.notes || '';
  
  document.getElementById('edit-modal').classList.add('active');
}

function closeEditModal() {
  document.getElementById('edit-modal').classList.remove('active');
  currentEditId = null;
}

async function saveEdit(e) {
  e.preventDefault();
  
  const id = parseInt(document.getElementById('edit-lead-id').value);
  const updates = {
    status: document.getElementById('edit-status').value,
    temperature: document.getElementById('edit-temp').value,
    notes: document.getElementById('edit-notes').value
  };
  
  // Update in storage
  const { leads = [] } = await chrome.storage.local.get(['leads']);
  const index = leads.findIndex(l => l.id === id);
  
  if (index !== -1) {
    leads[index] = { ...leads[index], ...updates };
    await chrome.storage.local.set({ leads });
    
    allLeads = leads;
    applyFilters();
    closeEditModal();
    
    // Refresh stats
    await loadDashboard();
  }
}

async function deleteLead(id) {
  if (!confirm('Are you sure you want to delete this lead?')) return;
  
  const { leads = [] } = await chrome.storage.local.get(['leads']);
  const filtered = leads.filter(l => l.id !== id);
  
  await chrome.storage.local.set({ leads: filtered });
  
  allLeads = filtered;
  applyFilters();
  await loadDashboard();
}

function openLinkedIn(profileUrl) {
  window.open(profileUrl, '_blank');
}

async function exportToCSV() {
  const headers = ['Name', 'Company', 'Profile URL', 'Message', 'Sent Date', 'Status', 'Temperature', 'Responded', 'Notes'];
  const rows = filteredLeads.map(l => [
    l.name,
    l.company || '',
    l.profileUrl,
    l.messageText,
    new Date(l.timestamp).toLocaleDateString(),
    l.status,
    l.temperature,
    l.responded ? 'Yes' : 'No',
    l.notes || ''
  ]);
  
  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  
  // Download CSV
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `linkedin-tracker-export-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
}

function formatFollowUpDate(timestamp) {
  if (!timestamp) return '-';
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return '🔴 Overdue';
  if (diffDays === 0) return '⚠️ Today';
  if (diffDays === 1) return 'Tomorrow';
  
  return `In ${diffDays} days`;
}

function getTemperatureIcon(temp) {
  switch(temp) {
    case 'cold': return '❄️';
    case 'warm': return '🔥';
    case 'hot': return '🔥🔥';
    default: return '';
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
