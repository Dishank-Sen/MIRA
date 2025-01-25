    const query = "thunder"

    // Replace with your API call (e.g., Spotify, YouTube, etc.)
    const API_KEY = 'YOUR_YOUTUBE_API_KEY';
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${API_KEY}`);
    const data = await response.json();

    if (data.items.length > 0) {
        resultsContainer.innerHTML = ''; // Clear the loading text
        data.items.forEach(item => {
            const videoId = item.id.videoId;
            const title = item.snippet.title;

            // Create song card
            const songCard = document.createElement('div');
            songCard.classList.add('song-card');

            songCard.innerHTML = `
                <h3>${title}</h3>
                <button onclick="playSong('${videoId}')">Play</button>
            `;

            resultsContainer.appendChild(songCard);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
});

// Function to play a song in a new tab
function playSong(videoId) {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(url, '_blank');
}
