document.addEventListener('DOMContentLoaded', function() {
    // ABMI Classes Data
    const abmiClasses = [
        {
            id: 1,
            title: "Quantum Computing Fundamentals",
            mentor: "Abshir",
            schedule: "Monday & Wednesday, 4:00 PM - 5:30 PM",
            startDate: "2024-04-01",
            duration: "8 weeks",
            description: "Explore the fascinating world of quantum computing and its applications",
            topics: ["Quantum Bits", "Quantum Gates", "Quantum Algorithms"],
            maxStudents: 20,
            image: "path/to/quantum-computing.jpg"
        },
        {
            id: 2,
            title: "Artificial Intelligence Ethics",
            mentor: "Hashir",
            schedule: "Tuesday & Thursday, 3:00 PM - 4:30 PM",
            startDate: "2024-04-02",
            duration: "6 weeks",
            description: "Understanding ethical implications of AI development",
            topics: ["AI Bias", "Privacy Concerns", "Ethical Guidelines"],
            maxStudents: 25,
            image: "path/to/ai-ethics.jpg"
        },
        {
            id: 3,
            title: "Blockchain Development",
            mentor: "Mubashir",
            schedule: "Friday, 2:00 PM - 4:00 PM",
            startDate: "2024-04-05",
            duration: "10 weeks",
            description: "Learn to build decentralized applications",
            topics: ["Smart Contracts", "DApps", "Cryptocurrency"],
            maxStudents: 20,
            image: "path/to/blockchain.jpg"
        },
        {
            id: 4,
            title: "Space Science & Astronomy",
            mentor: "Bisher",
            schedule: "Saturday, 10:00 AM - 12:00 PM",
            startDate: "2024-04-06",
            duration: "12 weeks",
            description: "Discover the mysteries of the universe",
            topics: ["Planetary Science", "Astrophysics", "Space Exploration"],
            maxStudents: 30,
            image: "path/to/space-science.jpg"
        },
        {
            id: 5,
            title: "Renewable Energy Technologies",
            mentor: "Abshir",
            schedule: "Monday & Wednesday, 2:00 PM - 3:30 PM",
            startDate: "2024-04-08",
            duration: "8 weeks",
            description: "Explore sustainable energy solutions",
            topics: ["Solar Power", "Wind Energy", "Energy Storage"],
            maxStudents: 25,
            image: "path/to/renewable-energy.jpg"
        },
        {
            id: 6,
            title: "Cybersecurity Essentials",
            mentor: "Hashir",
            schedule: "Tuesday & Thursday, 5:00 PM - 6:30 PM",
            startDate: "2024-04-09",
            duration: "10 weeks",
            description: "Master the fundamentals of cybersecurity",
            topics: ["Network Security", "Cryptography", "Ethical Hacking"],
            maxStudents: 20,
            image: "path/to/cybersecurity.jpg"
        },
        {
            id: 7,
            title: "Biotechnology Innovation",
            mentor: "Mubashir",
            schedule: "Wednesday & Friday, 3:00 PM - 4:30 PM",
            startDate: "2024-04-10",
            duration: "12 weeks",
            description: "Explore cutting-edge biotechnology applications",
            topics: ["Genetic Engineering", "Bioprocessing", "Synthetic Biology"],
            maxStudents: 15,
            image: "path/to/biotech.jpg"
        },
        {
            id: 8,
            title: "Robotics Engineering",
            mentor: "Bisher",
            schedule: "Saturday, 2:00 PM - 4:00 PM",
            startDate: "2024-04-13",
            duration: "10 weeks",
            description: "Build and program advanced robots",
            topics: ["Robot Design", "Sensor Integration", "Control Systems"],
            maxStudents: 20,
            image: "path/to/robotics.jpg"
        },
        {
            id: 9,
            title: "Data Science & Analytics",
            mentor: "Abshir",
            schedule: "Monday & Wednesday, 6:00 PM - 7:30 PM",
            startDate: "2024-04-15",
            duration: "8 weeks",
            description: "Master data analysis and visualization",
            topics: ["Machine Learning", "Statistical Analysis", "Data Visualization"],
            maxStudents: 25,
            image: "path/to/data-science.jpg"
        },
        {
            id: 10,
            title: "Virtual Reality Development",
            mentor: "Hashir",
            schedule: "Friday, 4:00 PM - 6:00 PM",
            startDate: "2024-04-19",
            duration: "10 weeks",
            description: "Create immersive VR experiences",
            topics: ["3D Modeling", "VR Interaction", "Unity Development"],
            maxStudents: 20,
            image: "path/to/vr-dev.jpg"
        }
    ];

    // Communities Data
    const communities = [
        {
            id: 1,
            name: "Project X Innovation Hub",
            description: "A community of innovators working on cutting-edge technology projects",
            members: 150,
            contact: {
                email: "projectx@abmi.edu",
                phone: "+1234567890",
                telegram: "@projectxhub"
            },
            activities: ["Weekly Hackathons", "Innovation Workshops", "Tech Talks"]
        },
        {
            id: 2,
            name: "AI Research Group",
            description: "Collaborative research in artificial intelligence and machine learning",
            members: 120,
            contact: {
                email: "ai.research@abmi.edu",
                phone: "+1234567891",
                telegram: "@airesearchgroup"
            },
            activities: ["Research Projects", "Paper Discussions", "AI Model Development"]
        },
        {
            id: 3,
            name: "Space Exploration Society",
            description: "Community dedicated to astronomy and space science",
            members: 85,
            contact: {
                email: "space@abmi.edu",
                phone: "+1234567892",
                telegram: "@spacesociety"
            },
            activities: ["Stargazing Events", "Space Workshops", "Rocket Building"]
        },
        {
            id: 4,
            name: "Green Energy Initiative",
            description: "Working towards sustainable energy solutions",
            members: 95,
            contact: {
                email: "green@abmi.edu",
                phone: "+1234567893",
                telegram: "@greenenergy"
            },
            activities: ["Sustainability Projects", "Energy Audits", "Environmental Campaigns"]
        },
        {
            id: 5,
            name: "Robotics Club",
            description: "Building and programming robots for competitions",
            members: 110,
            contact: {
                email: "robotics@abmi.edu",
                phone: "+1234567894",
                telegram: "@roboticsclub"
            },
            activities: ["Robot Building", "Competition Prep", "Tech Workshops"]
        },
        {
            id: 6,
            name: "Cybersecurity Team",
            description: "Learning and practicing cybersecurity skills",
            members: 75,
            contact: {
                email: "cyber@abmi.edu",
                phone: "+1234567895",
                telegram: "@cyberteam"
            },
            activities: ["CTF Competitions", "Security Workshops", "Ethical Hacking"]
        },
        {
            id: 7,
            name: "Biotech Innovation Lab",
            description: "Exploring biotechnology and its applications",
            members: 65,
            contact: {
                email: "biotech@abmi.edu",
                phone: "+1234567896",
                telegram: "@biotechlab"
            },
            activities: ["Lab Projects", "Research Studies", "Biotech Seminars"]
        },
        {
            id: 8,
            name: "Data Science Hub",
            description: "Collaborative data analysis and visualization projects",
            members: 130,
            contact: {
                email: "datascience@abmi.edu",
                phone: "+1234567897",
                telegram: "@datahub"
            },
            activities: ["Data Projects", "Analytics Workshops", "Kaggle Competitions"]
        },
        {
            id: 9,
            name: "VR/AR Development Group",
            description: "Creating virtual and augmented reality experiences",
            members: 70,
            contact: {
                email: "vrar@abmi.edu",
                phone: "+1234567898",
                telegram: "@vrgroup"
            },
            activities: ["VR Development", "3D Modeling", "AR Applications"]
        },
        {
            id: 10,
            name: "Quantum Computing Circle",
            description: "Exploring quantum computing concepts and applications",
            members: 45,
            contact: {
                email: "quantum@abmi.edu",
                phone: "+1234567899",
                telegram: "@quantumcircle"
            },
            activities: ["Quantum Programming", "Theory Sessions", "Research Projects"]
        }
    ];

    // Mentor Profiles
    const mentors = [
        {
            name: "Abshir",
            expertise: ["Quantum Computing", "Data Science", "Renewable Energy"],
            image: "path/to/abshir.jpg"
        },
        {
            name: "Hashir",
            expertise: ["AI Ethics", "Cybersecurity", "VR Development"],
            image: "path/to/hashir.jpg"
        },
        {
            name: "Mubashir",
            expertise: ["Blockchain", "Biotechnology", "Programming"],
            image: "path/to/mubashir.jpg"
        },
        {
            name: "Bisher",
            expertise: ["Space Science", "Robotics", "Engineering"],
            image: "path/to/bisher.jpg"
        }
    ];

    // Render ABMI Classes
    function renderClasses() {
        const classesGrid = document.querySelector('.classes-grid');
        if (!classesGrid) return;

        classesGrid.innerHTML = abmiClasses.map(cls => `
            <div class="class-card">
                <div class="class-image">
                    <img src="${cls.image}" alt="${cls.title}">
                    <div class="mentor-badge">
                        <i class="fas fa-user-tie"></i> ${cls.mentor}
                    </div>
                </div>
                <div class="class-content">
                    <h3>${cls.title}</h3>
                    <p class="class-description">${cls.description}</p>
                    <div class="class-details">
                        <span><i class="fas fa-calendar"></i> ${cls.schedule}</span>
                        <span><i class="fas fa-clock"></i> ${cls.duration}</span>
                        <span><i class="fas fa-users"></i> Max ${cls.maxStudents} students</span>
                    </div>
                    <div class="topics-list">
                        ${cls.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render Communities
    function renderCommunities() {
        const communitiesGrid = document.querySelector('.communities-grid');
        if (!communitiesGrid) return;

        communitiesGrid.innerHTML = communities.map(community => `
            <div class="community-card">
                <h3>${community.name}</h3>
                <p class="community-description">${community.description}</p>
                <div class="community-stats">
                    <span><i class="fas fa-users"></i> ${community.members} members</span>
                </div>
                <div class="community-activities">
                    <h4>Activities:</h4>
                    <ul>
                        ${community.activities.map(activity => `<li>${activity}</li>`).join('')}
                    </ul>
                </div>
                <div class="community-contact">
                    <h4>Contact:</h4>
                    <p><i class="fas fa-envelope"></i> ${community.contact.email}</p>
                    <p><i class="fas fa-phone"></i> ${community.contact.phone}</p>
                    <p><i class="fab fa-telegram"></i> ${community.contact.telegram}</p>
                </div>
            </div>
        `).join('');
    }

    // Render Mentors
    function renderMentors() {
        const mentorsGrid = document.querySelector('.mentors-grid');
        if (!mentorsGrid) return;

        mentorsGrid.innerHTML = mentors.map(mentor => `
            <div class="mentor-card">
                <div class="mentor-header">
                    <img src="${mentor.image}" alt="${mentor.name}" class="mentor-avatar">
                    <h3>${mentor.name}</h3>
                </div>
                <div class="mentor-expertise">
                    ${mentor.expertise.map(exp => `<span class="expertise-tag">${exp}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // Setup event listeners for search and view toggle
    function setupEventListeners() {
        const searchInput = document.getElementById('mentorSearch');
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
        }

        // View toggle buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                toggleView(btn.dataset.view);
            });
        });
    }

    // Handle search functionality
    function handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        filterContent(searchTerm);
    }

    // Filter content based on search
    function filterContent(searchTerm) {
        const classCards = document.querySelectorAll('.class-card');
        const mentorCards = document.querySelectorAll('.mentor-card');
        const communityCards = document.querySelectorAll('.community-card');

        filterCards(classCards, searchTerm);
        filterCards(mentorCards, searchTerm);
        filterCards(communityCards, searchTerm);
    }

    // Helper function to filter cards
    function filterCards(cards, searchTerm) {
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    }

    // Toggle view between grid and list
    function toggleView(view) {
        const container = document.querySelector('.classes-grid');
        if (container) {
            container.className = view === 'grid' ? 'classes-grid' : 'classes-list';
        }
    }

    // Initialize everything
    function initialize() {
        renderClasses();
        renderMentors();
        renderCommunities();
        setupEventListeners();
    }

    // Start the app
    initialize();
}); 