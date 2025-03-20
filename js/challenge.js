/**
 * Treasure Hunt Game - Challenge Page Script
 * Handles riddle display, answer validation, and player progress
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const playerNameDisplay = document.getElementById('playerNameDisplay');
    const challengeTitle = document.getElementById('challengeTitle');
    const challengeText = document.getElementById('challengeText');
    const answerForm = document.getElementById('answerForm');
    const playerAnswer = document.getElementById('playerAnswer');
    const answerFeedback = document.getElementById('answerFeedback');
    const hintButton = document.getElementById('hintButton');
    const hintText = document.getElementById('hintText');
    const progressBar = document.getElementById('progressBar');
    const currentChallengeSpan = document.getElementById('currentChallenge');
    const totalChallengesSpan = document.getElementById('totalChallenges');
    const logoutButton = document.getElementById('logoutButton');

    // Get player data
    const player = TreasureHuntUtils.getData('treasureHuntPlayer');
    if (!player) {
        window.location.href = 'login.html';
        return;
    }

    // Get riddles data - use predefined riddles
    let riddles = TreasureHuntUtils.getData('riddles');
    if (!riddles || riddles.length === 0) {
        // Initialize with predefined riddles if not already set
        if (typeof predefinedRiddles !== 'undefined') {
            riddles = predefinedRiddles;
            TreasureHuntUtils.saveData('riddles', riddles);
        } else {
            challengeTitle.textContent = "Error";
            challengeText.textContent = "No riddles found. Please try again.";
            return;
        }
    }

    // Current challenge index
    let currentChallengeIndex = player.progress || 0;

    // Check if player has completed all challenges
    if (currentChallengeIndex >= riddles.length) {
        displayCompletionMessage();
        return;
    }

    // Display player name
    playerNameDisplay.textContent = player.name;

    // Update progress bar
    updateProgressBar();

    // Load current challenge
    loadChallenge(currentChallengeIndex);

    // Handle answer submission
    answerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const answer = playerAnswer.value.trim();
        if (!answer) {
            showFeedback('الرجاء إدخال إجابة.', 'incorrect');
            return;
        }

        // Get current riddle
        const currentRiddle = riddles[currentChallengeIndex];

        // Check answer
        if (TreasureHuntUtils.compareAnswers(answer, currentRiddle.answer)) {
            // Correct answer
            showFeedback('إجابة صحيحة! رائع!', 'correct');

            // Update player progress
            const newProgress = currentChallengeIndex + 1;
            player.progress = newProgress;
            
            if (!player.completedChallenges) {
                player.completedChallenges = [];
            }
            
            player.completedChallenges.push({
                riddleId: currentRiddle.id,
                completedAt: new Date().toISOString()
            });

            // Save updated player data
            TreasureHuntUtils.saveData('treasureHuntPlayer', player);

            // Update player data in the registry
            TreasureHuntUtils.updatePlayerProgress(player.name, player.progress, currentRiddle.id);

            // Show next button after a delay
            setTimeout(() => {
                // Clear previous buttons first
                while (answerFeedback.lastChild) {
                    answerFeedback.removeChild(answerFeedback.lastChild);
                }
                
                const nextButton = document.createElement('button');
                nextButton.className = 'btn primary-btn';
                nextButton.style.marginTop = '10px';
                nextButton.innerHTML = '<i class="fas fa-arrow-right"></i> التالي';
                nextButton.onclick = function() {
                    if (newProgress >= riddles.length) {
                        displayCompletionMessage();
                    } else {
                        currentChallengeIndex = newProgress;
                        loadChallenge(currentChallengeIndex);
                        answerFeedback.textContent = '';
                        answerFeedback.className = 'answer-feedback';
                        playerAnswer.value = '';
                        updateProgressBar();
                    }
                };
                answerFeedback.appendChild(document.createTextNode(' '));
                answerFeedback.appendChild(nextButton);
            }, 1000);
        } else {
            // Incorrect answer
            showFeedback('عذراً، الإجابة غير صحيحة. حاول مرة أخرى!', 'incorrect');
        }
    });

    // Handle hint button
    hintButton.addEventListener('click', () => {
        const currentRiddle = riddles[currentChallengeIndex];

        if (currentRiddle.hint) {
            hintText.textContent = currentRiddle.hint;
            hintText.style.display = 'block';
            hintButton.innerHTML = '<i class="fas fa-lightbulb"></i> إخفاء التلميح';
            hintButton.onclick = function() {
                hintText.style.display = 'none';
                hintButton.innerHTML = '<i class="fas fa-lightbulb"></i> إظهار التلميح';
                hintButton.onclick = null; // Remove this handler
                // Reattach the original handler
                hintButton.addEventListener('click', arguments.callee.caller, false);
            };
        } else {
            hintText.textContent = "لا يوجد تلميح لهذا اللغز.";
            hintText.style.display = 'block';
        }
    });

    // Load challenge
    function loadChallenge(index) {
        const currentRiddle = riddles[index];

        challengeTitle.textContent = currentRiddle.title;
        challengeText.textContent = currentRiddle.riddleText;

        // Reset hint
        hintText.style.display = 'none';
        hintButton.disabled = false;
        hintButton.innerHTML = '<i class="fas fa-lightbulb"></i> إظهار التلميح';

        // Update challenge counter
        currentChallengeSpan.textContent = index + 1;
        totalChallengesSpan.textContent = riddles.length;
    }

    // Update progress bar
    function updateProgressBar() {
        const progress = (player.progress / riddles.length) * 100;
        progressBar.style.width = `${progress}%`;

        // Update challenge counter
        currentChallengeSpan.textContent = currentChallengeIndex + 1;
        totalChallengesSpan.textContent = riddles.length;
    }

    // Show feedback message
    function showFeedback(message, type) {
        answerFeedback.textContent = message;
        answerFeedback.className = `answer-feedback ${type}`;
    }

    // Display completion message
    function displayCompletionMessage() {
        challengeTitle.textContent = 'تهانينا!';
        challengeText.innerHTML = `
            <div style="text-align: center;">
                <p>لقد أكملت جميع الألغاز العشرة بنجاح!</p>
                <p>أحسنت ${player.name}!</p>
            </div>
        `;
        answerForm.style.display = 'none';

        // Update progress bar to 100%
        progressBar.style.width = '100%';
        currentChallengeSpan.textContent = riddles.length;
    }

    // Add logout functionality
    logoutButton.addEventListener('click', showLogoutConfirmation);

    // Show logout confirmation
    function showLogoutConfirmation() {
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content logout-modal">
                <span class="close">&times;</span>
                <h3>تأكيد تسجيل الخروج</h3>
                <p>هل أنت متأكد من رغبتك في تسجيل الخروج؟ سيتم حفظ تقدمك.</p>
                <div class="modal-buttons">
                    <button class="btn secondary-btn" id="cancelLogout">إلغاء</button>
                    <button class="btn danger-btn" id="confirmLogout">تسجيل الخروج</button>
                </div>
            </div>
        `;

        // Add modal to page
        document.body.appendChild(modal);

        // Add event listeners
        document.querySelector('.close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        document.getElementById('cancelLogout').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        document.getElementById('confirmLogout').addEventListener('click', () => {
            logout();
            document.body.removeChild(modal);
        });
    }

    // Logout function
    function logout() {
        // Clear current player
        TreasureHuntUtils.clearData('treasureHuntPlayer');

        // Redirect to index page
        window.location.href = '../index.html';
    }
});
