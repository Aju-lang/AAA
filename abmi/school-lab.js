document.addEventListener('DOMContentLoaded', function() {
    // Initialize staff directory
    initializeStaffDirectory();
    
    // Initialize competitions
    initializeCompetitions();
    
    // Initialize school programs
    initializeSchoolPrograms();

    function initializeStaffDirectory() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const staffGrid = document.querySelector('.staff-grid');

        // Sample staff data (replace with actual data)
        const staffData = {
            teaching: [
                { name: "Dr. Sarah Johnson", role: "Science Teacher", image: "path/to/image" },
                // Add more teaching staff...
            ],
            nonTeaching: [
                { name: "Mr. Robert Brown", role: "Administrative Officer", image: "path/to/image" },
                // Add more non-teaching staff...
            ]
        };

        function updateStaffGrid(filter) {
            const staff = filter === 'all' 
                ? [...staffData.teaching, ...staffData.nonTeaching]
                : staffData[filter];

            staffGrid.innerHTML = staff.map(member => `
                <div class="staff-card">
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                </div>
            `).join('');
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                updateStaffGrid(button.dataset.filter);
            });
        });

        // Initialize with all staff
        updateStaffGrid('all');
    }

    function initializeCompetitions() {
        // Add your competition initialization code here
        // This will populate the competition cards with winners and details
    }

    function initializeSchoolPrograms() {
        // Add your school programs initialization code here
        // This will populate special day programs and ABMI classes
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

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}); 