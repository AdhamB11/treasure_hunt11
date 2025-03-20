/**
 * Treasure Hunt Game - Main Application JavaScript
 * Contains utility functions shared across the application
 */

// Utility functions
const TreasureHuntUtils = {
    // Store data in localStorage
    saveData: function(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    
    // Retrieve data from localStorage
    getData: function(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    
    // Clear specific data from localStorage
    clearData: function(key) {
        localStorage.removeItem(key);
    },
    
    // Generate a unique ID
    generateId: function() {
        return Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    },
    
    // Sanitize user input to prevent XSS
    sanitizeInput: function(input) {
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML;
    },
    
    // Compare answers (case-insensitive and trim whitespace)
    compareAnswers: function(userAnswer, correctAnswer) {
        return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    },
    
    // Get all registered players
    getAllPlayers: function() {
        return this.getData('treasureHuntPlayers') || [];
    },
    
    // Register a new player
    registerPlayer: function(playerData) {
        const players = this.getAllPlayers();
        
        // Check if player with same name already exists
        const existingPlayerIndex = players.findIndex(p => p.name.toLowerCase() === playerData.name.toLowerCase());
        
        if (existingPlayerIndex >= 0) {
            // Update existing player
            players[existingPlayerIndex] = {
                ...players[existingPlayerIndex],
                ...playerData,
                lastActive: new Date().toISOString()
            };
        } else {
            // Add new player
            players.push({
                ...playerData,
                registered: new Date().toISOString(),
                lastActive: new Date().toISOString()
            });
        }
        
        this.saveData('treasureHuntPlayers', players);
        return true;
    },
    
    // Update player progress
    updatePlayerProgress: function(playerName, progress, completedChallengeId) {
        const players = this.getAllPlayers();
        const playerIndex = players.findIndex(p => p.name.toLowerCase() === playerName.toLowerCase());
        
        if (playerIndex >= 0) {
            const player = players[playerIndex];
            player.progress = progress;
            
            if (completedChallengeId && !player.completedChallenges) {
                player.completedChallenges = [];
            }
            
            if (completedChallengeId && !player.completedChallenges.includes(completedChallengeId)) {
                player.completedChallenges.push(completedChallengeId);
            }
            
            player.lastActive = new Date().toISOString();
            players[playerIndex] = player;
            
            this.saveData('treasureHuntPlayers', players);
            return true;
        }
        
        return false;
    }
};

// Check if game is set up
function isGameSetUp() {
    const riddles = TreasureHuntUtils.getData('riddles');
    return riddles && riddles.length > 0;
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Check if we need to initialize the predefined riddles
    if (typeof predefinedRiddles !== 'undefined') {
        const existingRiddles = TreasureHuntUtils.getData('riddles');
        if (!existingRiddles || existingRiddles.length === 0) {
            TreasureHuntUtils.saveData('riddles', predefinedRiddles);
            console.log('Game initialized with predefined riddles');
        }
    }
});
