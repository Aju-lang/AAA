document.addEventListener('DOMContentLoaded', function() {
    // Certificate Data
    const certificates = [
        {
            id: 1,
            title: "Google Data Analytics Professional Certificate",
            provider: "Google",
            providerLogo: "https://www.gstatic.com/images/branding/product/2x/google_cloud_64dp.png",
            category: "technology",
            difficulty: "intermediate",
            duration: "6 months",
            description: "Learn in-demand skills like data cleaning, analysis, and visualization using real-world examples.",
            link: "https://www.coursera.org/professional-certificates/google-data-analytics",
            points: 10
        },
        {
            id: 2,
            title: "Meta Front-End Developer Certificate",
            provider: "Meta",
            providerLogo: "https://about.meta.com/brand/resources/facebookapp/logo/logo-black.png",
            category: "technology",
            difficulty: "beginner",
            duration: "3 months",
            description: "Master front-end development with React and modern web technologies.",
            link: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
            points: 10
        },
        {
            id: 3,
            title: "IBM Project Management Certificate",
            provider: "IBM",
            providerLogo: "https://www.ibm.com/brand/experience-guides/developer/b1db1ae501d522a1a4b49613fe07c9f1/01_8-bar-positive.svg",
            category: "business",
            difficulty: "intermediate",
            duration: "4 months",
            description: "Learn essential project management skills and methodologies.",
            link: "https://www.coursera.org/professional-certificates/ibm-project-management",
            points: 10
        },
        {
            id: 4,
            title: "Digital Marketing Fundamentals",
            provider: "HubSpot Academy",
            providerLogo: "https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png",
            category: "business",
            difficulty: "beginner",
            duration: "2 months",
            description: "Master digital marketing basics including SEO, content marketing, and social media.",
            link: "https://academy.hubspot.com/courses/digital-marketing",
            points: 10
        },
        {
            id: 5,
            title: "AWS Cloud Practitioner",
            provider: "Amazon",
            providerLogo: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png",
            category: "technology",
            difficulty: "beginner",
            duration: "3 months",
            description: "Learn cloud computing basics and AWS fundamentals.",
            link: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
            points: 10
        }
    ];

    // ABMI Classes Data
    const abmiClasses = [
        {
            id: 1,
            title: "Advanced Mathematics Workshop",
            instructor: "Dr. Sarah Johnson",
            schedule: "Every Monday, 4:00 PM - 5:30 PM",
            startDate: "2024-04-01",
            duration: "8 weeks",
            topics: ["Calculus", "Linear Algebra", "Statistics"],
            points: 15,
            maxStudents: 30
        },
        {
            id: 2,
            title: "Creative Writing Masterclass",
            instructor: "Prof. Michael Chen",
            schedule: "Wednesdays, 3:00 PM - 4:30 PM",
            startDate: "2024-04-03",
            duration: "6 weeks",
            topics: ["Story Structure", "Character Development", "Dialogue Writing"],
            points: 15,
            maxStudents: 25
        },
        {
            id: 3,
            title: "Science Lab Experiments",
            instructor: "Dr. Emily Roberts",
            schedule: "Tuesdays and Thursdays, 2:00 PM - 3:30 PM",
            startDate: "2024-04-02",
            duration: "10 weeks",
            topics: ["Physics Experiments", "Chemistry Labs", "Biology Projects"],
            points: 15,
            maxStudents: 20
        },
        {
            id: 4,
            title: "Public Speaking Excellence",
            instructor: "Mr. James Wilson",
            schedule: "Friday, 3:00 PM - 4:30 PM",
            startDate: "2024-04-05",
            duration: "4 weeks",
            topics: ["Speech Structure", "Body Language", "Voice Modulation"],
            points: 15,
            maxStudents: 15
        },
        {
            id: 5,
            title: "Coding Bootcamp",
            instructor: "Ms. Lisa Zhang",
            schedule: "Saturday, 10:00 AM - 12:00 PM",
            startDate: "2024-04-06",
            duration: "12 weeks",
            topics: ["Web Development", "Python Programming", "App Development"],
            points: 15,
            maxStudents: 25
        },
        {
            id: 6,
            title: "Competitive Mathematics",
            instructor: "Dr. Robert Kumar",
            schedule: "Tuesday and Thursday, 5:00 PM - 6:30 PM",
            startDate: "2024-04-02",
            duration: "12 weeks",
            topics: [
                "Olympiad Problems",
                "Advanced Problem Solving",
                "Mathematical Reasoning"
            ],
            points: 15,
            maxStudents: 20,
            description: "Prepare for mathematics competitions and olympiads with advanced problem-solving techniques."
        },
        {
            id: 7,
            title: "English Language Excellence",
            instructor: "Ms. Elizabeth Parker",
            schedule: "Monday and Wednesday, 3:30 PM - 5:00 PM",
            startDate: "2024-04-08",
            duration: "8 weeks",
            topics: [
                "Advanced Grammar",
                "Essay Writing",
                "Literature Analysis",
                "Public Speaking"
            ],
            points: 15,
            maxStudents: 25,
            description: "Enhance your English language skills through comprehensive learning and practice."
        },
        {
            id: 8,
            title: "Digital Art & Design",
            instructor: "Mr. Alex Thompson",
            schedule: "Saturday, 2:00 PM - 4:00 PM",
            startDate: "2024-04-13",
            duration: "10 weeks",
            topics: [
                "Digital Drawing",
                "Graphic Design",
                "Animation Basics",
                "Portfolio Creation"
            ],
            points: 15,
            maxStudents: 15,
            description: "Learn digital art creation using industry-standard tools and techniques."
        },
        {
            id: 9,
            title: "Robotics & AI Workshop",
            instructor: "Dr. David Lee",
            schedule: "Friday, 4:30 PM - 6:30 PM",
            startDate: "2024-04-12",
            duration: "16 weeks",
            topics: [
                "Robot Building",
                "Programming Basics",
                "AI Concepts",
                "Project Development"
            ],
            points: 15,
            maxStudents: 20,
            description: "Hands-on experience with robotics and artificial intelligence concepts."
        },
        {
            id: 10,
            title: "Environmental Science Projects",
            instructor: "Dr. Maria Rodriguez",
            schedule: "Wednesday, 4:00 PM - 5:30 PM",
            startDate: "2024-04-10",
            duration: "8 weeks",
            topics: [
                "Ecosystem Studies",
                "Climate Change",
                "Sustainable Practices",
                "Field Research"
            ],
            points: 15,
            maxStudents: 25,
            description: "Engage in practical environmental science projects and research."
        }
    ];

    // Initialize the page
    function initializePage() {
        renderCertificates();
        renderABMIClasses();
        setupEventListeners();
    }

    // Render certificates grid
    function renderCertificates() {
        const grid = document.querySelector('.certificates-grid');
        if (!grid) return;

        grid.innerHTML = certificates.map(cert => `
            <div class="certificate-card" data-id="${cert.id}">
                <div class="certificate-provider">
                    <img src="${cert.providerLogo}" alt="${cert.provider}" class="provider-logo">
                    <span>${cert.provider}</span>
                </div>
                <div class="certificate-details">
                    <h3>${cert.title}</h3>
                    <div class="certificate-meta">
                        <span><i class="fas fa-clock"></i> ${cert.duration}</span>
                        <span><i class="fas fa-signal"></i> ${cert.difficulty}</span>
                        <span><i class="fas fa-tag"></i> ${cert.category}</span>
                    </div>
                    <p>${cert.description}</p>
                </div>
                <div class="certificate-actions">
                    <button class="learn-more-btn" onclick="window.open('${cert.link}', '_blank')">
                        Learn More
                    </button>
                    <button class="claim-points-btn" data-certificate-id="${cert.id}">
                        Claim ${cert.points} Points
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Render ABMI classes
    function renderABMIClasses() {
        const classesContainer = document.querySelector('.abmi-classes');
        if (!classesContainer) return;

        classesContainer.innerHTML = abmiClasses.map(cls => `
            <div class="class-card" data-id="${cls.id}">
                <div class="class-header">
                    <h3>${cls.title}</h3>
                    <span class="instructor"><i class="fas fa-user-tie"></i> ${cls.instructor}</span>
                </div>
                <div class="class-details">
                    <div class="schedule-info">
                        <p><i class="fas fa-calendar"></i> ${cls.schedule}</p>
                        <p><i class="fas fa-clock"></i> Duration: ${cls.duration}</p>
                        <p><i class="fas fa-users"></i> Max Students: ${cls.maxStudents}</p>
                    </div>
                    <div class="topics-list">
                        <h4>Topics Covered:</h4>
                        <ul>
                            ${cls.topics.map(topic => `<li>${topic}</li>`).join('')}
                        </ul>
                    </div>
                    <p class="description">${cls.description || ''}</p>
                </div>
                <div class="class-actions">
                    <button class="enroll-btn" data-class-id="${cls.id}">
                        Enroll Now (${cls.points} points)
                    </button>
                    <span class="start-date">Starts: ${cls.startDate}</span>
                </div>
            </div>
        `).join('');

        // Add enrollment event listeners
        document.querySelectorAll('.enroll-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const classId = this.dataset.classId;
                handleEnrollment(classId);
            });
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('certificateSearch');
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
        }

        // Category filter
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', handleFilters);
        }

        // Difficulty filter
        const difficultyFilter = document.getElementById('difficultyFilter');
        if (difficultyFilter) {
            difficultyFilter.addEventListener('change', handleFilters);
        }
    }

    // Handle enrollment
    function handleEnrollment(classId) {
        const classData = abmiClasses.find(c => c.id === parseInt(classId));
        if (!classData) return;

        // Show confirmation modal
        const modal = document.getElementById('enrollModal');
        if (modal) {
            modal.classList.add('show');
            modal.querySelector('.modal-body').innerHTML = `
                <h3>Confirm Enrollment</h3>
                <p>You are about to enroll in: <strong>${classData.title}</strong></p>
                <p>Schedule: ${classData.schedule}</p>
                <p>Start Date: ${classData.startDate}</p>
                <p>You will earn ${classData.points} points upon completion.</p>
            `;
        }
    }

    // Initialize the page
    initializePage();
}); 