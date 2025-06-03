document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const showSignupBtn = document.getElementById('showSignup');
    const showLoginBtn = document.getElementById('showLogin');
    const userTypeToggles = document.querySelectorAll('.toggle-btn');
    const passwordToggles = document.querySelectorAll('.toggle-password');
    
    // Initialize users in localStorage if not exists
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify({
            students: [],
            controllers: [{
                username: 'admin',
                password: 'Admin@123',
                name: 'Admin User',
                email: 'admin@abmiacademy.com'
            }]
        }));
    }

    // Form switching
    function toggleForms(showSignup) {
        loginForm.classList.toggle('hidden', showSignup);
        signupForm.classList.toggle('hidden', !showSignup);
    }

    showSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleForms(true);
    });

    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleForms(false);
    });

    // User type toggle
    userTypeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            userTypeToggles.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Password visibility toggle
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type');
            input.setAttribute('type', type === 'password' ? 'text' : 'password');
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Generate initial bio data for new user
    function generateInitialBioData(userData) {
        return {
            name: userData.name,
            grade: userData.class,
            photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
            details: {
                rollNo: generateRollNumber(),
                parentName: userData.parentName,
                place: userData.place,
                email: userData.email,
                phoneNumber: userData.phone || "Not provided"
            },
            academics: {
                term1: { 
                    marks: "Not Available",
                    grade: "N/A",
                    subjects: {
                        Physics: "-",
                        Chemistry: "-",
                        Mathematics: "-",
                        Biology: "-",
                        English: "-"
                    }
                },
                term2: { 
                    marks: "Not Available",
                    grade: "N/A",
                    subjects: {
                        Physics: "-",
                        Chemistry: "-",
                        Mathematics: "-",
                        Biology: "-",
                        English: "-"
                    }
                },
                term3: { 
                    marks: "Not Available",
                    grade: "N/A",
                    subjects: {
                        Physics: "-",
                        Chemistry: "-",
                        Mathematics: "-",
                        Biology: "-",
                        English: "-"
                    }
                }
            },
            stats: {
                totalPoints: 0,
                leadershipRank: "New Student",
                attendance: {
                    percentage: 0,
                    attended: 0,
                    total: 0
                },
                classRank: "Not Ranked",
                overallRank: "Not Ranked"
            },
            pointsBreakdown: {
                abmiClasses: {
                    points: 0,
                    details: []
                },
                certificates: {
                    points: 0,
                    details: []
                },
                competitions: {
                    points: 0,
                    details: []
                }
            },
            achievements: [
                {
                    title: "Joined ABMI Academy",
                    date: new Date().toLocaleDateString(),
                    points: 5,
                    icon: "star",
                    description: "Started the journey with ABMI Academy"
                }
            ],
            recentActivities: [
                {
                    type: "registration",
                    name: "Account Creation",
                    date: new Date().toLocaleDateString(),
                    points: 5,
                    status: "Completed"
                }
            ]
        };
    }

    // Generate unique roll number
    function generateRollNumber() {
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${year}${random}`;
    }

    // Modified signup form submission
    signupForm.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        
        if (!validateForm(formData)) return;

        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('users'));
        const emailExists = users.students.some(user => 
            user.email.toLowerCase() === formData.get('email').toLowerCase()
        );
        
        if (emailExists) {
            showError('This email is already registered. Please login instead.');
            return;
        }

        // Create new user object
        const newUser = {
            username: formData.get('email').split('@')[0].toLowerCase(),
            password: formData.get('password'),
            email: formData.get('email').toLowerCase(),
            name: formData.get('fullName'),
            class: formData.get('class'),
            parentName: formData.get('parentName'),
            place: formData.get('place'),
            phone: formData.get('phone') || '',
            createdAt: new Date().toISOString()
        };

        // Generate bio data
        const bioData = generateInitialBioData(newUser);

        try {
            // Update users in localStorage
            users.students.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Store bio data
            localStorage.setItem(`bio_${newUser.username}`, JSON.stringify(bioData));

            showSuccess('Account created successfully! Please login to continue.');
            
            // Clear form
            this.reset();
            
            // Switch back to login form after delay
            setTimeout(() => {
                toggleForms(false);
                // Pre-fill username in login form
                loginForm.querySelector('input[name="username"]').value = newUser.email;
            }, 2000);
        } catch (error) {
            showError('Error creating account. Please try again.');
            console.error('Error:', error);
        }
    });

    // Modified login form submission
    loginForm.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const username = formData.get('username').toLowerCase();
        const password = formData.get('password');
        const userType = document.querySelector('.toggle-btn.active').dataset.type;

        if (!validateForm(formData)) return;

        try {
            // Get stored users
            const users = JSON.parse(localStorage.getItem('users'));
            const userList = userType === 'student' ? users.students : users.controllers;
            
            // Check both username and email for students
            const user = userList.find(u => 
                (u.username === username || u.email === username) && 
                u.password === password
            );

            if (user) {
                showSuccess('Login successful! Redirecting...');
                
                // Get bio data
                const bioData = JSON.parse(localStorage.getItem(`bio_${user.username}`));
                
                // Store session data
                const sessionData = {
                    type: userType,
                    ...user,
                    bio: bioData,
                    lastLogin: new Date().toISOString()
                };

                localStorage.setItem('currentUser', JSON.stringify(sessionData));

                // Handle remember me
                if (formData.get('remember')) {
                    localStorage.setItem('rememberedUser', username);
                } else {
                    localStorage.removeItem('rememberedUser');
                }

                // Redirect based on user type
                setTimeout(() => {
                    window.location.href = userType === 'student' ? 'school-lab.html' : 'dashboard.html';
                }, 1500);
            } else {
                showError('Invalid username/email or password');
            }
        } catch (error) {
            showError('Error logging in. Please try again.');
            console.error('Error:', error);
        }
    });

    // Check for remembered user on page load
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        loginForm.querySelector('input[name="username"]').value = rememberedUser;
        loginForm.querySelector('input[name="remember"]').checked = true;
    }

    // Add password validation
    function validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        
        if (password.length < minLength) {
            showError('Password must be at least 8 characters long');
            return false;
        }
        if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
            showError('Password must contain uppercase, lowercase letters and numbers');
            return false;
        }
        return true;
    }

    // Add email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address');
            return false;
        }
        return true;
    }

    // Enhanced form validation
    function validateForm(formData) {
        for (let [key, value] of formData.entries()) {
            if (!value.trim()) {
                showError(`Please fill in all fields`);
                return false;
            }
        }

        if (formData.has('email') && !validateEmail(formData.get('email'))) {
            return false;
        }

        if (formData.has('password') && !validatePassword(formData.get('password'))) {
            return false;
        }

        return true;
    }

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

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Add toast styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
            z-index: 1000;
        }
        .toast.show {
            opacity: 1;
            transform: translateY(0);
        }
        .toast.success {
            background: var(--primary-color);
        }
        .toast.error {
            background: #f44336;
        }
    `;
    document.head.appendChild(style);
}); 