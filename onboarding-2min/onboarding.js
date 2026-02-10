// Onboarding state
let currentStep = 1;
let startTime = Date.now();
let selectedGoal = null;
let userData = {};

// Start timer
let timerInterval = setInterval(updateTimer, 1000);

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const remaining = Math.max(0, 120 - elapsed);
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  document.getElementById('timer').textContent = 
    `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  if (remaining === 0) {
    clearInterval(timerInterval);
  }
}

// Step 1: Goal selection
document.querySelectorAll('.quick-option').forEach(option => {
  option.addEventListener('click', function() {
    // Remove previous selection
    document.querySelectorAll('.quick-option').forEach(o => o.classList.remove('selected'));
    
    // Select this one
    this.classList.add('selected');
    selectedGoal = this.dataset.goal;
    
    // Enable continue button
    document.getElementById('step1Btn').disabled = false;
  });
});

// Auto-fill for demo purposes
setTimeout(() => {
  document.getElementById('userName').value = 'Demo User';
  document.getElementById('timezone').value = 'Pacific/Auckland';
}, 100);

function nextStep() {
  // Hide current step
  document.getElementById(`step${currentStep}`).classList.remove('active');
  
  // Move to next step
  currentStep++;
  document.getElementById(`step${currentStep}`).classList.add('active');
  
  // Update progress bar
  const progress = (currentStep / 6) * 100;
  document.getElementById('progress').style.width = `${progress}%`;
}

function provision() {
  // Collect user data
  userData = {
    name: document.getElementById('userName').value || 'User',
    company: document.getElementById('companyName').value,
    timezone: document.getElementById('timezone').value,
    goal: selectedGoal
  };
  
  // Validate
  if (!userData.name || !userData.timezone) {
    alert('Please fill in your name and timezone');
    return;
  }
  
  // Update personalization in chat
  document.getElementById('userName1').textContent = userData.name;
  
  // Move to provisioning step
  nextStep();
  
  // Simulate provisioning with realistic timing
  const checks = ['check1', 'check2', 'check3', 'check4', 'check5'];
  let checkIndex = 0;
  
  const provisionInterval = setInterval(() => {
    if (checkIndex < checks.length) {
      document.getElementById(checks[checkIndex]).classList.add('done');
      checkIndex++;
      
      // Move to next step when complete
      if (checkIndex === checks.length) {
        setTimeout(() => {
          clearInterval(provisionInterval);
          nextStep(); // Move to first interaction
        }, 500);
      }
    }
  }, 400); // ~2 seconds total
}

// Sample conversation responses based on goal
const responses = {
  email: {
    "What can you help me with?": "I can help you manage your inbox! I'll summarize emails, draft replies, flag important messages, and even auto-respond to common questions. Want me to check your inbox right now?",
    "Check my schedule today": "Sure! Let me connect to your calendar first. Once connected, I can show you today's meetings, find free slots, and even schedule new appointments. Ready to connect?",
    "Summarize my inbox": "I'll need access to your email first. Once connected, I can give you a daily summary like: '5 new messages: 2 urgent from clients, 1 invoice to approve, 2 newsletters (archived)'. Want to connect now?",
    "Find flights to SF": "I can help research flights! Based on your preferences, I'll find the best options, compare prices, and even suggest optimal travel times. When are you planning to go?"
  },
  calendar: {
    "What can you help me with?": "I specialize in calendar management! I can schedule meetings, find free slots across teams, send reminders, and reschedule conflicts automatically. What's your biggest scheduling headache?",
    "Check my schedule today": "Let me pull that up... *Once connected, you'll see*: '9am Team standup, 11am Client call with Acme Corp, 2pm Focus time (blocked), 4pm Review session'. I can also suggest prep time before meetings!",
    "Summarize my inbox": "While I'm best at calendars, I can absolutely help with email too! Want me to scan for meeting requests and auto-schedule them? I'll save you hours of back-and-forth.",
    "Find flights to SF": "I'll check flights and automatically add them to your calendar once booked! Plus, I'll block out travel time and suggest when to leave for the airport. When do you need to be in SF?"
  },
  research: {
    "What can you help me with?": "I'm your research assistant! I can gather information, summarize articles, analyze trends, compare options, and compile reports. What are you researching today?",
    "Check my schedule today": "I can help with that too! Though my strength is research, I can pull your schedule and even research topics for upcoming meetings. Want me to prep briefing materials?",
    "Summarize my inbox": "I can do that! I'll categorize emails by topic, extract key info, and create summary reports. Plus, I can research any topics mentioned in your emails. Shall I start?",
    "Find flights to SF": "I'll research all options! I'll compare airlines, prices, layovers, and reviews. Then give you a recommendation with pros/cons. Budget or comfort priority?"
  },
  general: {
    "What can you help me with?": "Everything! 📧 Email management, 📅 scheduling, 🔍 research, 📝 document drafting, 📊 data analysis, and more. I have 50+ skills ready. What's your biggest time sink?",
    "Check my schedule today": "On it! *Once connected*: I'll show today's agenda, suggest prep time, and can even research topics for your meetings. Want me to also check for scheduling conflicts?",
    "Summarize my inbox": "I'll scan your inbox and give you the TL;DR: urgent items, decisions needed, FYIs, and spam. I can also draft replies or archive non-essentials. Ready to connect email?",
    "Find flights to SF": "I'll research flights, hotels, and even create a full itinerary! I can compare prices across sites and suggest the best combo of cost + convenience. When's your trip?"
  }
};

function sendSampleMessage(element) {
  const message = element.textContent;
  document.getElementById('userMessage').value = message;
  sendMessage();
}

function sendMessage() {
  const input = document.getElementById('userMessage');
  const message = input.value.trim();
  
  if (!message) return;
  
  const chatPreview = document.getElementById('chatPreview');
  
  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.innerHTML = `
    <div class="avatar">${userData.name[0].toUpperCase()}</div>
    <div class="bubble">${message}</div>
  `;
  chatPreview.appendChild(userMsg);
  
  // Clear input
  input.value = '';
  
  // Scroll to bottom
  chatPreview.scrollTop = chatPreview.scrollHeight;
  
  // Simulate typing indicator
  setTimeout(() => {
    const goalResponses = responses[selectedGoal || 'general'];
    const response = goalResponses[message] || 
      `Great question! I can help with that. Since you're interested in ${selectedGoal || 'automation'}, I'll be especially useful for tasks like this. Try asking me to actually do it once you connect your accounts!`;
    
    const botMsg = document.createElement('div');
    botMsg.className = 'message';
    botMsg.innerHTML = `
      <div class="avatar">🤖</div>
      <div class="bubble">${response}</div>
    `;
    chatPreview.appendChild(botMsg);
    
    // Scroll to bottom
    chatPreview.scrollTop = chatPreview.scrollHeight;
  }, 800);
}

function complete() {
  // Calculate final time
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  document.getElementById('finalTime').textContent = 
    `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  // Move to success step
  nextStep();
  
  // Stop timer
  clearInterval(timerInterval);
  
  // Send completion event to backend
  fetch('/api/onboarding/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...userData,
      completionTime: elapsed,
      timestamp: new Date().toISOString()
    })
  }).catch(err => console.error('Failed to track completion:', err));
  
  // Confetti effect (optional enhancement)
  if (typeof confetti !== 'undefined') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// Auto-advance from step 3 (provisioning) is handled in provision() function
