// background.js for Virtual Workforce Chrome Extension

// Import necessary modules and scripts
import { initializeAI } from './aiIntegration.js';
import { trackAnalytics } from './analytics.js';

// Set up the environment for AI and analytics
initializeAI();
trackAnalytics();

// Background task scheduler
chrome.alarms.create('scheduleContentPosting', {
  delayInMinutes: 1,
  periodInMinutes: 60
});

// Listen for alarm to trigger automated tasks
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'scheduleContentPosting') {
    automateContentPosting();
  }
});

// Function to handle automated content posting on Medium.com
function automateContentPosting() {
  chrome.tabs.query({url: "https://medium.com/*"}, function(tabs) {
    if (tabs.length > 0) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        files: ['contentScript.js']
      }, () => console.log('Automated posting executed.'));
    } else {
      console.log('No Medium.com tabs open.');
    }
  });
}

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "postContent") {
      automateContentPosting();
      sendResponse({status: "Content posting initiated"});
    }
  }
);

console.log('Background service worker for Virtual Workforce Chrome Extension initialized.');
