document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('pcLoginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const id = document.getElementById('pcId').value;
        const password = document.getElementById('pcPassword').value;
        
        // Check credentials
        if (id === 'SCHOOL PC' && password === 'SCHOOL 123') {
            // Store login status
            localStorage.setItem('pcLoggedIn', 'true');
            // Redirect to primary controller dashboard
            window.location.href = 'pc-dashboard.html';
        } else {
            alert('Invalid ID or Password');
        }
    });
}); 