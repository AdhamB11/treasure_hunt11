/**
 * Treasure Hunt Game - Game Master Setup
 * Allows game masters to create and manage riddles/challenges
 */

document.addEventListener('DOMContentLoaded', () => {
    const setupForm = document.getElementById('setupForm');
    const riddlesList = document.getElementById('riddlesList');
    const noRiddlesMsg = document.getElementById('noRiddles');
    
    // Load existing riddles
    loadRiddles();
    
    // Add new riddle - direct form submission handler
    setupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log("Form submitted");
        
        // Get form values
        const title = document.getElementById('riddleTitle').value.trim();
        const text = document.getElementById('riddleText').value.trim();
        const answer = document.getElementById('riddleAnswer').value.trim();
        const hint = document.getElementById('riddleHint').value.trim();
        const useQrCode = document.getElementById('useQrCode').checked;
        const mapLocation = document.getElementById('mapLocation').value.trim();
        
        if (title && text && answer) {
            console.log("Creating new riddle");
            
            // Create riddle object
            const riddle = {
                id: TreasureHuntUtils.generateId(),
                title: TreasureHuntUtils.sanitizeInput(title),
                text: TreasureHuntUtils.sanitizeInput(text),
                answer: TreasureHuntUtils.sanitizeInput(answer),
                hint: hint ? TreasureHuntUtils.sanitizeInput(hint) : '',
                useQrCode: useQrCode,
                mapLocation: mapLocation ? TreasureHuntUtils.sanitizeInput(mapLocation) : '',
                created: new Date().toISOString()
            };
            
            console.log("New riddle:", riddle);
            
            // Get existing riddles or create empty array
            const riddles = TreasureHuntUtils.getData('treasureHuntRiddles') || [];
            console.log("Existing riddles:", riddles);
            
            // Add new riddle
            riddles.push(riddle);
            
            // Save to localStorage
            TreasureHuntUtils.saveData('treasureHuntRiddles', riddles);
            console.log("Saved riddles to localStorage");
            
            // Generate QR code if enabled
            if (useQrCode) {
                generateQRCode(riddle.id);
            }
            
            // Reset form
            setupForm.reset();
            
            // Refresh riddles list
            loadRiddles();
            
            // Show success message
            alert('Challenge added successfully!');
        } else {
            alert('Please fill out all required fields!');
        }
    });
    
    // Load and display riddles
    function loadRiddles() {
        console.log("Loading riddles from localStorage");
        const riddles = TreasureHuntUtils.getData('treasureHuntRiddles') || [];
        console.log("Retrieved riddles:", riddles);
        
        if (riddles.length === 0) {
            noRiddlesMsg.style.display = 'block';
            riddlesList.innerHTML = '';
            return;
        }
        
        noRiddlesMsg.style.display = 'none';
        
        // Clear current list
        riddlesList.innerHTML = '';
        
        // Display each riddle
        riddles.forEach((riddle, index) => {
            const riddleElement = document.createElement('div');
            riddleElement.className = 'challenge-item';
            riddleElement.innerHTML = `
                <h4>${index + 1}. ${riddle.title}</h4>
                <p><strong>Riddle:</strong> ${riddle.text.substring(0, 100)}${riddle.text.length > 100 ? '...' : ''}</p>
                ${riddle.useQrCode ? '<p><i class="fas fa-qrcode"></i> <strong>QR Code Enabled</strong></p>' : ''}
                ${riddle.mapLocation ? '<p><i class="fas fa-map-marker-alt"></i> <strong>Map Location:</strong> ' + riddle.mapLocation + '</p>' : ''}
                <div class="challenge-actions">
                    <button class="action-btn view-qr" data-id="${riddle.id}" ${!riddle.useQrCode ? 'style="display:none"' : ''}>
                        <i class="fas fa-qrcode"></i> View QR
                    </button>
                    <button class="action-btn edit" data-id="${riddle.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete" data-id="${riddle.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            
            riddlesList.appendChild(riddleElement);
        });
        
        // Add event listeners to edit and delete buttons
        addButtonEventListeners();
    }
    
    // Add event listeners to edit and delete buttons
    function addButtonEventListeners() {
        // Edit buttons
        document.querySelectorAll('.action-btn.edit').forEach(button => {
            button.addEventListener('click', (e) => {
                const riddleId = e.currentTarget.getAttribute('data-id');
                editRiddle(riddleId);
            });
        });
        
        // Delete buttons
        document.querySelectorAll('.action-btn.delete').forEach(button => {
            button.addEventListener('click', (e) => {
                const riddleId = e.currentTarget.getAttribute('data-id');
                deleteRiddle(riddleId);
            });
        });
        
        // View QR buttons
        document.querySelectorAll('.action-btn.view-qr').forEach(button => {
            button.addEventListener('click', (e) => {
                const riddleId = e.currentTarget.getAttribute('data-id');
                showQRCode(riddleId);
            });
        });
    }
    
    // Edit riddle
    function editRiddle(riddleId) {
        const riddles = TreasureHuntUtils.getData('treasureHuntRiddles') || [];
        const riddle = riddles.find(r => r.id === riddleId);
        
        if (riddle) {
            // Populate form with riddle data
            document.getElementById('riddleTitle').value = riddle.title;
            document.getElementById('riddleText').value = riddle.text;
            document.getElementById('riddleAnswer').value = riddle.answer;
            document.getElementById('riddleHint').value = riddle.hint || '';
            document.getElementById('useQrCode').checked = riddle.useQrCode || false;
            document.getElementById('mapLocation').value = riddle.mapLocation || '';
            
            // Change button text
            const addButton = document.getElementById('addRiddle');
            addButton.innerHTML = '<i class="fas fa-save"></i> Update Challenge';
            
            // Remove existing submit handler
            setupForm.removeEventListener('submit', setupForm.submitHandler);
            
            // Add update handler
            setupForm.submitHandler = function(e) {
                e.preventDefault();
                
                // Get form values
                const title = document.getElementById('riddleTitle').value.trim();
                const text = document.getElementById('riddleText').value.trim();
                const answer = document.getElementById('riddleAnswer').value.trim();
                const hint = document.getElementById('riddleHint').value.trim();
                const useQrCode = document.getElementById('useQrCode').checked;
                const mapLocation = document.getElementById('mapLocation').value.trim();
                
                if (title && text && answer) {
                    // Update riddle
                    const updatedRiddles = riddles.map(r => {
                        if (r.id === riddleId) {
                            return {
                                ...r,
                                title: TreasureHuntUtils.sanitizeInput(title),
                                text: TreasureHuntUtils.sanitizeInput(text),
                                answer: TreasureHuntUtils.sanitizeInput(answer),
                                hint: hint ? TreasureHuntUtils.sanitizeInput(hint) : '',
                                useQrCode: useQrCode,
                                mapLocation: mapLocation ? TreasureHuntUtils.sanitizeInput(mapLocation) : '',
                                updated: new Date().toISOString()
                            };
                        }
                        return r;
                    });
                    
                    // Save to localStorage
                    TreasureHuntUtils.saveData('treasureHuntRiddles', updatedRiddles);
                    
                    // Regenerate QR code if enabled
                    if (useQrCode) {
                        generateQRCode(riddleId);
                    }
                    
                    // Reset form
                    setupForm.reset();
                    
                    // Restore button text
                    addButton.innerHTML = '<i class="fas fa-plus"></i> Add Challenge';
                    
                    // Reset form submit handler
                    setupForm.removeEventListener('submit', setupForm.submitHandler);
                    setupForm.addEventListener('submit', setupForm.originalSubmitHandler);
                    
                    // Refresh riddles list
                    loadRiddles();
                    
                    // Show success message
                    alert('Challenge updated successfully!');
                } else {
                    alert('Please fill out all required fields!');
                }
            };
            
            // Store original submit handler
            if (!setupForm.originalSubmitHandler) {
                setupForm.originalSubmitHandler = setupForm.onsubmit;
            }
            
            // Add new submit handler
            setupForm.addEventListener('submit', setupForm.submitHandler);
        }
    }
    
    // Delete riddle
    function deleteRiddle(riddleId) {
        if (confirm('Are you sure you want to delete this challenge?')) {
            const riddles = TreasureHuntUtils.getData('treasureHuntRiddles') || [];
            
            // Filter out the riddle to delete
            const updatedRiddles = riddles.filter(riddle => riddle.id !== riddleId);
            
            // Save to localStorage
            TreasureHuntUtils.saveData('treasureHuntRiddles', updatedRiddles);
            
            // Refresh riddles list
            loadRiddles();
            
            // Show success message
            alert('Challenge deleted successfully!');
        }
    }
    
    // Generate QR code for a riddle
    function generateQRCode(riddleId) {
        const qrData = {
            type: "treasureHuntChallenge",
            id: riddleId,
            timestamp: new Date().toISOString()
        };
        
        // Store QR code data
        const qrCodes = TreasureHuntUtils.getData('treasureHuntQRCodes') || {};
        qrCodes[riddleId] = qrData;
        TreasureHuntUtils.saveData('treasureHuntQRCodes', qrCodes);
    }
    
    // Show QR code in a modal
    function showQRCode(riddleId) {
        const riddles = TreasureHuntUtils.getData('treasureHuntRiddles') || [];
        const riddle = riddles.find(r => r.id === riddleId);
        
        if (!riddle) return;
        
        // Create modal for QR code
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>QR Code for: ${riddle.title}</h2>
                <div id="qrcode"></div>
                <p>Players can scan this QR code to access the challenge.</p>
                <button id="printQRCode" class="btn primary-btn">
                    <i class="fas fa-print"></i> Print QR Code
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Generate QR code
        const qrcode = new QRCode(document.getElementById("qrcode"), {
            text: JSON.stringify({
                type: "treasureHuntChallenge",
                id: riddleId
            }),
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        // Close modal when clicking X
        modal.querySelector('.close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Print QR code
        document.getElementById('printQRCode').addEventListener('click', () => {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                <head>
                    <title>QR Code - ${riddle.title}</title>
                    <style>
                        body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
                        h1 { font-family: Arial, sans-serif; }
                    </style>
                </head>
                <body>
                    <h1>${riddle.title}</h1>
                    <img src="${document.getElementById('qrcode').querySelector('img').src}" style="width: 300px; height: 300px;">
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        });
    }
});
