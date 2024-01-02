function fetchMovieData() {
    const apiKey = 'f752cc23c578e8cece90cccbd106670a'; 
    const movieInput = document.getElementById('movieInput').value;
    const movieInfoContainer = document.getElementById('movieInfo');
    
    // Clear previous movie information
    movieInfoContainer.innerHTML = '';

    // Check if movie name is provided
    if (!movieInput) {
        alert('Please enter a movie name.');
        return;
    }

    // Fetch movie data from TMDb API
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieInput)}`)
        .then(response => response.json())
        .then(data => {
            // Check if any results are returned
            if (data.results.length === 0) {
                alert('No movie found with that name.');
                return;
            }

            const movie = data.results[0];
            const director = movie.director; 
            // Display movie information
            movieInfoContainer.innerHTML = `
                <h2>${movie.title}</h2>
                <p><strong>Director:</strong> ${director || 'Not available'}</p>
                <p><strong>Release Date:</strong> ${movie.release_date || 'Not available'}</p>
                <p><strong>Overview:</strong> ${movie.overview || 'Not available'}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
            alert('Error fetching movie data. Please try again.');
        });
}
