document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for the form submission
    const loadingIcon = document.getElementById('loading');
    loadingIcon.style.display = 'none';
        document.getElementById('searchForm').addEventListener('submit', async (e) => {
            e.preventDefault()
            let song = document.getElementById('search-bar').value
            console.log(song)
            if (song) {
                // Redirect to the results page with the song name as a query parameter
                window.location.href = `../html/search-results.html?song=${encodeURIComponent(song)}`;
            }
        });

        document.getElementById('info').addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log(loadingIcon)
        loadingIcon.style.display = 'block';
        console.log("Loading done")
        // Get form elements and result container
        const result = document.getElementById('result');
        const form = document.getElementById('info');
        const submitButton = document.getElementById('submit');
        

        const word1 = document.getElementById("word1").value;
        const word2 = document.getElementById("word2").value;
        const word3 = document.getElementById("word3").value;
        const songType = document.getElementById("songType").value;
        const language = document.getElementById("language").value;

        // Disable form and show loading icon
        form.classList.add('disabled');

        try {
            const response = await fetch('../api/lyrics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word1, word2, word3, songType, language })
            });

            if (response.ok) {
                const data = await response.json();
                loadingIcon.style.display = 'none';
                // console.log(data.message);
                let check = data.message.replace(/'result'/g, `"result"`);
                // console.log(check);
                const song = JSON.parse(check);
                result.innerHTML = song.result; 

            } else {
                result.innerHTML = `<p>Error: Unable to fetch data.</p>`;
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            result.innerHTML = `<p>An error occurred while fetching results.</p>`;
        } finally {
            // Re-enable form and hide loading icon
            form.classList.remove('disabled');
            loadingIcon.style.display = 'none';
        }
    });
});
