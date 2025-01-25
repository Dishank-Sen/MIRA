document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchForm').addEventListener('submit', async (e) => {
        e.preventDefault()
        let song = document.getElementById('search-bar').value
        console.log(song)
        if (song) {
            // Redirect to the results page with the song name as a query parameter
            window.location.href = `../html/search-results.html?song=${encodeURIComponent(song)}`;
        }
        // try{
        //     const response = await fetch('./api/search', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ song })
        //     });

        //     if (response.ok) {
        //         const data = await response.json();
        //         console.log(data);
        //     } else {
        //         const errorData = await response.json();
        //         alert(`Error: ${errorData.message}`); // Display error message
        //     }
        // }catch(err){
        //     console.log(err)
        // }
    });
});
