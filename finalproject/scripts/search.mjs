import API from "./API.mjs";
import { renderMovie } from "./home.mjs";

const Params = new URLSearchParams(window.location.search),
      input = document.querySelector("#movieName"),
      MovieName = Params.get("movieName");

if(MovieName){
    input.ariaPlaceholder = MovieName;
    input.value = MovieName;
    ActivateSearch(MovieName);
}

async function ActivateSearch(movieName){
    renderScheleton(movieName);
    const movies = await API.findMovie(movieName);
    removeScheleton();
    renderResponse(movieName, movies);
}

function renderScheleton(movieName){
    const main = document.querySelector("main");
    const cards = document.createElement("div");
    
    cards.classList.add("cards");
    cards.innerHTML = `
        <h2>Searching - ${movieName}...</h2>
        <a href="#" class="card" aria-label="loading movie" title="loading">
                <figure class="loading">
                    <div class="img"></div>
                </figure>
                <p class="loading"></p>
                <p class="loading"></p>
                <p class="loading"></p>
        </a>
        <a href="#" class="card" aria-label="loading movie" title="loading">
                <figure class="loading">
                    <div class="img"></div>
                </figure>
                <p class="loading"></p>
                <p class="loading"></p>
                <p class="loading"></p>
        </a>
        <a href="#" class="card" aria-label="loading movie" title="loading">
                <figure class="loading">
                    <div class="img"></div>
                </figure>
                <p class="loading"></p>
                <p class="loading"></p>
                <p class="loading"></p>
        </a>
        <a href="#" class="card" aria-label="loading movie" title="loading">
                <figure class="loading">
                    <div class="img"></div>
                </figure>
                <p class="loading"></p>
                <p class="loading"></p>
                <p class="loading"></p>
        </a>
    `

    main.appendChild(cards)
}
function removeScheleton(){
   const cards = document.querySelector(".cards");
   cards.innerHTML = "";
}

function renderResponse(serachName,movies){
    const cards = document.querySelector(".cards");
    const h2 = document.createElement("h2");

    if(movies.length < 1){
        h2.textContent = `Movie ${serachName} not found`
        cards.appendChild(h2);
        return;
    }

    h2.textContent = `Results for - ${serachName}`;
    cards.appendChild(h2);

    for(const movie of movies){
        cards.appendChild(renderMovie(movie));
    }
}

