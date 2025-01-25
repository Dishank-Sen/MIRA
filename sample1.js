const url = './uploads/perfect.mp3';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '4616490562msh01e4ff187f9687cp14d032jsn274b069e490c',
		'x-rapidapi-host': 'shazam-song-recognition-api.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}