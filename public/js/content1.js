const KEY = 'wqr_IIzTNV-VdLx3ndR7GA'
const API_URL = 'https://public-api.beatoven.ai/';


async function generateSong() {
    const lyrics = `I found a love for me
Oh, darling, just dive right in and follow my lead
Well, I found a girl, beautiful and sweet
Oh, I never knew you were the someone waitin' for me
'Cause we were just kids when we fell in love, not knowin' what it was
I will not give you up this time
Oh, darling, just kiss me slow, your heart is all I own
And in your eyes, you're holding mine
Baby, I'm dancin' in the dark with you between my arms
Barefoot on the grass while listenin' to our favourite song
When you said you looked a mess, I whispered underneath my breath
But you heard it, "Darling, you look perfect tonight"
Well, I found a woman, stronger than anyone I know
She shares my dreams, I hope that someday, I'll share her home
I found a love to carry more than just my secrets
To carry love, to carry children of our own`;

    if (!lyrics.trim()) {
        console.error('No lyrics provided');
        return;
    }

    const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
    };

    const payload = {
        "prompt": {
           "text": "30 seconds peaceful lo-fi chill hop track"
        }
     };

    const data = {
        inputs: lyrics
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        console.log(response);

        if (!response.ok) {
            throw new Error('Error generating the song');
        }

        const responseData = await response.json();
        const audioUrl = responseData.audio_url;  // Retrieve the audio file URL

        const audioResponse = await fetch(audioUrl);
        const audioBlob = await audioResponse.blob();

        // Convert the blob to a URL for the audio player
        const audioUrlBlob = URL.createObjectURL(audioBlob);
        console.log(audioUrlBlob);
    } catch (error) {
        console.error('Error generating song:', error);
    }
}

generateSong();