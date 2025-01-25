const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const dotenv = require('dotenv');
const FormData = require('form-data');

dotenv.config();

const accessKey = process.env.ARC_ACCESS_KEY;
const accessSecret = process.env.ARC_SECRET_KEY;
const host = process.env.ARC_HOST;
const apiUrl = `https://${host}/v1/identify`;

async function recognizeAudio(filePath) {
  try {
    // Debug: Check credentials
    console.log('Access Key:', accessKey);
    console.log('Access Secret:', accessSecret);
    console.log('Host:', host);

    // Load audio data
    const audioBuffer = fs.readFileSync(filePath);
    const sampleBytes = audioBuffer.length;

    // Debug: Check audio data
    console.log('Sample Bytes:', sampleBytes);

    // Generate the timestamp
    const timestamp = Math.floor(Date.now() / 1000).toString();

    // Debug: Check timestamp
    console.log('Timestamp:', timestamp);

    // Create the string to sign
    const stringToSign = `POST\n/v1/identify\naccess_key=${accessKey}&sample_bytes=${sampleBytes}&timestamp=${timestamp}`;

    // Debug: Check string to sign
    console.log('String to Sign:', stringToSign);

    // Generate the signature
    const signature = crypto.createHmac('sha1', accessSecret).update(stringToSign).digest('base64');

    // Debug: Check signature
    console.log('Signature:', signature);

    // Prepare the multipart/form-data payload
    const formData = new FormData();
    formData.append('access_key', accessKey);
    formData.append('sample_bytes', sampleBytes);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('sample', audioBuffer, { filename: 'audio.mp3' });

    // Make the POST request to AcrCloud
    const response = await axios.post(apiUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    // Print the recognition result
    console.log('Recognition result:', response.data);
  } catch (error) {
    console.error('Error during recognition:', error.response ? error.response.data : error.message);
  }
}

// Path to your audio file (e.g., 'audio.mp3')
recognizeAudio('./uploads/perfect.mp3');
