import API from "./API.mjs";

const Params = new URLSearchParams(window.location.search),
      movieId = Params.get("movie");

const main = document.querySelector("main");

const LStorage = JSON.parse(localStorage.getItem("movies")) || {};
var existInStorage = !!LStorage[movieId];

var firstBannerRender = true;
var firstDescriptionRender = true;

function renderError(errorName){
    const h1 = document.createElement("h1");
    h1.textContent = "Details";

    const pErrorText = document.createElement("p");
    pErrorText.classList.add("gigant");
    pErrorText.textContent = errorName;

    main.innerHTML = "";
    main.appendChild(h1);
    main.appendChild(pErrorText); 
}

async function renderDetails(){
    const movie = await API.getDatails(movieId);
    const description = document.querySelector(".description");

    if(!movie || movie.lenght < 1) return renderError("Sorry! I Couldn't get the description of this movie");

    renderBanner(movie);
    renderDescription(movie);
    console.log(movie);
}

function renderBanner(movie){
    const banner = document.querySelector(".banner");
    if(firstBannerRender) {
        banner.innerHTML = "";
        firstBannerRender = false;
    };

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const div = document.createElement("div");

    img.src = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
    img.srcset = `
    https://image.tmdb.org/t/p/w780${movie.backdrop_path} 780w,
    https://image.tmdb.org/t/p/w1280${movie.backdrop_path} 1280w,
    https://image.tmdb.org/t/p/original${movie.backdrop_path} 1920w`;
    img.sizes = "100vw";
    img.alt = `${movie.title}`;
    img.loading = "lazy";

    div.classList.add("overlay");
    h2.textContent = movie.title;

    div.title = `${movie.title}`;
    div.classList.add("banner-link");

    figure.appendChild(img);
    div.appendChild(h2);

    banner.textContent = "";
    banner.appendChild(figure);
    banner.appendChild(div);
}

function renderGenres(movie){
    const description = document.querySelector(".description");
    const tags = document.createElement("ul");
    tags.classList.add("tag");
    if(movie.genres === 1){
        const tag = document.createElement("li");
        tags.appendChild(tags);
    } else movie.genres.forEach((genre)=>{
        const tag = document.createElement("li")
        tag.textContent = genre.name;
        tags.appendChild(tag);
    })

    description.appendChild(tags);
}

function renderMovieProperties(movie){
    const description = document.querySelector(".description");
    const properties = document.createElement("ul");

    const productionCompanies = movie.production_companies.map(company => company.name).join(", ");
    properties.id = "properties";

    properties.innerHTML = `
        <li><strong>Status:</strong> ${movie.status}</li>
        <li><strong>Release date:</strong> ${movie.release_date}</li>
        <li><strong>Revenue:</strong> $${movie.revenue} USD</li>
        <li><strong>Production Comparnies: </strong> ${productionCompanies}</li>
    `;

    description.appendChild(properties);
}

function saveToLStorage(movie){
    LStorage[movieId] = movie.title;
    localStorage.setItem("movies", JSON.stringify(LStorage));
    existInStorage = true;
}

function removeFromLStorage(){
    delete LStorage[movieId];
    localStorage.setItem("movies", JSON.stringify(LStorage));
    existInStorage = false;
}

function toggleFavorite(movie){
    const button = document.getElementById("favorites");

    if(existInStorage){
        removeFromLStorage();
        button.textContent = "Add to favorites";
        button.classList.remove("remove");
    } else {
        saveToLStorage(movie);
        button.textContent = "Remove from favorites";
        button.classList.add("remove");
    }
}

function renderDescription(movie){
    const description = document.querySelector(".description");
    if(firstDescriptionRender){
        description.innerHTML = "";
        firstDescriptionRender = false;
    }

    const title = document.createElement("h2");
    title.textContent = movie.title;
    description.appendChild(title);

    const button = document.createElement("button");
    button.id = "favorites";
    button.textContent = existInStorage ? "Remove from favorites" : "Add to favorites";
    if(existInStorage) button.classList.add("remove");
    description.appendChild(button);

    const pOverview = document.createElement("p");
    pOverview.textContent = movie.overview;
    description.appendChild(pOverview);

    const pRate = document.createElement("p");
    pRate.classList.add("rating");
    pRate.textContent = `${Number(movie.vote_average).toFixed(1)} / 10`;
    description.appendChild(pRate);

    renderMovieProperties(movie);
    renderGenres(movie);

    document.getElementById("favorites").addEventListener("click", () => openModal(movie));
}

function openModal(movie){
    const modal = document.getElementById("modal");
    const action = document.querySelector("#action");
    const confirmButton = document.querySelector("#confirm-modal-button");
    const closeButton = document.querySelector("#close-modal-button");

    action.textContent = existInStorage ? "remove from favorites" : "add to favorites";
    modal.showModal();

    confirmButton.onclick = () => {
        toggleFavorite(movie);
        closeModal();
    };

    closeButton.onclick = () => closeModal();
}

function closeModal(){
    const modal = document.getElementById("modal");
    modal.close();
}

if(!movieId) renderError("Nothing to show here");
else renderDetails();