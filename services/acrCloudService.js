const ACRCloud = require('acrcloud');
const dotenv = require('dotenv');

dotenv.config();

const host = process.env.ACR_HOST;
const access_key = process.env.ACR_ACCESS_KEY;
const access_secret = process.env.ACR_SECRET_KEY;

const acr = new ACRCloud({
  host,
  access_key,
  access_secret,
});

async function identifyAudio(audioBuffer) {
  try {
    const result = await acr.identify(audioBuffer);

    // If the result is a string, parse it as JSON
    const parsedResult = typeof result === 'string' ? JSON.parse(result) : result;

    // Return the parsed result
    return parsedResult;
  } catch (err) {
    console.error('Error identifying audio:', err);
    throw err;
  }
}

module.exports = { identifyAudio };
