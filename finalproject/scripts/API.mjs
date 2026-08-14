import  TMDB  from "../data/tmdb.mjs";

class API {
    static fetchConfig = {
            headers:{
                "Authorization":`Bearer ${TMDB.Key}`,
                "accept":"application/json",
            }
        }
    
    static getRecommendedMovie(movieList){
        if(!movieList) return
        if(movieList.length === 1) return movieList[0];

        const randomIndex = Math.floor(Math.random() * movieList.length);
        return movieList[randomIndex];
    }

    static async getGenres(){
        try {
            let response =  await fetch(TMDB.URL.genres, this.fetchConfig);
            
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            
            let data = await response.json();

            if(!data.genres) console.error("The response has no results",data)
            return data.genres;

        } catch (error) {
            if(error.name === "AbortError") console.error("The response took too long and was cancelled");
            else console.error("Error trying to get the available movie genders", error.message);
            return [];
        }
    }

    static async getMoviesWithGn(genderId){
        try {
            let response =  await fetch(`${TMDB.URL.movieListByGn}?with_genres=${genderId}`, this.fetchConfig);
            
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            
            let data = await response.json();

            if(!data.results) console.error("The response has no results",data)
            return data.results;

        } catch (error) {
            if(error.name === "AbortError") console.error("The response took too long and was cancelled");
            else console.error("Error trying to get the available movies by genders", error.message);
            return [];
        }
    }

    static async getTrendingMovies(){
        try {
            let response =  await fetch(TMDB.URL.trendingMovies, this.fetchConfig);
            
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            
            let data = await response.json();

            if(!data.results) console.error("The response has no results",data)
            return data.results;

        } catch (error) {
            if(error.name === "AbortError") console.error("The response took too long and was cancelled");
            else console.error("Error trying to get the trending movies", error.message);
            return [];
        }
    }

    static async findMovie(movieName){
        try {
            let response =  await fetch(`${TMDB.URL.find}&query=${movieName}`, this.fetchConfig);
            
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            
            let data = await response.json();

            if(!data.results) console.error("The response has no results",data)
            return data.results;

        } catch (error) {
            if(error.name === "AbortError") console.error("The response took too long and was cancelled");
            else console.error("Error trying to find the movie", error.message);
            return [];
        }
    }

    static async getDatails(movieId){
          try {
            let response =  await fetch(`${TMDB.URL.details}${movieId}`, this.fetchConfig);
            
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            
            let data = await response.json();

            if(!data) console.error("The response has no content",data)
            return data;

        } catch (error) {
            if(error.name === "AbortError") console.error("The response took too long and was cancelled");
            else console.error("Error trying to find the movie", error.message);
            return [];
        }
    }
}


export default API;