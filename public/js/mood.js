document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('moodForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const mood = document.getElementById('mood').value;
        const singer = document.getElementById('singer').value;
        const language = document.getElementById('language').value;
        const results = document.getElementById('results');

        console.log(mood)
        try {
            const response = await fetch('/api/mood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mood,singer, language })
            });

            console.log(response)

            if (response.ok) {
                const data = await response.json();
                let check = data.message.replace(/'result'/g, `"result"`);
                console.log(check);
                results.style.display = 'block';
                results.innerHTML = check;

            } else {
                result.innerHTML = `<p>Error: Unable to fetch data.</p>`;
                console.log("error is coming")
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            results.innerHTML = `<p>An error occurred while fetching results.</p>`;
        }
    }); 
});
