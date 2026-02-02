// Popup script

document.addEventListener('DOMContentLoaded', async () => {
  await loadStats();
  await loadRecentLeads();
  await checkLimit();
  
  // Event listeners
  document.getElementById('open-dashboard').addEventListener('click', () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL('dashboard.html')
    });
  });
  
  document.getElementById('open-linkedin').addEventListener('click', () => {
    chrome.tabs.create({
      url: 'https://www.linkedin.com/messaging/'
    });
  });
  
  document.getElementById('upgrade-btn')?.addEventListener('click', () => {
    chrome.tabs.create({
      url: 'https://linkedintracker.app/upgrade' // TODO: Replace with actual landing page
    });
  });
});

async function loadStats() {
  chrome.runtime.sendMessage({ action: 'getStats' }, (stats) => {
    if (stats) {
      document.getElementById('stat-total').textContent = stats.total;
      document.getElementById('stat-pending').textContent = stats.pending;
      document.getElementById('stat-responded').textContent = stats.responded;
      document.getElementById('stat-followup').textContent = stats.needFollowUp;
    }
  });
}

async function loadRecentLeads() {
  const { leads = [] } = await chrome.storage.local.get(['leads']);
  const recent = leads.slice(0, 3);
  
  const container = document.getElementById('recent-leads-list');
  
  if (recent.length === 0) {
    container.innerHTML = '<div class="loader">No leads tracked yet. Start messaging on LinkedIn!</div>';
    return;
  }
  
  container.innerHTML = recent.map(lead => `
    <div class="lead-item">
      <div class="lead-name">${escapeHtml(lead.name)}</div>
      <div class="lead-info">
        ${lead.company ? escapeHtml(lead.company) + ' • ' : ''}
        ${formatDate(lead.timestamp)}
        ${lead.status === 'responded' ? ' • ✓ Responded' : ''}
      </div>
    </div>
  `).join('');
}

async function checkLimit() {
  chrome.runtime.sendMessage({ action: 'checkLimit' }, (result) => {
    if (result && !result.isProUser) {
      if (!result.canAdd) {
        // Show upgrade banner
        const banner = document.getElementById('upgrade-banner');
        banner.style.display = 'block';
        document.getElementById('limit-text').textContent = `You've tracked ${result.current}/${result.limit} free leads`;
      } else if (result.current >= result.limit * 0.8) {
        // Show warning when approaching limit
        const banner = document.getElementById('upgrade-banner');
        banner.style.display = 'block';
        banner.style.background = 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)';
        document.getElementById('limit-text').textContent = `${result.current}/${result.limit} leads tracked. Upgrade for unlimited!`;
      }
    }
  });
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
