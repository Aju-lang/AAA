document.addEventListener('DOMContentLoaded', function() {
    // Hardcode a default student ID since we're removing login
    const studentId = '2024001';

    // Student data collection
    const studentsData = {
        '2024001': {
            name: "Mohammed Abshir",
            grade: "XII Science",
            photo: "https://ui-avatars.com/api/?name=Mohammed+Abshir",
            details: {
                rollNo: "2024001",
                parentName: "Mohammed Hassan",
                place: "Dubai, UAE",
                email: "abshir@abmiacademy.com",
                phoneNumber: "+971 50 123 4567"
            },
            academics: {
                term1: { 
                    marks: 95,
                    grade: "A+",
                    subjects: {
                        Physics: 98,
                        Chemistry: 95,
                        Mathematics: 96,
                        Biology: 92,
                        English: 94
                    }
                },
                term2: { 
                    marks: 92,
                    grade: "A+",
                    subjects: {
                        Physics: 94,
                        Chemistry: 92,
                        Mathematics: 93,
                        Biology: 90,
                        English: 91
                    }
                },
                term3: { 
                    marks: 88,
                    grade: "A",
                    subjects: {
                        Physics: 89,
                        Chemistry: 87,
                        Mathematics: 90,
                        Biology: 86,
                        English: 88
                    }
                },
                modelExam: { 
                    marks: 90,
                    grade: "A+",
                    subjects: {
                        Physics: 92,
                        Chemistry: 89,
                        Mathematics: 91,
                        Biology: 88,
                        English: 90
                    }
                }
            },
            stats: {
                totalPoints: 250,
                leadershipRank: 5,
                attendance: {
                    percentage: 85,
                    attended: 34,
                    total: 40
                },
                classRank: 3,
                overallRank: 15
            },
            pointsBreakdown: {
                abmiClasses: {
                    points: 45,
                    details: [
                        { class: "Quantum Computing", points: 15, date: "2024-03-15" },
                        { class: "AI Ethics", points: 15, date: "2024-03-10" },
                        { class: "Blockchain Basics", points: 15, date: "2024-03-05" }
                    ]
                },
                certificates: {
                    points: 30,
                    details: [
                        { name: "Google Data Analytics", points: 10, date: "2024-02-20" },
                        { name: "AWS Cloud Practitioner", points: 10, date: "2024-02-15" },
                        { name: "Microsoft Azure Fundamentals", points: 10, date: "2024-02-10" }
                    ]
                },
                competitions: {
                    points: 50,
                    details: [
                        { competition: "International Science Olympiad", position: 1, points: 10, date: "2024-03-01" },
                        { competition: "National Math Challenge", position: 2, points: 5, date: "2024-02-25" },
                        { competition: "Regional Coding Competition", position: 1, points: 10, date: "2024-02-18" }
                    ]
                }
            },
            achievements: [
                {
                    title: "International Science Olympiad Winner",
                    date: "March 1, 2024",
                    points: 10,
                    icon: "trophy",
                    description: "First place in International Science Olympiad 2024",
                    certificate: "path/to/certificate.pdf"
                },
                {
                    title: "Google Data Analytics Certificate",
                    date: "February 20, 2024",
                    points: 10,
                    icon: "certificate",
                    description: "Professional certification in Data Analytics",
                    certificate: "path/to/google-cert.pdf"
                },
                {
                    title: "AWS Cloud Practitioner",
                    date: "February 15, 2024",
                    points: 10,
                    icon: "certificate",
                    description: "Cloud computing fundamentals certification",
                    certificate: "path/to/aws-cert.pdf"
                },
                {
                    title: "National Math Challenge Runner-up",
                    date: "February 25, 2024",
                    points: 5,
                    icon: "medal",
                    description: "Second place in National Mathematics Challenge 2024",
                    certificate: "path/to/math-cert.pdf"
                }
            ],
            recentActivities: [
                {
                    type: "class",
                    name: "Quantum Computing Fundamentals",
                    date: "March 15, 2024",
                    points: 15,
                    status: "Completed"
                },
                {
                    type: "competition",
                    name: "International Science Olympiad",
                    date: "March 1, 2024",
                    points: 10,
                    status: "Won First Place"
                },
                {
                    type: "certificate",
                    name: "Google Data Analytics",
                    date: "February 20, 2024",
                    points: 10,
                    status: "Earned"
                }
            ]
        },
        '2024002': {
            name: "Hashir Ahmed",
            grade: "XII Commerce",
            photo: "https://ui-avatars.com/api/?name=Hashir+Ahmed",
            details: {
                rollNo: "2024002",
                parentName: "Ahmed Khan",
                place: "Sharjah, UAE",
                email: "hashir@abmiacademy.com",
                phoneNumber: "+971 50 234 5678"
            },
            academics: {
                term1: { 
                    marks: 92,
                    grade: "A+",
                    subjects: {
                        Accounting: 95,
                        Economics: 92,
                        Business: 94,
                        Mathematics: 90,
                        English: 89
                    }
                },
                term2: { 
                    marks: 88,
                    grade: "A",
                    subjects: {
                        Accounting: 90,
                        Economics: 87,
                        Business: 89,
                        Mathematics: 88,
                        English: 86
                    }
                },
                term3: { 
                    marks: 91,
                    grade: "A+",
                    subjects: {
                        Accounting: 93,
                        Economics: 90,
                        Business: 92,
                        Mathematics: 89,
                        English: 91
                    }
                },
                modelExam: { 
                    marks: 89,
                    grade: "A",
                    subjects: {
                        Accounting: 91,
                        Economics: 88,
                        Business: 90,
                        Mathematics: 87,
                        English: 89
                    }
                }
            },
            stats: {
                totalPoints: 220,
                leadershipRank: 8,
                attendance: {
                    percentage: 90,
                    attended: 36,
                    total: 40
                },
                classRank: 5,
                overallRank: 20
            },
            pointsBreakdown: {
                abmiClasses: {
                    points: 60,
                    details: [
                        { class: "Financial Markets", points: 15, date: "2024-03-15" },
                        { class: "Digital Marketing", points: 15, date: "2024-03-10" },
                        { class: "Business Analytics", points: 15, date: "2024-03-05" },
                        { class: "Entrepreneurship", points: 15, date: "2024-02-28" }
                    ]
                },
                certificates: {
                    points: 40,
                    details: [
                        { name: "Financial Modeling", points: 10, date: "2024-02-20" },
                        { name: "Digital Marketing Pro", points: 10, date: "2024-02-15" },
                        { name: "Business Analytics", points: 10, date: "2024-02-10" },
                        { name: "Entrepreneurship", points: 10, date: "2024-02-05" }
                    ]
                },
                competitions: {
                    points: 35,
                    details: [
                        { competition: "Business Plan Competition", position: 1, points: 10, date: "2024-03-01" },
                        { competition: "Stock Market Challenge", position: 2, points: 5, date: "2024-02-25" },
                        { competition: "Marketing Strategy Contest", position: 1, points: 10, date: "2024-02-18" }
                    ]
                }
            },
            achievements: [
                {
                    title: "Business Plan Competition Winner",
                    date: "March 1, 2024",
                    points: 10,
                    icon: "trophy",
                    description: "First place in National Business Plan Competition 2024",
                    certificate: "path/to/business-cert.pdf"
                },
                {
                    title: "Digital Marketing Professional",
                    date: "February 15, 2024",
                    points: 10,
                    icon: "certificate",
                    description: "Advanced certification in Digital Marketing",
                    certificate: "path/to/marketing-cert.pdf"
                }
            ],
            recentActivities: [
                {
                    type: "class",
                    name: "Financial Markets",
                    date: "March 15, 2024",
                    points: 15,
                    status: "Completed"
                },
                {
                    type: "competition",
                    name: "Business Plan Competition",
                    date: "March 1, 2024",
                    points: 10,
                    status: "Won First Place"
                }
            ]
        }
        // ... Add more students as needed
    };

    // Get current student's data
    const studentData = studentsData[studentId];

    // Update profile information
    function updateProfile() {
        document.querySelector('.profile-pic').src = studentData.photo;
        document.querySelector('.profile-header h1').textContent = studentData.name;
        document.querySelector('.grade').textContent = `Grade: ${studentData.grade}`;
        
        // Update student details
        const details = document.querySelector('.student-details');
        details.innerHTML = `
            <p><i class="fas fa-id-card"></i> Roll No: ${studentData.details.rollNo}</p>
            <p><i class="fas fa-user-friends"></i> Parent: ${studentData.details.parentName}</p>
            <p><i class="fas fa-map-marker-alt"></i> Place: ${studentData.details.place}</p>
        `;
    }

    // Update academic performance
    function updateAcademics() {
        const terms = ['term1', 'term2', 'term3', 'modelExam'];
        const termNames = ['Term 1', 'Term 2', 'Term 3', 'Model Exam'];
        
        terms.forEach((term, index) => {
            const termData = studentData.academics[term];
            const termCard = document.querySelector(`.term-card:nth-child(${index + 1})`);
            if (termCard) {
                termCard.querySelector('.marks').textContent = `${termData.marks}%`;
                termCard.querySelector('.grade').textContent = `Grade: ${termData.grade}`;
            }
        });
    }

    // Update points and rankings
    function updateStats() {
        // Update total points
        const pointsCard = document.querySelector('.stat-card:nth-child(1)');
        pointsCard.querySelector('p').textContent = studentData.stats.totalPoints;
        pointsCard.querySelector('.points-worth').textContent = 
            `Worth ₹${(studentData.stats.totalPoints * 0.25).toFixed(2)}`;

        // Update leadership rank
        document.querySelector('.stat-card:nth-child(2) p').textContent = 
            `#${studentData.stats.leadershipRank}`;

        // Update attendance
        const attendance = studentData.stats.attendance;
        document.querySelector('.stat-card:nth-child(3) p').textContent = 
            `${attendance.percentage}%`;
        document.querySelector('.stat-card:nth-child(3) span').textContent = 
            `${attendance.attended}/${attendance.total} Classes`;
    }

    // Update points breakdown
    function updatePointsBreakdown() {
        const breakdown = studentData.pointsBreakdown;
        const cards = document.querySelectorAll('.breakdown-card');
        
        // ABMI Classes
        updateBreakdownCard(cards[0], breakdown.abmiClasses.points, 100);
        // Certificates
        updateBreakdownCard(cards[1], breakdown.certificates.points, 100);
        // Competitions
        updateBreakdownCard(cards[2], breakdown.competitions.points, 100);
    }

    function updateBreakdownCard(card, points, max) {
        card.querySelector('p').textContent = `${points} points`;
        card.querySelector('.progress').style.width = `${(points/max) * 100}%`;
    }

    // Update achievements
    function updateAchievements() {
        const achievementsList = document.querySelector('.achievements-list');
        achievementsList.innerHTML = studentData.achievements.map(achievement => `
            <div class="achievement-item">
                <i class="fas fa-${achievement.icon}"></i>
                <div class="achievement-details">
                    <h3>${achievement.title}</h3>
                    <p>Earned on: ${achievement.date}</p>
                    <span class="points-earned">+${achievement.points} points</span>
                </div>
            </div>
        `).join('');
    }

    // Additional function to update recent activities
    function updateRecentActivities() {
        const activitiesList = document.querySelector('.activities-list');
        if (activitiesList) {
            activitiesList.innerHTML = studentData.recentActivities.map(activity => `
                <div class="activity-item ${activity.type}">
                    <div class="activity-icon">
                        <i class="fas fa-${activity.type === 'class' ? 'graduation-cap' : 
                                        activity.type === 'competition' ? 'trophy' : 'certificate'}"></i>
                    </div>
                    <div class="activity-details">
                        <h4>${activity.name}</h4>
                        <p>${activity.date}</p>
                        <span class="activity-status">${activity.status}</span>
                        <span class="points-earned">+${activity.points} points</span>
                    </div>
                </div>
            `).join('');
        }
    }

    // Initialize animations
    function initializeAnimations() {
        document.querySelectorAll('section').forEach((section, index) => {
            section.style.animation = `fadeIn 0.5s ease forwards ${index * 0.2}s`;
        });
    }

    // Update initialize function to include new features
    function initialize() {
        updateProfile();
        updateAcademics();
        updateStats();
        updatePointsBreakdown();
        updateAchievements();
        updateRecentActivities();
        initializeAnimations();
    }

    // Start the app
    initialize();

    // Settings Panel Functionality
    const settingsTrigger = document.getElementById('settingsTrigger');
    const settingsPanel = document.getElementById('settingsPanel');
    const logoutOption = document.getElementById('logoutOption');
    const logoutModal = document.getElementById('logoutModal');
    const cancelLogout = document.getElementById('cancelLogout');
    const confirmLogout = document.getElementById('confirmLogout');
    const themeToggle = document.getElementById('themeToggle');

    // Toggle settings panel
    settingsTrigger.addEventListener('click', () => {
        settingsPanel.classList.toggle('active');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && 
            !settingsTrigger.contains(e.target)) {
            settingsPanel.classList.remove('active');
        }
    });

    // Show logout confirmation
    logoutOption.addEventListener('click', () => {
        logoutModal.classList.add('active');
        settingsPanel.classList.remove('active');
    });

    // Cancel logout
    cancelLogout.addEventListener('click', () => {
        logoutModal.classList.remove('active');
    });

    // Confirm logout
    confirmLogout.addEventListener('click', () => {
        confirmLogout.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging out...';
        confirmLogout.disabled = true;

        // Simulate logout process
        setTimeout(() => {
            // Clear user data
            localStorage.removeItem('currentUser');
            localStorage.removeItem('userToken');
            
            // Show success message
            showCustomToast('Logged out successfully', 'success');

            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }, 1500);
    });

    // Theme Toggle Functionality
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.checked = true;
    }

    // Theme toggle event listener
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    // Password Change Functionality
    const changePasswordForm = document.getElementById('changePasswordForm');
    const oldPassword = document.getElementById('oldPassword');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');

    changePasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate passwords
        if (newPassword.value !== confirmPassword.value) {
            showToast('New passwords do not match!', 'error');
            return;
        }

        if (newPassword.value.length < 8) {
            showToast('Password must be at least 8 characters long!', 'error');
            return;
        }

        // Here you would typically make an API call to change the password
        // For now, we'll just show a success message
        showToast('Password updated successfully!', 'success');
        changePasswordForm.reset();
    });

    // Logout Functionality
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutModal = document.getElementById('logoutModal');
    const cancelLogout = document.getElementById('cancelLogout');
    const confirmLogout = document.getElementById('confirmLogout');

    logoutBtn.addEventListener('click', () => {
        logoutModal.classList.add('active');
    });

    cancelLogout.addEventListener('click', () => {
        logoutModal.classList.remove('active');
    });

    confirmLogout.addEventListener('click', () => {
        // Clear any stored authentication data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        
        // Redirect to login page
        window.location.href = '/login';
    });

    // Close modal when clicking outside
    logoutModal.addEventListener('click', (e) => {
        if (e.target === logoutModal) {
            logoutModal.classList.remove('active');
        }
    });

    // Toast Notification Function
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Add toast styles
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: var(--card-background);
            color: var(--text-primary);
            border-radius: var(--border-radius);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: var(--box-shadow);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .toast.show {
            transform: translateY(0);
            opacity: 1;
        }

        .toast.success {
            border-left: 4px solid #2ecc71;
        }

        .toast.error {
            border-left: 4px solid #e74c3c;
        }

        .toast i {
            font-size: 1.2rem;
        }

        .toast.success i {
            color: #2ecc71;
        }

        .toast.error i {
            color: #e74c3c;
        }
    `;
    document.head.appendChild(style);
});

// Enhanced toast notification
function showCustomToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast ${type} custom-toast`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
} 