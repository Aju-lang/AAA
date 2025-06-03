document.addEventListener('DOMContentLoaded', function() {
    // Student data for different categories
    const studentData = {
        hs: [
            { name: 'Karthik B', class: '9', points: 150 },
            { name: 'Simran J', class: '8', points: 145 },
            { name: 'Rohan D', class: '10', points: 140 },
            { name: 'Priya R', class: '10', points: 130 },
            { name: 'Meera T', class: '8', points: 125 },
            { name: 'Aryan M', class: '8', points: 120 },
            { name: 'Anjali P', class: '9', points: 115 },
            { name: 'Rahul S', class: '10', points: 105 },
            { name: 'Neha K', class: '9', points: 98 },
            { name: 'Mohit L', class: '8', points: 80 }
        ],
        up: [
            { name: 'Kavya M', class: '7', points: 130 },
            { name: 'Ria K', class: '5', points: 125 },
            { name: 'Rakesh C', class: '6', points: 120 },
            { name: 'Tarun Y', class: '7', points: 115 },
            { name: 'Vishal N', class: '7', points: 110 },
            { name: 'Pooja D', class: '6', points: 105 },
            { name: 'Aravind H', class: '5', points: 100 },
            { name: 'Sneha G', class: '6', points: 95 },
            { name: 'Aditi S', class: '5', points: 90 },
            { name: 'Sanjay P', class: '5', points: 85 }
        ],
        lp: [
            { name: 'Tanya D', class: '2', points: 140 },
            { name: 'Snehal P', class: '4', points: 130 },
            { name: 'Vikram L', class: '1', points: 115 },
            { name: 'Arjun B', class: '1', points: 110 },
            { name: 'Ananya S', class: '4', points: 105 },
            { name: 'Rohit K', class: '3', points: 95 },
            { name: 'Deepika R', class: '2', points: 90 },
            { name: 'Manish T', class: '3', points: 85 },
            { name: 'Swati J', class: '2', points: 80 },
            { name: 'Nitin V', class: '1', points: 75 }
        ]
    };

    // Track current category
    let currentCategory = 'hs';

    // Constants
    const POINTS_PER_DAY = 10;
    const MAX_WEEKLY_POINTS = 50; // Maximum points per week
    const REDEMPTION_TIME = {
        START: 8, // 8 AM
        END: 20   // 8 PM
    };

    function getWeeklyPoints(studentName) {
        const historyKey = `${studentName}_points_history`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        startOfWeek.setHours(0, 0, 0, 0);

        return history
            .filter(entry => new Date(entry.date) >= startOfWeek)
            .reduce((total, entry) => total + entry.points, 0);
    }

    function canRedeemAtCurrentTime() {
        const now = new Date();
        const hour = now.getHours();
        return hour >= REDEMPTION_TIME.START && hour < REDEMPTION_TIME.END;
    }

    // Generate overall category by combining and sorting all students
    studentData.overall = Object.values(studentData)
        .flat()
        .sort((a, b) => b.points - a.points)
        .slice(0, 10);

    // Initialize with High School category
    updateLeaderboard('hs');

    // Add event listeners for category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            currentCategory = category;
            updateLeaderboard(category);
            document.getElementById('categoryFilter').value = category;
            
            // Update category cards to show active state
            document.querySelectorAll('.category-card').forEach(c => 
                c.classList.remove('active'));
            card.classList.add('active');

            // Add animation effect
            card.classList.add('pulse');
            setTimeout(() => card.classList.remove('pulse'), 300);
        });
    });

    // Add event listeners for filters
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        currentCategory = e.target.value;
        updateLeaderboard(e.target.value);
    });

    document.getElementById('studentSearch').addEventListener('input', (e) => {
        const category = document.getElementById('categoryFilter').value;
        updateLeaderboard(category, e.target.value);
    });

    // Point redemption tracking
    function checkDailyRedemption(studentName) {
        if (!canRedeemAtCurrentTime()) {
            return { 
                canRedeem: false, 
                message: `Points can only be redeemed between ${REDEMPTION_TIME.START}AM and ${REDEMPTION_TIME.END}PM`
            };
        }

        // Check weekly limit
        const weeklyPoints = getWeeklyPoints(studentName);
        if (weeklyPoints >= MAX_WEEKLY_POINTS) {
            return {
                canRedeem: false,
                message: `Weekly points limit (${MAX_WEEKLY_POINTS}) reached. Try again next week!`
            };
        }

        const today = new Date().toDateString();
        const redemptionKey = `${studentName}_lastRedemption`;
        const lastRedemption = localStorage.getItem(redemptionKey);
        
        if (lastRedemption === today) {
            return { 
                canRedeem: false, 
                message: 'Points already redeemed today. Come back tomorrow!' 
            };
        }
        return { canRedeem: true };
    }
    
    function redeemDailyPoints(student) {
        const redemptionStatus = checkDailyRedemption(student.name);
        if (!redemptionStatus.canRedeem) {
            showToast(redemptionStatus.message);
            return false;
        }
        
        // Update points in all categories
        Object.keys(studentData).forEach(category => {
            const studentInCategory = studentData[category].find(s => s.name === student.name);
            if (studentInCategory) {
                studentInCategory.points += POINTS_PER_DAY;
                // Store points history
                const historyKey = `${student.name}_points_history`;
                const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
                history.push({
                    date: new Date().toISOString(),
                    points: POINTS_PER_DAY,
                    total: studentInCategory.points
                });
                localStorage.setItem(historyKey, JSON.stringify(history));
            }
        });
        
        // Record redemption
        const today = new Date().toDateString();
        localStorage.setItem(`${student.name}_lastRedemption`, today);
        
        // Update UI
        updateLeaderboard(currentCategory);
        updateTopPerformers();
        showToast(`🎉 ${POINTS_PER_DAY} points redeemed successfully!`);
        
        // Update modal display
        updateStudentProfile(student);
        
        return true;
    }
    
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    function updateLeaderboard(category, searchTerm = '') {
        const tbody = document.getElementById('leaderboardBody');
        let data = [...studentData[category]];

        // Apply search filter
        if (searchTerm) {
            data = data.filter(student => 
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.class.toString().includes(searchTerm)
            );
        }

        // Sort by points
        data.sort((a, b) => b.points - a.points);

        // Update table with animation
        tbody.style.opacity = '0';
        setTimeout(() => {
            tbody.innerHTML = data.map((student, index) => `
                <tr class="${index < 3 ? 'top-' + (index + 1) : ''} fade-in" 
                    onclick="showStudentProfile('${student.name}')">
                    <td>${index + 1}</td>
                    <td>
                        <div class="student-info">
                            <img src="https://ui-avatars.com/api/?name=${student.name.replace(' ', '+')}" 
                                 alt="${student.name}">
                            ${student.name}
                            ${index < 3 ? `<i class="fas fa-trophy trophy-${index + 1}"></i>` : ''}
                        </div>
                    </td>
                    <td>Class ${student.class}</td>
                    <td>${student.points} pts</td>
                </tr>
            `).join('');
            tbody.style.opacity = '1';
        }, 150);

        // Update header
        const header = document.querySelector('.leaderboard-header h2');
        header.textContent = `${category.toUpperCase()} Leaderboard`;
        header.classList.add('pulse');
        setTimeout(() => header.classList.remove('pulse'), 300);

        // Show no results message if needed
        if (data.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; padding: 20px;">
                        <i class="fas fa-search" style="margin-right: 10px;"></i>
                        No students found matching your search.
                    </td>
                </tr>
            `;
        }

        // Update top performers
        updateTopPerformers();
    }

    function updateTopPerformers() {
        Object.keys(studentData).forEach(category => {
            const topStudent = studentData[category][0];
            const card = document.querySelector(`.category-card[data-category="${category}"]`);
            if (card && topStudent) {
                const topStudentDiv = card.querySelector('.top-student');
                topStudentDiv.innerHTML = `
                    <img src="https://ui-avatars.com/api/?name=${topStudent.name.replace(' ', '+')}" 
                         alt="${topStudent.name}">
                    <div class="student-info">
                        <span class="name">${topStudent.name}</span>
                        <span class="points">${topStudent.points} points</span>
                    </div>
                `;
            }
        });
    }

    // Student Profile Functions
    window.showStudentProfile = function(studentName) {
        const student = getAllStudents().find(s => s.name === studentName);
        if (!student) return;

        const modal = document.getElementById('studentProfileModal');
        modal.classList.add('show');

        // Add redemption status and button
        const canRedeem = checkDailyRedemption(student.name);
        const redeemButton = `
            <button class="redeem-btn ${canRedeem ? '' : 'disabled'}" 
                    onclick="redeemPoints('${student.name}')" 
                    ${canRedeem ? '' : 'disabled'}>
                <i class="fas fa-gift"></i>
                ${canRedeem ? 'Redeem Daily Points' : 'Already Redeemed Today'}
            </button>
        `;

        // Update profile info with redemption button
        modal.querySelector('.profile-info').innerHTML = `
            <h2 class="student-name">${student.name}</h2>
            <p class="student-class">Class ${student.class}</p>
            <p class="student-points"><i class="fas fa-star"></i> ${student.points} points</p>
            ${redeemButton}
            <div class="student-stats">
                <div class="stat-item">
                    <span class="stat-label">Rank</span>
                    <span class="stat-value">#${getStudentRank(student)}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Attendance</span>
                    <span class="stat-value">${generateRandomData(1, 85, 100)}%</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Activities</span>
                    <span class="stat-value">${generateRandomData(1, 5, 15)}</span>
                </div>
            </div>
        `;

        // Initialize charts
        initializeProfileCharts(student);
        loadAchievements(student);
    };

    function getStudentRank(student) {
        const allStudents = getAllStudents();
        allStudents.sort((a, b) => b.points - a.points);
        return allStudents.findIndex(s => s.name === student.name) + 1;
    }

    function loadAchievements(student) {
        // Load points history
        const historyKey = `${student.name}_points_history`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        const historyList = document.querySelector('.history-list');
        
        // Get weekly points
        const weeklyPoints = getWeeklyPoints(student.name);
        const weeklyLimit = `
            <div class="weekly-limit">
                <div class="limit-progress">
                    <div class="progress-bar" style="width: ${(weeklyPoints / MAX_WEEKLY_POINTS) * 100}%"></div>
                </div>
                <div class="limit-text">
                    Weekly Points: ${weeklyPoints}/${MAX_WEEKLY_POINTS}
                </div>
            </div>
        `;
        
        if (history.length === 0) {
            historyList.innerHTML = `
                ${weeklyLimit}
                <div class="history-item">
                    <span>No points history yet</span>
                </div>
            `;
        } else {
            historyList.innerHTML = `
                ${weeklyLimit}
                ${history
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 10)
                    .map(entry => {
                        const date = new Date(entry.date);
                        return `
                            <div class="history-item">
                                <div class="history-info">
                                    <div class="history-date">
                                        ${date.toLocaleDateString()} ${date.toLocaleTimeString()}
                                    </div>
                                    <div class="history-points">
                                        <i class="fas fa-plus"></i> ${entry.points} points
                                        <span class="history-total">(Total: ${entry.total})</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    })
                    .join('')}
            `;
        }

        const achievements = [
            {
                icon: 'fa-trophy',
                title: 'Top Performer',
                description: 'Ranked in top 3',
                unlocked: getStudentRank(student) <= 3
            },
            {
                icon: 'fa-graduation-cap',
                title: 'Scholar',
                description: 'Earned 100+ points',
                unlocked: student.points >= 100
            },
            {
                icon: 'fa-fire',
                title: 'Rising Star',
                description: 'Improved rank by 5 positions',
                unlocked: Math.random() > 0.5
            },
            {
                icon: 'fa-medal',
                title: 'Perfect Attendance',
                description: '100% attendance',
                unlocked: Math.random() > 0.7
            },
            {
                icon: 'fa-star',
                title: 'All-Rounder',
                description: 'Excellence in all subjects',
                unlocked: Math.random() > 0.6
            },
            {
                icon: 'fa-crown',
                title: 'Class Leader',
                description: 'Top in class',
                unlocked: Math.random() > 0.8
            }
        ];

        const achievementGrid = document.querySelector('.achievement-grid');
        achievementGrid.innerHTML = achievements.map(achievement => `
            <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">
                    <i class="fas ${achievement.icon}"></i>
                </div>
                <h4>${achievement.title}</h4>
                <p>${achievement.description}</p>
            </div>
        `).join('');
    }

    // Close modal when clicking close button or outside
    document.querySelector('.close-btn').addEventListener('click', () => {
        document.getElementById('studentProfileModal').classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        const modal = document.getElementById('studentProfileModal');
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    function initializeProfileCharts(student) {
        // Weekly Progress Chart
        const weeklyCtx = document.getElementById('weeklyProgressChart').getContext('2d');
        new Chart(weeklyCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Points',
                    data: generateRandomData(7, 20, 50),
                    borderColor: getComputedStyle(document.documentElement)
                        .getPropertyValue('--primary-color'),
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Subject Performance Chart
        const subjectCtx = document.getElementById('subjectPerformanceChart').getContext('2d');
        new Chart(subjectCtx, {
            type: 'radar',
            data: {
                labels: ['Math', 'Science', 'English', 'History', 'Arts'],
                datasets: [{
                    label: 'Performance',
                    data: generateRandomData(5, 60, 100),
                    backgroundColor: 'rgba(33, 150, 243, 0.2)',
                    borderColor: getComputedStyle(document.documentElement)
                        .getPropertyValue('--primary-color')
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function generateRandomData(count, min, max) {
        return Array.from({ length: count }, () => 
            Math.floor(Math.random() * (max - min + 1)) + min);
    }

    // Global function for redeeming points
    window.redeemPoints = function(studentName) {
        const student = getAllStudents().find(s => s.name === studentName);
        if (student) {
            redeemDailyPoints(student);
        }
    };

    function updateStudentProfile(student) {
        const pointsDisplay = document.querySelector('.student-points');
        if (pointsDisplay) {
            pointsDisplay.innerHTML = `<i class="fas fa-star"></i> ${student.points} points`;
        }

        // Update redemption button
        const redemptionStatus = checkDailyRedemption(student.name);
        const redeemBtn = document.querySelector('.redeem-btn');
        if (redeemBtn) {
            redeemBtn.classList.toggle('disabled', !redemptionStatus.canRedeem);
            redeemBtn.disabled = !redemptionStatus.canRedeem;
            redeemBtn.innerHTML = `
                <i class="fas fa-gift"></i>
                ${redemptionStatus.canRedeem ? 'Redeem Daily Points' : redemptionStatus.message}
            `;
        }
    }
}); 