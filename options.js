document.addEventListener('DOMContentLoaded', function() {
    const settingsForm = document.getElementById('settingsForm');
    const aiModeSelect = document.getElementById('aiMode');
    const autoPostCheckbox = document.getElementById('autoPost');
    const scheduleTimeInput = document.getElementById('scheduleTime');
    const analyticsTrackingCheckbox = document.getElementById('analyticsTracking');

    // Load saved settings when the options page is opened
    function loadSettings() {
        chrome.storage.sync.get(['aiMode', 'autoPost', 'scheduleTime', 'analyticsTracking'], function(items) {
            if (items.aiMode) {
                aiModeSelect.value = items.aiMode;
            }
            autoPostCheckbox.checked = !!items.autoPost;
            if (items.scheduleTime) {
                scheduleTimeInput.value = items.scheduleTime;
            }
            analyticsTrackingCheckbox.checked = items.analyticsTracking !== undefined ? items.analyticsTracking : true;
        });
    }

    // Save settings when the form is submitted
    settingsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        chrome.storage.sync.set({
            aiMode: aiModeSelect.value,
            autoPost: autoPostCheckbox.checked,
            scheduleTime: scheduleTimeInput.value,
            analyticsTracking: analyticsTrackingCheckbox.checked
        }, function() {
            // Update status to let user know options were saved.
            const status = document.createElement('div');
            status.textContent = 'Settings saved!';
            status.className = 'status-message';
            settingsForm.appendChild(status);
            setTimeout(function() {
                status.remove();
            }, 1500);
        });
    });

    loadSettings();
});
