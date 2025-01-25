document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchForm').addEventListener('submit', async (e) => {
        e.preventDefault()
        let song = document.getElementById('search-bar').value
        console.log(song)
        if (song) {
            // Redirect to the results page with the song name as a query parameter
            window.location.href = `../html/search-results.html?song=${encodeURIComponent(song)}`;
        }
    });
});
