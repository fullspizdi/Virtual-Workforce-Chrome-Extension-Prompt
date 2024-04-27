// analytics.js for Virtual Workforce Chrome Extension

// Function to track analytics data
function trackAnalytics() {
    // Check if analytics tracking is enabled
    chrome.storage.sync.get(['analyticsTracking'], function(items) {
        if (items.analyticsTracking) {
            // Prepare data to be sent
            const data = {
                extensionVersion: chrome.runtime.getManifest().version,
                timestamp: new Date().toISOString(),
                eventType: 'interaction'
            };

            // Send data to a remote analytics server
            fetch('https://your-analytics-server.com/api/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                console.log('Analytics data sent successfully:', result);
            })
            .catch(error => {
                console.error('Error sending analytics data:', error);
            });
        } else {
            console.log('Analytics tracking is disabled.');
        }
    });
}

// Function to log events locally for debugging purposes
function logEvent(eventType, details) {
    console.log(`Event Logged: ${eventType}`, details);
}

export { trackAnalytics, logEvent };
