document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in as controller
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.type !== 'controller') {
        window.location.href = 'index.html';
        return;
    }

    // Initialize codes in localStorage if not exists
    if (!localStorage.getItem('redemptionCodes')) {
        localStorage.setItem('redemptionCodes', JSON.stringify([]));
    }

    // Handle code generation
    const generatorForm = document.querySelector('.generator-form');
    generatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const points = parseInt(this.points.value);
        const quantity = parseInt(this.quantity.value);
        const expiry = new Date(this.expiry.value);

        // Generate codes
        const newCodes = generateCodes(quantity, points, expiry);
        
        // Save codes
        const existingCodes = JSON.parse(localStorage.getItem('redemptionCodes'));
        localStorage.setItem('redemptionCodes', JSON.stringify([...existingCodes, ...newCodes]));

        // Update display
        updateCodesList();
        showSuccess(`Generated ${quantity} new redemption codes`);
        this.reset();
    });

    // Generate unique redemption codes
    function generateCodes(quantity, points, expiry) {
        const codes = [];
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        
        for (let i = 0; i < quantity; i++) {
            let code = '';
            for (let j = 0; j < 12; j++) {
                code += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            
            codes.push({
                code: code,
                points: points,
                expiry: expiry.toISOString(),
                createdAt: new Date().toISOString(),
                isUsed: false,
                usedBy: null,
                usedAt: null
            });
        }
        return codes;
    }

    // Update active codes list
    function updateCodesList() {
        const codesList = document.querySelector('.codes-list');
        const codes = JSON.parse(localStorage.getItem('redemptionCodes'));
        const activeCodes = codes.filter(code => !code.isUsed && new Date(code.expiry) > new Date());

        if (activeCodes.length === 0) {
            codesList.innerHTML = '<p class="no-codes">No active codes available</p>';
            return;
        }

        codesList.innerHTML = activeCodes.map(code => `
            <div class="code-item" data-code="${code.code}">
                <div class="code-details">
                    <div class="code-value">${code.code}</div>
                    <div class="code-info">
                        ${code.points} points • Expires: ${new Date(code.expiry).toLocaleDateString()}
                    </div>
                </div>
                <div class="code-actions">
                    <button class="copy-btn" onclick="copyCode('${code.code}')">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteCode('${code.code}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Update redemption history
    function updateRedemptionHistory() {
        const historyList = document.querySelector('.history-list');
        const codes = JSON.parse(localStorage.getItem('redemptionCodes'));
        const usedCodes = codes.filter(code => code.isUsed)
            .sort((a, b) => new Date(b.usedAt) - new Date(a.usedAt));

        if (usedCodes.length === 0) {
            historyList.innerHTML = '<p class="no-history">No redemption history</p>';
            return;
        }

        historyList.innerHTML = usedCodes.map(code => `
            <div class="history-item">
                <i class="fas fa-check-circle"></i>
                <div class="history-details">
                    <h4>Code: ${code.code}</h4>
                    <p>Redeemed by ${code.usedBy} on ${new Date(code.usedAt).toLocaleString()}</p>
                </div>
                <span class="points-value">+${code.points} points</span>
            </div>
        `).join('');
    }

    // Copy code to clipboard
    window.copyCode = async function(code) {
        try {
            await navigator.clipboard.writeText(code);
            showSuccess('Code copied to clipboard');
        } catch (err) {
            showError('Failed to copy code');
        }
    };

    // Delete code
    window.deleteCode = function(code) {
        if (confirm('Are you sure you want to delete this code?')) {
            const codes = JSON.parse(localStorage.getItem('redemptionCodes'));
            const updatedCodes = codes.filter(c => c.code !== code);
            localStorage.setItem('redemptionCodes', JSON.stringify(updatedCodes));
            updateCodesList();
            showSuccess('Code deleted successfully');
        }
    };

    // Toast notifications
    function showSuccess(message) {
        showToast(message, 'success');
    }

    function showError(message) {
        showToast(message, 'error');
    }

    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Initialize
    function initialize() {
        updateCodesList();
        updateRedemptionHistory();
        
        // Set minimum date for expiry input
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.querySelector('input[name="expiry"]').min = tomorrow.toISOString().split('T')[0];
    }

    // Start the app
    initialize();
}); 