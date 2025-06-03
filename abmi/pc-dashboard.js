document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!localStorage.getItem('pcLoggedIn')) {
        window.location.href = 'pc-login.html';
        return;
    }

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('pcLoggedIn');
        window.location.href = 'pc-login.html';
    });

    // Menu item click handlers
    document.getElementById('primaryData').addEventListener('click', function() {
        // Redirect to primary data page
        window.location.href = 'pc-primary-data.html';
    });

    document.getElementById('insertDatabase').addEventListener('click', function() {
        // Redirect to insert database page
        window.location.href = 'pc-insert-database.html';
    });

    document.getElementById('editWeb').addEventListener('click', function() {
        // Redirect to edit web page
        window.location.href = 'pc-edit-web.html';
    });

    document.getElementById('redeemCode').addEventListener('click', function() {
        // Redirect to redeem code page
        window.location.href = 'pc-redeem-code.html';
    });

    document.getElementById('pcSettings').addEventListener('click', function() {
        // Redirect to settings page
        window.location.href = 'pc-settings.html';
    });
});

// Primary Data Modal Functionality
const primaryDataModal = document.getElementById('primaryDataModal');
const primaryDataBtn = document.getElementById('primaryData');
const closeBtn = document.querySelector('.close');
const pdfUpload = document.getElementById('pdfUpload');
const uploadBtn = document.getElementById('uploadBtn');
const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');

// Initialize students array in localStorage if it doesn't exist
if (!localStorage.getItem('students')) {
    localStorage.setItem('students', JSON.stringify([]));
}

// Open modal when clicking Primary Data menu item
primaryDataBtn.addEventListener('click', () => {
    primaryDataModal.style.display = 'block';
    loadStudentList();
});

// Close modal
closeBtn.addEventListener('click', () => {
    primaryDataModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === primaryDataModal) {
        primaryDataModal.style.display = 'none';
    }
});

// Handle PDF upload
uploadBtn.addEventListener('click', () => {
    const file = pdfUpload.files[0];
    if (!file) {
        alert('Please select a PDF file');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const students = processPDFData(text);
        saveStudents(students);
        loadStudentList();
        alert('PDF processed successfully!');
    };
    reader.readAsText(file);
});

// Handle manual student entry
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const studentData = {
        id: Date.now(), // Generate unique ID
        name: document.getElementById('studentName').value,
        class: document.getElementById('studentClass').value,
        division: document.getElementById('studentDivision').value,
        parentName: document.getElementById('parentName').value,
        place: document.getElementById('place').value
    };

    const students = JSON.parse(localStorage.getItem('students'));
    students.push(studentData);
    localStorage.setItem('students', JSON.stringify(students));

    alert('Student added successfully!');
    studentForm.reset();
    loadStudentList();
});

// Load and display student list
function loadStudentList() {
    const students = JSON.parse(localStorage.getItem('students'));
    displayStudentList(students);
}

// Display student list in the UI
function displayStudentList(students) {
    studentList.innerHTML = '';
    
    students.forEach(student => {
        const studentItem = document.createElement('div');
        studentItem.className = 'student-item';
        
        studentItem.innerHTML = `
            <div class="student-info">
                <strong>${student.name}</strong> - Class ${student.class} ${student.division}
                <br>
                Parent: ${student.parentName} | Place: ${student.place}
            </div>
            <div class="student-actions">
                <button class="delete-btn" data-id="${student.id}">Delete</button>
            </div>
        `;
        
        studentList.appendChild(studentItem);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const studentId = parseInt(e.target.dataset.id);
            if (confirm('Are you sure you want to delete this student?')) {
                deleteStudent(studentId);
            }
        });
    });
}

// Delete student
function deleteStudent(id) {
    let students = JSON.parse(localStorage.getItem('students'));
    students = students.filter(student => student.id !== id);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudentList();
}

// Save students to localStorage
function saveStudents(newStudents) {
    const existingStudents = JSON.parse(localStorage.getItem('students'));
    const updatedStudents = [...existingStudents, ...newStudents];
    localStorage.setItem('students', JSON.stringify(updatedStudents));
}

// Process PDF data
function processPDFData(text) {
    const students = [];
    const lines = text.split('\n');
    
    for (const line of lines) {
        // Skip empty lines and headers
        if (!line.trim() || line.includes('No:') || line.includes('Name')) continue;
        
        // Parse student data from line
        const parts = line.split(/\s+/).filter(part => part.trim());
        if (parts.length >= 5) {
            students.push({
                id: Date.now() + Math.random(), // Generate unique ID
                name: parts[1],
                class: parseInt(parts[2]),
                division: parts[3] || '',
                parentName: parts[4],
                place: parts[5] || ''
            });
        }
    }
    
    return students;
}

// Menu item click handlers
document.getElementById('insertDatabase').addEventListener('click', function() {
    window.location.href = 'pc-insert-database.html';
});

document.getElementById('editWeb').addEventListener('click', function() {
    window.location.href = 'pc-edit-web.html';
});

document.getElementById('redeemCode').addEventListener('click', function() {
    window.location.href = 'pc-redeem-code.html';
});

document.getElementById('pcSettings').addEventListener('click', function() {
    window.location.href = 'pc-settings.html';
}); 