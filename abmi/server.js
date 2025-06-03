const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('students.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        createTables();
    }
});

// Create necessary tables
function createTables() {
    db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        class INTEGER NOT NULL,
        division TEXT NOT NULL,
        parentName TEXT NOT NULL,
        place TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
}

// Configure multer for PDF upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API Endpoints

// Upload and process PDF
app.post('/api/upload-primary-data', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No PDF file uploaded' });
        }

        const dataBuffer = req.file.buffer;
        const data = await pdf(dataBuffer);
        
        // Process PDF text to extract student information
        const students = processPDFData(data.text);
        
        // Insert students into database
        for (const student of students) {
            db.run(
                'INSERT INTO students (name, class, division, parentName, place) VALUES (?, ?, ?, ?, ?)',
                [student.name, student.class, student.division, student.parentName, student.place]
            );
        }

        res.json({ message: 'PDF processed successfully', students });
    } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).json({ error: 'Error processing PDF' });
    }
});

// Add student manually
app.post('/api/add-student', (req, res) => {
    const { name, class: studentClass, division, parentName, place } = req.body;
    
    db.run(
        'INSERT INTO students (name, class, division, parentName, place) VALUES (?, ?, ?, ?, ?)',
        [name, studentClass, division, parentName, place],
        function(err) {
            if (err) {
                res.status(500).json({ error: 'Error adding student' });
            } else {
                res.json({ 
                    message: 'Student added successfully',
                    id: this.lastID
                });
            }
        }
    );
});

// Get all students
app.get('/api/get-students', (req, res) => {
    db.all('SELECT * FROM students ORDER BY name', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching students' });
        } else {
            res.json(rows);
        }
    });
});

// Delete student
app.delete('/api/delete-student/:id', (req, res) => {
    const { id } = req.params;
    
    db.run('DELETE FROM students WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(500).json({ error: 'Error deleting student' });
        } else {
            res.json({ message: 'Student deleted successfully' });
        }
    });
});

// Helper function to process PDF data
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

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 