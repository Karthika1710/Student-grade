const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Configure static file serving (optional, adjust path as needed)
app.use(express.static('public'));

// MongoDB Connection with IPv4 address
mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
  .then(() => {
    console.log('MongoDB connected');

    // Define a schema and model for student data
    const Student = mongoose.model('Student', {
      name: String,
      marks: [Number]
    });

    // Endpoint to handle POST requests to save student data
    app.post('/api/students', async (req, res) => {
      try {
        const { name, marks } = req.body;

        console.log('Received student data:', name, marks); // Log received data

        // Create a new student document
        const student = new Student({
          name: name,
          marks: marks
        });

        // Save the student document to MongoDB
        const savedStudent = await student.save();

        console.log('Student saved successfully:', savedStudent); // Log saved data
        res.status(201).json(savedStudent);
      } catch (error) {
        console.error('Error saving student:', error);
        res.status(500).json({ error: 'Failed to save student' });
      }
    });

    // Route to handle GET requests to the root path (/)
    app.get('/', (req, res) => {
      res.send('Hello from the server!'); // You can customize this response
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
