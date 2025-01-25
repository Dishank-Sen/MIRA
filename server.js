const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { identifyAudio } = require('./services/acrCloudService'); // Import ACRCloud identification function
const app = express();
const port = 3000;
const { execFile } = require('child_process');
const cors = require('cors')


app.use(cors());
app.use(express.static('public'));
app.use(express.json()); // Middleware to parse JSON requests

// Serve the index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/send', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html/mood.html'));
});

app.post('/api/search', (req, res) => {

  try {
        const { song } = req.body;
        if (!song) {
          return res.status(400).json({ message: 'Song is required!' });
        }
        console.log(song);
        const pythonScriptPath = path.join(__dirname, 'server.py');
        execFile('python', [pythonScriptPath, song], (error, stdout, stderr) => {
          if (error) {
              console.error('Error executing Python script:', error);
              res.status(201).json({ message: `Your song is not: ${song}` });
          }
      
          if (stderr) {
              console.error('Python script error:', stderr);
              res.status(201).json({ message: `Your song is not : ${song}` });
          }
          console.log('Python script output:', stdout);
        res.status(201).json({ message: `${stdout}` });
    } 
)}catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/lyrics', (req, res) => {
    try {
        console.log(req.body);
        const { word1, word2, word3, songType, language } = req.body;
        if (!word1 || !word2 || !word3 || !songType) {
            return res.status(400).json({ message: 'All fields are mandatory!' });
        }
        console.log(word1, word2, word3, songType, language);
        const pythonScriptPath = path.join(__dirname, 'lyrics_generator.py');
        execFile('python', [pythonScriptPath, word1, word2, word3, songType, language], (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing Python script:', error);
                res.status(500).json({ message: 'Server error' });
            }

            if (stderr) {
                console.error('Python script error:', stderr);
                res.status(500).json({ message: 'Server error' });
            }

            console.log('Python script output:', stdout);
            res.status(201).json({ message: `${stdout}` });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/mood', cors() , (req,res) => {
    try {
        const { mood,singer, language } = req.body;
        if (!mood || !singer || !language) {
            return res.status(400).json({ message: 'All fields are mandatory!' });
        }
        console.log(mood,singer, language);
        const pythonScriptPath = path.join(__dirname, 'mood.py');
        execFile('python', [pythonScriptPath, mood,singer, language], (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing Python script:', error);
                res.status(500).json({ message: 'Server error' });
            }

            if (stderr) {
                console.error('Python script error:', stderr);
                res.status(500).json({ message: 'Server error' });
            }

            console.log('Python script output:', stdout);
            res.status(201).json({ message: `${stdout}` });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
