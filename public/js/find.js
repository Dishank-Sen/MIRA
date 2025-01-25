document.addEventListener('DOMContentLoaded', () => {
    const shazamButton = document.getElementById('shazamButton');
    const gifContainer = document.getElementById('gifContainer');
    const trackInfo = document.getElementById('trackInfo');
    const trackTitle = document.getElementById('trackTitle');
    const trackArtist = document.getElementById('trackArtist');
    const trackTime = document.getElementById('trackTime');

    let mediaRecorder;
    let audioChunks = [];
    let isRecording = false;

    document.getElementById('searchForm').addEventListener('submit', async (e) => {
        e.preventDefault()
        let song = document.getElementById('search-bar').value
        console.log(song)
        if (song) {
            // Redirect to the results page with the song name as a query parameter
            window.location.href = `../html/search-results.html?song=${encodeURIComponent(song)}`;
        }
    });

    const toggleListening = async () => {
        if (isRecording) {
            // Stop recording
            mediaRecorder.stop();
            shazamButton.textContent = "Start Listening";
            isRecording = false;
            gifContainer.style.display = 'none';
        } else {
            // Start recording
            audioChunks = [];
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = (event) => {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = async () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    const formData = new FormData();
                    formData.append('audio', audioBlob);

                    trackTime.textContent = "Processing...";
                    // Send audio to the backend
                    const response = await fetch('./api/process-audio', {
                        method: 'POST',
                        body: formData,
                    });

                    const data = await response.json();
                    if (data.message) {
                        trackTitle.textContent = "Generated Theory";
                        trackArtist.textContent = data.message;
                        trackInfo.style.display = 'block';
                    } else {
                        trackTime.textContent = "Error processing audio.";
                    }
                };

                mediaRecorder.start();
                shazamButton.textContent = "Stop Listening";
                isRecording = true;
                gifContainer.style.display = 'block';
            } catch (err) {
                console.error("Error accessing microphone:", err);
                alert("Please allow microphone access.");
            }
        }
    };

    shazamButton.addEventListener('click', toggleListening);
});
