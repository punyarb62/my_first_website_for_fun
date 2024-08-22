from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Replace 'your_api_key' with your actual TMDB API key
API_KEY = 'TMDB_API_KEY'
BASE_URL = 'https://api.themoviedb.org/3/'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/hit-movies')
def hit_movies():
    url = f'{BASE_URL}movie/popular?api_key={API_KEY}&language=en-US&page=1'
    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'results': []})

@app.route('/search')
def search():
    query = request.args.get('query')
    if not query:
        return jsonify({'results': []})
    
    url = f'{BASE_URL}search/movie?api_key={API_KEY}&language=en-US&query={query}&page=1'
    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'results': []})

@app.route('/movie/<int:movie_id>')
def movie_details(movie_id):
    url = f'{BASE_URL}movie/{movie_id}?api_key={API_KEY}&language=en-US'
    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({})

if __name__ == '__main__':
    app.run(debug=True)
