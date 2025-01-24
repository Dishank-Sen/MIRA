document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const audioPlayback = document.getElementById('audio-playback');

  let mediaRecorder;
  let audioChunks = [];

  // Start Recording
  startBtn.addEventListener('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });  // Change MIME type to audio/webm
        audioChunks = [];
        const audioUrl = URL.createObjectURL(audioBlob);
        audioPlayback.src = audioUrl;

        // Convert Blob to File object for Multer
        const audioFile = new File([audioBlob], 'audio.webm', { type: 'audio/webm' });

        const formData = new FormData();
        formData.append('audio', audioFile);  // Append the File object instead of Blob

        console.log('Sending audio:', formData);  // Log FormData content for debugging

        fetch('/upload-audio', {
          method: 'POST',
          body: formData,
        })
        .then((response) => {
          if (response.ok) {
            console.log('Audio uploaded successfully!');
          } else {
            console.error('Failed to upload audio.');
          }
        })
        .catch((error) => {
          console.error('Error uploading audio:', error);
        });
      };

      mediaRecorder.start();
      startBtn.disabled = true;
      stopBtn.disabled = false;
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  });

  // Stop Recording
  stopBtn.addEventListener('click', () => {
    mediaRecorder.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });
});
