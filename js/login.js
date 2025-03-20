/**
 * Treasure Hunt Game - Login Page Script
 * Handles player login and session management
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const loginForm = document.getElementById('loginForm');
    const playerNameInput = document.getElementById('playerName');
    const loginMessage = document.getElementById('loginMessage');
    const existingPlayerCard = document.getElementById('existingPlayerCard');
    
    // Check for login message
    const message = sessionStorage.getItem('loginMessage');
    if (message) {
        showMessage(message);
        sessionStorage.removeItem('loginMessage');
    }
    
    // Check for existing player
    const existingPlayer = TreasureHuntUtils.getData('treasureHuntPlayer');
    
    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const playerName = TreasureHuntUtils.sanitizeInput(playerNameInput.value.trim());
        
        if (!playerName) {
            showMessage('Please enter your name.', 'error');
            return;
        }
        
        // Check if player already exists
        const existingPlayers = TreasureHuntUtils.getAllPlayers();
        const existingPlayerIndex = existingPlayers.findIndex(p => 
            p.name.toLowerCase() === playerName.toLowerCase()
        );
        
        if (existingPlayerIndex >= 0) {
            // Show existing player card
            const player = existingPlayers[existingPlayerIndex];
            handleExistingPlayer(player);
        } else {
            // Register new player
            registerNewPlayer(playerName);
        }
    });
    
    // If we have an existing player in session, show the existing player card
    if (existingPlayer) {
        handleExistingPlayer(existingPlayer);
    }
    
    // Register new player
    function registerNewPlayer(playerName) {
        // Create player object
        const player = {
            name: playerName,
            progress: 0,
            completedChallenges: [],
            startedAt: new Date().toISOString()
        };
        
        // Register player
        TreasureHuntUtils.registerPlayer(player);
        
        // Save current player
        TreasureHuntUtils.saveData('treasureHuntPlayer', player);
        
        // Redirect to challenge page
        redirectToChallenge();
    }
    
    // Handle existing player
    function handleExistingPlayer(player) {
        // Hide login form
        loginForm.style.display = 'none';
        
        // Update player card
        existingPlayerCard.style.display = 'block';
        
        // Set up continue button
        document.getElementById('continueGameBtn').addEventListener('click', () => {
            // Update current player
            TreasureHuntUtils.saveData('treasureHuntPlayer', player);
            redirectToChallenge();
        });
        
        // Set up new game button
        document.getElementById('newGameBtn').addEventListener('click', () => {
            // Reset player progress
            player.progress = 0;
            player.completedChallenges = [];
            player.startedAt = new Date().toISOString();
            
            // Update player
            TreasureHuntUtils.registerPlayer(player);
            TreasureHuntUtils.saveData('treasureHuntPlayer', player);
            
            redirectToChallenge();
        });
        
        // Set up logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            logout();
        });
    }
    
    // Logout function
    function logout() {
        // Clear current player
        TreasureHuntUtils.clearData('treasureHuntPlayer');
        
        // Show login form
        loginForm.style.display = 'block';
        existingPlayerCard.style.display = 'none';
        
        // Show message
        showMessage('You have been logged out successfully.', 'success');
    }
    
    // Show message
    function showMessage(message, type = 'info') {
        loginMessage.textContent = message;
        loginMessage.className = `message ${type}`;
        loginMessage.style.display = 'block';
    }
    
    // Redirect to challenge page
    function redirectToChallenge() {
        window.location.href = 'challenge.html';
    }
});
