import API from "./API.mjs";

const banner = document.querySelector(".banner");
const trending = document.querySelector("#trending");
const genres = document.querySelector("#genres"); 

const movieGenres = await API.getGenres();

//This limit will prevent doing more request than what is needed
let movieGenresLimit = 10;
let loadedGenres = 0;
let firstTrendingRender = true;
let firstGenreRender = true;

//console.log(API.getRecommendedMovie(Movies.results));
var movies = {};
var trendingMovies = []; 

async function loadTrendingMovies(){
    const trending = await API.getTrendingMovies();
    trendingMovies = trending.slice(0,4);
    const recommended = API.getRecommendedMovie(trending);

    renderBanner(recommended);
    renderTrending(trendingMovies);
}

function renderBanner(movie){
    const p = document.createElement("p");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const a = document.createElement("a");

    img.src = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
    img.srcset = `
    https://image.tmdb.org/t/p/w780${movie.backdrop_path} 780w,
    https://image.tmdb.org/t/p/w1280${movie.backdrop_path} 1280w,
    https://image.tmdb.org/t/p/original${movie.backdrop_path} 1920w`;
    img.sizes = "100vw";
    img.alt = `${movie.title}`;
    img.loading = "lazy";

    a.classList.add("overlay");
    h2.textContent = movie.title;

    a.href = `./details.html?movie=${movie.id}`;
    a.ariaLabel = `See datails of ${movie.title}`;
    a.title = `See details of ${movie.title}`;

    p.classList.add("banner-link");
    p.textContent = "See details";

    figure.appendChild(img);
    a.appendChild(h2);
    a.appendChild(p);

    banner.textContent = "";
    banner.appendChild(figure);
    banner.appendChild(a);
}

function renderTrending(trendingMovies){
    if(firstTrendingRender){
        trending.innerHTML = "";
        firstTrendingRender = false;
    }

    for(const movie of trendingMovies){
        trending.appendChild(renderMovie(movie));
    }
}

async function loadMovies(){
    const genresToLoad = movieGenres.slice(loadedGenres,movieGenresLimit);
    for (const genre of genresToLoad) {
       movies[genre.name] = await API.getMoviesWithGn(genre.id);
       renderGenre(genre.name,movies[genre.name]);
    }
    loadedGenres += 10;
}

function renderGenre(genreName, movies){
    const h3 = document.createElement("h3");

    if(firstGenreRender) {
        genres.innerHTML = "";
        firstGenreRender = false;
    }

    h3.textContent = genreName;
    genres.appendChild(h3);

    movies.slice(0,4).forEach((movie,i) => {
        const movieElement = renderMovie(movie); 
        genres.appendChild(movieElement);
    });

}

export function renderMovie(movie){
    const a = document.createElement("a");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const pTitle = document.createElement("p");
    const pLanguage = document.createElement("p");
    const pRating = document.createElement("p");

    a.classList.add("card");
    a.href = `./details?movie=${movie.id}`;
    a.ariaLabel = `See datails of ${movie.title}`;
    a.title = `See datails of ${movie.title}`;

    img.src = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
    img.srcset = `
        https://image.tmdb.org/t/p/w92${movie.poster_path} 92w,
        https://image.tmdb.org/t/p/w154${movie.poster_path} 154w,
        https://image.tmdb.org/t/p/w185${movie.poster_path} 185w`;
    img.sizes = "(max-width: 767px) 33vw, 25vw";
    img.alt = `${movie.title}`;
    img.loading = "lazy";

    pTitle.textContent = movie.title;
    pTitle.classList.add("card-title");
    pLanguage.textContent = `Language: ${movie.original_language}`;
    pRating.textContent = `${Number(movie.vote_average).toFixed(1)} / 10`;
    pRating.classList.add("rating");

    figure.appendChild(img);

    a.appendChild(figure);
    a.appendChild(pTitle);
    a.appendChild(pLanguage);
    a.appendChild(pRating);

    return a;
}

loadTrendingMovies();
loadMovies();