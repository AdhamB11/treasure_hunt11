/**
 * Treasure Hunt Game - Progress Tracking
 * Displays player progress and challenge summary
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const playerNameDisplay = document.getElementById('playerNameDisplay');
    const progressBar = document.getElementById('progressBar');
    const completedChallengesSpan = document.getElementById('completedChallenges');
    const totalChallengesSpan = document.getElementById('totalChallenges');
    const challengeList = document.getElementById('challengeList');
    const qrCodeSection = document.getElementById('qrCodeSection');
    const qrCodeDiv = document.getElementById('qrCode');
    
    // Get player data
    const player = TreasureHuntUtils.getData('treasureHuntPlayer');
    if (!player) {
        // Redirect to login if no player data found
        window.location.href = 'login.html';
        return;
    }
    
    // Get riddles data
    const riddles = TreasureHuntUtils.getData('treasureHuntRiddles');
    if (!riddles || riddles.length === 0) {
        challengeList.innerHTML = '<p>No challenges have been set up yet.</p>';
        qrCodeSection.style.display = 'none';
        return;
    }
    
    // Display player name
    playerNameDisplay.textContent = player.name;
    
    // Update progress information
    const completedCount = player.progress;
    const totalCount = riddles.length;
    const progressPercentage = (completedCount / totalCount) * 100;
    
    // Update progress bar
    progressBar.style.width = `${progressPercentage}%`;
    
    // Update progress text
    completedChallengesSpan.textContent = completedCount;
    totalChallengesSpan.textContent = totalCount;
    
    // Display challenge list
    displayChallengeList();
    
    // Generate QR code for current challenge
    generateCurrentChallengeQR();
    
    // Display challenge list with status
    function displayChallengeList() {
        // Clear previous content
        challengeList.innerHTML = '';
        
        // Create challenge list
        riddles.forEach((riddle, index) => {
            const isCompleted = index < player.progress;
            const isCurrent = index === player.progress;
            
            const challengeItem = document.createElement('div');
            challengeItem.className = `challenge-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`;
            
            challengeItem.innerHTML = `
                <h4>
                    ${index + 1}. ${riddle.title}
                    ${isCompleted ? '<i class="fas fa-check-circle" style="color: green;"></i>' : ''}
                    ${isCurrent ? '<span class="current-badge">Current</span>' : ''}
                </h4>
                <p>${isCompleted ? 'Completed' : (isCurrent ? 'In Progress' : 'Locked')}</p>
            `;
            
            challengeList.appendChild(challengeItem);
        });
    }
    
    // Generate QR code for current challenge
    function generateCurrentChallengeQR() {
        // Only show QR section if there are challenges and player hasn't completed all
        if (riddles.length === 0 || player.progress >= riddles.length) {
            qrCodeSection.style.display = 'none';
            return;
        }
        
        // For this simple implementation, we'll just create a link that can be turned into a QR code
        // In a real implementation, you would use a QR code library like qrcode.js
        
        // Create challenge link - this would normally be converted to a QR code
        const currentRiddle = riddles[player.progress];
        const riddleId = currentRiddle.id;
        const playerName = encodeURIComponent(player.name);
        
        // Create an encoded challenge link
        const challengeLink = `${window.location.origin}${window.location.pathname.replace('progress.html', 'challenge.html')}?player=${playerName}&challenge=${TreasureHuntUtils.encrypt(riddleId)}`;
        
        // Display link (in a real implementation, this would be a QR code)
        qrCodeDiv.innerHTML = `
            <p>Share this link to access this challenge directly:</p>
            <code style="word-break: break-all;">${challengeLink}</code>
            <p class="note">Note: In a full implementation, this would be converted to a QR code.</p>
        `;
        
        // In a real implementation, you would use a QR code library like this:
        // new QRCode(qrCodeDiv, challengeLink);
    }
});
