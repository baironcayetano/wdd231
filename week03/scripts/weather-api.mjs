
//OpenWeathermap API Key
const appId = '305467b89c15ab19a61b1e604a54f3af';

/** 
    Gets current weather information
    The @param loc is an object with a lat and lon properties.
**/
export async function apiFetch(loc){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&units=metric&appId=${appId}`;
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw Error(await response.text());
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}
