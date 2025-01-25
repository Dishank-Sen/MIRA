document.addEventListener('DOMContentLoaded', () => {
    const loading = document.getElementById('loding');
    document.getElementById('searchForm').addEventListener('submit', async (e) => {
        e.preventDefault()
        let song = document.getElementById('search-bar').value
        console.log(song)
        if (song) {
            // Redirect to the results page with the song name as a query parameter
            window.location.href = `../html/search-results.html?song=${encodeURIComponent(song)}`;
        }
    });

    document.getElementById('searchForm').addEventListener('submit', async (e) => {
        e.preventDefault()
        let song = document.getElementById('search-bar').value
        console.log(song)
        if (song) {
            // Redirect to the results page with the song name as a query parameter
            window.location.href = `../html/search-results.html?song=${encodeURIComponent(song)}`;
        }
    });

    document.getElementById('moodForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const mood = document.getElementById('mood').value;
        const singer = document.getElementById('singer').value;
        const language = document.getElementById('language').value;
        const results = document.getElementById('results');

        results.innerHTML = ''; // Clear previous results

        try {
            const response = await fetch('/api/mood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mood, singer, language })
            });

            if (response.ok) {
                const data = await response.json();
                const rawResult = data.message;
                // Display the results in a readable format
                results.style.display = 'block';

                // Parse and format the result
                const resultData = rawResult.match(/\*\*.*?\*\*/g); // Extract song titles
                const resultList = resultData.map((item) => item.replace(/\*\*/g, '')); // Remove asterisks

                const resultHTML = `<h3>Recommended Songs:</h3><ul>` +
                    resultList.map((song) => `<li>${song}</li>`).join('') +
                    `</ul>`;

                results.innerHTML = resultHTML;
            } else {
                results.innerHTML = `<p>Error: Unable to fetch data. Please try again later.</p>`;
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            results.innerHTML = `<p>An error occurred while fetching results. Please check your network and try again.</p>`;
        }
    });
});
