// Settings Lab JavaScript

// DOM Elements
const addPcBtn = document.getElementById('addPcBtn');
const resetPasswordBtn = document.getElementById('resetPasswordBtn');
const deletePcBtn = document.getElementById('deletePcBtn');
const addPcModal = document.getElementById('addPcModal');
const resetPasswordModal = document.getElementById('resetPasswordModal');
const deletePcModal = document.getElementById('deletePcModal');
const deleteConfirmation = document.getElementById('deleteConfirmation');
const deleteBtn = document.querySelector('.delete-btn');
const newPassword = document.getElementById('newPassword');
const strengthIndicator = document.querySelector('.strength-indicator');

// Initialize Framer Motion
const { motion, AnimatePresence } = window.Motion;

// PC List (Mock Data)
let pcList = [
    { id: 1, name: 'PC-001', status: 'active', lastLogin: '2024-03-15' },
    { id: 2, name: 'PC-002', status: 'active', lastLogin: '2024-03-14' },
    { id: 3, name: 'PC-003', status: 'inactive', lastLogin: '2024-03-10' }
];

// Modal Management
function showModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add PC Modal
addPcBtn.addEventListener('click', () => {
    showModal(addPcModal);
});

// Reset Password Modal
resetPasswordBtn.addEventListener('click', () => {
    showModal(resetPasswordModal);
    initializePasswordReset();
});

// Delete PC Modal
deletePcBtn.addEventListener('click', () => {
    showModal(deletePcModal);
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === addPcModal) hideModal(addPcModal);
    if (e.target === resetPasswordModal) hideModal(resetPasswordModal);
    if (e.target === deletePcModal) hideModal(deletePcModal);
});

// Delete Confirmation
deleteConfirmation.addEventListener('input', (e) => {
    deleteBtn.disabled = e.target.value !== 'DELETE';
});

// Password Strength Meter
newPassword.addEventListener('input', (e) => {
    const password = e.target.value;
    const strength = calculatePasswordStrength(password);
    updateStrengthIndicator(strength);
});

function calculatePasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    return Math.min(strength, 100);
}

function updateStrengthIndicator(strength) {
    strengthIndicator.style.width = `${strength}%`;
    
    if (strength < 25) {
        strengthIndicator.style.backgroundColor = '#f44336';
    } else if (strength < 50) {
        strengthIndicator.style.backgroundColor = '#ff9800';
    } else if (strength < 75) {
        strengthIndicator.style.backgroundColor = '#2196f3';
    } else {
        strengthIndicator.style.backgroundColor = '#4caf50';
    }
}

// Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.className = 'ripple';
    
    button.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

// Add ripple effect to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// 3D Tilt Effect
function addTiltEffect(element) {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Add tilt effect to security card
const securityCard = document.querySelector('.security-card');
addTiltEffect(securityCard);

// Initialize Password Reset Flow
function initializePasswordReset() {
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;
    
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.style.display = index === stepIndex ? 'block' : 'none';
        });
    }
    
    showStep(currentStep);
    
    // Add step navigation logic here
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.getElementById('toastContainer').appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Export functions for use in other modules
window.settingsLab = {
    showToast,
    addTiltEffect,
    calculatePasswordStrength
}; 