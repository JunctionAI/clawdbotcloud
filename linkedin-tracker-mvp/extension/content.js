// LinkedIn DOM injection and message detection

console.log('LinkedIn Outreach Tracker: Content script loaded');

let messageObserver = null;
let conversationObserver = null;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  console.log('LinkedIn Tracker: Initializing...');
  
  // Start observing for message sends
  observeMessageSends();
  
  // Start observing for responses
  observeResponses();
  
  // Inject tracker badge
  injectTrackerBadge();
}

function observeMessageSends() {
  // Watch for message send button clicks
  const messageContainers = [
    '.msg-form__contenteditable', // Main messaging
    '.msg-overlay-bubble-content', // Popup messages
    '.message-anywhere-form__contenteditable' // Message anywhere
  ];
  
  // Use MutationObserver to detect when messages are sent
  messageObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        checkForSentMessage();
      }
    });
  });
  
  // Start observing the messaging area
  const observeMessaging = () => {
    const messagingArea = document.querySelector('.msg-s-message-list-container, .msg-overlay-list-bubble, .message-anywhere-wrapper');
    if (messagingArea) {
      messageObserver.observe(messagingArea, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  };
  
  observeMessaging();
  
  // Re-check every 2 seconds (LinkedIn is SPA, DOM changes)
  setInterval(observeMessaging, 2000);
  
  // Also listen for send button clicks directly
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('.msg-form__send-button, button[type="submit"]') ||
        target.closest('.msg-form__send-button, button[type="submit"]')) {
      setTimeout(() => extractAndSaveMessage(), 1000);
    }
  }, true);
}

function checkForSentMessage() {
  // Debounce to avoid multiple calls
  clearTimeout(window.linkedinTrackerDebounce);
  window.linkedinTrackerDebounce = setTimeout(() => {
    extractAndSaveMessage();
  }, 1500);
}

function extractAndSaveMessage() {
  try {
    // Find the conversation header to get recipient info
    const conversationHeader = document.querySelector('.msg-thread__header-content, .msg-overlay-bubble-header__title, .message-anywhere-conversation-header');
    
    if (!conversationHeader) {
      console.log('LinkedIn Tracker: No conversation header found');
      return;
    }
    
    // Extract name
    const nameElement = conversationHeader.querySelector('h2, a.msg-thread__link-to-profile, .msg-overlay-bubble-header__title a');
    const name = nameElement ? nameElement.textContent.trim() : 'Unknown';
    
    // Extract profile URL
    const profileLink = conversationHeader.querySelector('a.msg-thread__link-to-profile, .msg-overlay-bubble-header__title a');
    const profileUrl = profileLink ? profileLink.href : window.location.href;
    
    // Extract company (if visible)
    const companyElement = conversationHeader.querySelector('.msg-thread__headline, .msg-overlay-bubble-header__headline');
    const company = companyElement ? companyElement.textContent.trim() : '';
    
    // Find the most recent message sent by user
    const messages = document.querySelectorAll('.msg-s-message-list__event[data-event-urn], .msg-s-event-listitem[data-event-urn]');
    const lastMessage = Array.from(messages)
      .reverse()
      .find(msg => {
        const sender = msg.querySelector('.msg-s-message-group__profile-link, .msg-s-message__message-sender');
        // Check if message is from "You" or current user
        return sender && (sender.textContent.includes('You') || msg.querySelector('.msg-s-message-group--from-self'));
      });
    
    if (!lastMessage) {
      console.log('LinkedIn Tracker: No recent message found');
      return;
    }
    
    const messageElement = lastMessage.querySelector('.msg-s-event-listitem__body, .msg-s-message-group__message-body');
    const messageText = messageElement ? messageElement.textContent.trim() : '';
    
    if (!messageText || messageText.length < 5) {
      console.log('LinkedIn Tracker: Message too short or empty');
      return;
    }
    
    // Check if we already tracked this message (avoid duplicates)
    const messageHash = btoa(name + messageText.substring(0, 50));
    chrome.storage.local.get(['lastTrackedMessage'], (result) => {
      if (result.lastTrackedMessage === messageHash) {
        console.log('LinkedIn Tracker: Message already tracked');
        return;
      }
      
      chrome.storage.local.set({ lastTrackedMessage: messageHash });
      
      // Save to database
      const lead = {
        name,
        profileUrl,
        company,
        messageText
      };
      
      console.log('LinkedIn Tracker: Saving lead:', lead);
      
      // Send to background script to save
      chrome.runtime.sendMessage({
        action: 'saveLead',
        lead
      }, (response) => {
        if (response && response.success) {
          console.log('LinkedIn Tracker: Lead saved successfully');
          showNotification('✓ Message tracked!', `Tracking outreach to ${name}`);
          updateBadge();
        }
      });
    });
    
  } catch (error) {
    console.error('LinkedIn Tracker: Error extracting message:', error);
  }
}

function observeResponses() {
  // This is a simplified response detector
  // In production, you'd want more sophisticated detection
  conversationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const isResponse = node.querySelector && !node.querySelector('.msg-s-message-group--from-self');
            if (isResponse) {
              // New message from recipient - mark as responded
              const profileUrl = getCurrentConversationUrl();
              if (profileUrl) {
                chrome.runtime.sendMessage({
                  action: 'markAsResponded',
                  profileUrl
                });
              }
            }
          }
        });
      }
    });
  });
  
  const observeConversations = () => {
    const conversationArea = document.querySelector('.msg-s-message-list-container');
    if (conversationArea) {
      conversationObserver.observe(conversationArea, {
        childList: true,
        subtree: true
      });
    }
  };
  
  observeConversations();
  setInterval(observeConversations, 3000);
}

function getCurrentConversationUrl() {
  const profileLink = document.querySelector('.msg-thread__link-to-profile, a[href*="/in/"]');
  return profileLink ? profileLink.href : null;
}

function injectTrackerBadge() {
  // Inject floating badge to show tracked count
  const badge = document.createElement('div');
  badge.id = 'linkedin-tracker-badge';
  badge.innerHTML = `
    <div style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; background: linear-gradient(135deg, #0073b1, #005885); color: white; padding: 12px 20px; border-radius: 50px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); cursor: pointer; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; transition: transform 0.2s;">
      <span style="font-size: 20px;">📊</span>
      <span id="tracker-badge-text">Loading...</span>
    </div>
  `;
  
  document.body.appendChild(badge);
  
  badge.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openDashboard' });
  });
  
  badge.addEventListener('mouseenter', function() {
    this.querySelector('div').style.transform = 'scale(1.05)';
  });
  
  badge.addEventListener('mouseleave', function() {
    this.querySelector('div').style.transform = 'scale(1)';
  });
  
  updateBadgeText();
  setInterval(updateBadgeText, 10000); // Update every 10 seconds
}

function updateBadgeText() {
  chrome.runtime.sendMessage({ action: 'getStats' }, (stats) => {
    if (stats) {
      const badgeText = document.getElementById('tracker-badge-text');
      if (badgeText) {
        badgeText.textContent = `${stats.total} tracked · ${stats.needFollowUp} follow-ups`;
      }
    }
  });
}

function updateBadge() {
  chrome.runtime.sendMessage({ action: 'updateBadge' });
}

function showNotification(title, message) {
  // Visual notification on page
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    background: white;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    max-width: 300px;
    animation: slideIn 0.3s ease-out;
  `;
  
  notification.innerHTML = `
    <div style="font-weight: 600; color: #0073b1; margin-bottom: 4px;">${title}</div>
    <div style="color: #666; font-size: 14px;">${message}</div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);
