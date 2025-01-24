const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { identifyAudio } = require('./services/acrCloudService'); // Import ACRCloud identification function
const app = express();
const port = 3000;

app.use(express.static('public'));

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Store uploaded files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Assign a unique filename for each uploaded file
  },
});

const upload = multer({ storage });

// Serve the index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle audio file upload and identification
app.post('/upload-audio', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    console.log('Uploaded file:', req.file);

    const audioPath = path.join(__dirname, req.file.path);
    const audioBuffer = fs.readFileSync(audioPath);

    // Directly send the audio to the ACRCloud API for identification
    const result = await identifyAudio(audioBuffer);

    if (!result || result.status.code !== 0) {
      return res.status(400).send('No audio identified or an error occurred.');
    }

    console.log('Identified result:', result);

    // Clean up: Remove the uploaded file after processing
    fs.promises.unlink(audioPath)
      .then(() => console.log('File deleted successfully'))
      .catch((err) => console.error('Error deleting file:', err));

    // Send the identification result as the response
    res.json(result);

  } catch (err) {
    console.error('Error identifying audio:', err);
    res.status(500).send('Error processing the audio file.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
