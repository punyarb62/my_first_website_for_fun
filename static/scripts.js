let currentVisibleMovieId = null;

function toggleSection() {
    const section = document.getElementById('top-hit-movies-section');
    const isVisible = section.style.display !== 'none';
    section.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
        loadTopHitMovies();
    }
}

function searchMovies() {
    const query = document.getElementById('search-query').value.trim();
    if (query === '') {
        document.getElementById('search-movie-info').innerHTML = '<p>Please enter a search query.</p>';
        return;
    }
    fetch(`/search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            let html = '<h3>Search Results:</h3>';
            if (movies.length === 0) {
                html += '<p>No movies found.</p>';
            } else {
                movies.forEach(movie => {
                    html += `
                        <div class="movie-card" id="movie-card-${movie.id}">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="movie-poster">
                            <div class="movie-details">
                                <h3>${movie.title}</h3>
                                <button onclick="getMovieDetails(${movie.id})">More Info</button>
                            </div>
                            <div class="movie-card-detail" id="movie-detail-${movie.id}" style="display: none;">
                                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="movie-poster-detail">
                                <div class="movie-details-detail">
                                    <h2>${movie.title}</h2>
                                    <p><strong>Overview:</strong> ${movie.overview}</p>
                                    <p><strong>Release Date:</strong> ${movie.release_date}</p>
                                    <p><strong>Rating:</strong> ${movie.vote_average}</p>
                                </div>
                            </div>
                        </div>`;
                });
            }
            document.getElementById('search-movie-info').innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
            document.getElementById('search-movie-info').innerHTML = '<p>Error retrieving search results.</p>';
        });
}

function getMovieDetails(movieId) {
    // Hide previously visible movie details
    if (currentVisibleMovieId && currentVisibleMovieId !== movieId) {
        const previousMovieDetail = document.getElementById(`movie-detail-${currentVisibleMovieId}`);
        if (previousMovieDetail) {
            previousMovieDetail.style.display = 'none';
        }
    }
    
    const movieDetailElement = document.getElementById(`movie-detail-${movieId}`);
    if (movieDetailElement) {
        // Toggle the visibility of the selected movie's details
        const isVisible = movieDetailElement.style.display === 'block';
        movieDetailElement.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
            currentVisibleMovieId = movieId;
        } else {
            currentVisibleMovieId = null;
        }
    }
}

function loadTopHitMovies() {
    fetch('/hit-movies')
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            let html = '<h3>Top 10 Hit Movies:</h3>';
            if (movies.length === 0) {
                html += '<p>No top movies found.</p>';
            } else {
                movies.forEach(movie => {
                    html += `
                        <div class="movie-card" id="movie-card-${movie.id}">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="movie-poster">
                            <div class="movie-details">
                                <h3>${movie.title}</h3>
                                <button onclick="getMovieDetails(${movie.id})">More Info</button>
                            </div>
                            <div class="movie-card-detail" id="movie-detail-${movie.id}" style="display: none;">
                                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="movie-poster-detail">
                                <div class="movie-details-detail">
                                    <h2>${movie.title}</h2>
                                    <p><strong>Overview:</strong> ${movie.overview}</p>
                                    <p><strong>Release Date:</strong> ${movie.release_date}</p>
                                    <p><strong>Rating:</strong> ${movie.vote_average}</p>
                                </div>
                            </div>
                        </div>`;
                });
            }
            document.getElementById('top-hit-movie-info').innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching top hit movies:', error);
        });
}
