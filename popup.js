document.addEventListener('DOMContentLoaded', function() {
    const statusDisplay = document.getElementById('status');
    const logsTextarea = document.getElementById('logs');
    const activateAIButton = document.getElementById('activateAI');
    const postContentButton = document.getElementById('postContent');
    const analyzePageButton = document.getElementById('analyzePage');

    function updateStatus(message) {
        statusDisplay.textContent = message;
    }

    function appendLog(message) {
        logsTextarea.value += message + '\n';
    }

    activateAIButton.addEventListener('click', function() {
        updateStatus('Activating AI...');
        chrome.runtime.sendMessage({ action: 'activateAI' }, function(response) {
            updateStatus('AI Active');
            appendLog('AI Activation: ' + response.status);
        });
    });

    postContentButton.addEventListener('click', function() {
        updateStatus('Posting Content...');
        chrome.runtime.sendMessage({ action: 'postContent' }, function(response) {
            updateStatus('Content Posted');
            appendLog('Content Posting: ' + response.status);
        });
    });

    analyzePageButton.addEventListener('click', function() {
        updateStatus('Analyzing Page...');
        chrome.runtime.sendMessage({ action: 'analyzePage' }, function(response) {
            updateStatus('Page Analyzed');
            appendLog('Page Analysis: ' + response.status);
        });
    });

    // Initialize popup status
    updateStatus('Idle');
    appendLog('Extension loaded and ready.');
});
