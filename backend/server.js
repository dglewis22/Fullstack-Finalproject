const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5004;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'project_database',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Registration endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Query the database for the user
    db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (error) return res.status(500).send('Server error');

        // Check if user exists
        if (results.length === 0) {
            return res.status(401).send('Invalid username or password');
        }

        const user = results[0];

        if (user.password === password) {
            return res.status(200).send({ message: 'Login successful' });
        } else {
            return res.status(401).send('Invalid username or password');
        }
    });
});

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  
  // Simple input validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Save user to the database
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ message: 'Error registering user.' });
    }
    res.status(201).json({ message: 'User registered successfully!' });
  });
});

// New endpoint for getting all topics
app.get('/api/topics', (req, res) => {
  // Fetch all topics from the database
  db.query('SELECT * FROM topics', (err, results) => {
    if (err) {
      console.error('Error fetching topics:', err);
      return res.status(500).json({ message: 'Error fetching topics.' });
    }
    res.status(200).json(results); // Send topics as response
  });
});

// New endpoint for getting questions by topic
app.get('/api/questions/:topicId', (req, res) => {
  const topicId = req.params.topicId;

  // Fetch questions for a specific topic from the database
  db.query('SELECT * FROM questions WHERE topic_id = ?', [topicId], (err, results) => {
    if (err) {
      console.error('Error fetching questions:', err);
      return res.status(500).json({ message: 'Error fetching questions.' });
    }
    res.status(200).json(results); // Send questions and answers for the topic
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
