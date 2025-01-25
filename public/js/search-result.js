document.addEventListener('DOMContentLoaded', async () => {
  // Extract the "song" parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const song = urlParams.get('song');
  console.log(song);

  if (song) {
      // Display the searched song name
      document.getElementById('search-query').textContent = song;

      // Send the song name to the backend
      try {
          const response = await fetch('../api/search', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ song }),
          });

          if (response.ok) {
              const data = await response.json();
              console.log(data);

              let songs = data.message.split('\r\n');

              // Filter out any empty strings
              songs = songs.filter((song) => song.trim() !== '');

              // Display the results on the page
              const searchContainer = document.getElementById('search-results');
              searchContainer.innerHTML = ''; // Clear previous results

              songs.forEach((song) => {
                  // Create a container for each song
                  const itemDiv = document.createElement('div');
                  itemDiv.classList.add('info-item');

                  // Add the song name
                  const songName = document.createElement('p');
                  songName.textContent = song;

                  // Add the YouTube link with an icon
                  const youtubeLink = document.createElement('a');
                  youtubeLink.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`;
                  youtubeLink.target = '_blank'; // Open link in a new tab
                  youtubeLink.rel = 'noopener noreferrer'; // Security best practices
                  youtubeLink.innerHTML = `<span style="margin-right: 5px;">🔗</span>Watch on YouTube`;

                  // Append the song name and link to the item container
                  itemDiv.appendChild(songName);
                  itemDiv.appendChild(youtubeLink);

                  // Add the item container to the main search container
                  searchContainer.appendChild(itemDiv);
              });
          }
      } catch (err) {
          console.error('Error fetching data:', err);
          document.getElementById('search-results').innerHTML += `<p>An error occurred while fetching results.</p>`;
      }
  } else {
      document.getElementById('search-results').innerHTML = `<p>No song provided</p>`;
  }
});
