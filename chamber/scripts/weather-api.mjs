
//OpenWeathermap API Key
const appId = '305467b89c15ab19a61b1e604a54f3af';

/** 
    Gets current weather information
    The @param loc is an object with a lat and lon properties.
**/
export async function currentWeather(loc){
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

/**
 * Gets a 3 day temperature forecast 
 * The @param loc is an object with a lat and lon properties
**/
export async function threeDayForecast(loc){
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${loc.lat}&lon=${loc.lon}&units=metric&cnt=32&appid=${appId}`;
    try {
        const response = await fetch(url)
        if(!response.ok){
            throw Error(await response.text());
        }

        const data = await response.json();
        const date = new Date();
        const thirdDayDate = new Date(date);
        thirdDayDate.setDate(thirdDayDate.getDate() + 3);


        //This part will get today's date and  3 days after
        const today = date.toISOString().split('T')[0];
        const thirdDay = thirdDayDate.toISOString().split('T')[0];
        
        
        let threeDayForecast = data.list.filter((dayWeather) => {
           //this line will change the '2026-07-23 03:00' to '2026-07-23'
           let day = dayWeather.dt_txt.split(' ')[0];
           return day > today && day <= thirdDay;
        })
        return threeDayForecast;
    } catch (error) {
        console.log(error);
    }
}


export default class ThreeDayWeather{
    
    constructor(data){
        this._data = data;
        this._firstDay = this._setFirstDay(data);
        this._secondDay = this._setSecondDay(data);
        this._thirdDay = this._setThirdDay(data);
    }

    /** Private method to get the max temperature of a day*/
    _getMaxTemp(dataSet){
        return Math.max(...dataSet.map(item => item.main.temp))
    }
    
    /** Private method to get the min temperature of the day */
    _getMinTemp(dataSet){
        return Math.min(...dataSet.map(item => item.main.temp))
    }

    /** Private method to get day icon */
    _getDayIcon(dataSet){
        const lunchTime = dataSet.filter(item => item.dt_txt.includes("12:00:00"));
        return lunchTime[0].weather[0].icon
    }

    /** Private method to get the description of the weather */
    _getDayDescription(dataSet){
        const lunchTime = dataSet.filter(item => item.dt_txt.includes("12:00:00"));
        return lunchTime[0].weather[0].description
    }

    /**This private methods avoids repetitive code when trying to get 
     * the day information like max_temp, min_temp, icon, description...
     */
    _getBasicInfo(dayInfo){
        let max_temp = this._getMaxTemp(dayInfo);
        let min_temp = this._getMinTemp(dayInfo);
        let icon = this._getDayIcon(dayInfo);
        let description = this._getDayDescription(dayInfo);
        return {
            max_temp:max_temp,
            min_temp:min_temp,
            icon:icon,
            description:description,
        }
    }

    /**
     * Private method to set the first day in the firstDay class property
     * @param {*} data 
     * @returns 
     */
    _setFirstDay(data){
        let date = data[0].dt_txt.split(' ')[0];
        let daySet = data.filter((day)=>day.dt_txt.split(' ')[0] === date);
        const dayInfo = this._getBasicInfo(daySet);
        const day = {
            date: date,
            description:dayInfo.description,
            icon: dayInfo.icon,
            max_temp: dayInfo.max_temp,
            min_temp: dayInfo.min_temp,
        }
        return day;
    }

    /**
     * Private method to set the second day in the secondDay class property
     * @param {*} data 
     * @returns 
     */
    _setSecondDay(data){
        let i = 0;
        while(data[i].dt_txt.split(' ')[0] <= this._firstDay.date){
            i++
        }
        let date = data[i].dt_txt.split(' ')[0];
        let daySet = data.filter((day)=>day.dt_txt.split(' ')[0] === date);
        const dayInfo = this._getBasicInfo(daySet);
        const day = {
            date: date,
            description:dayInfo.description,
            icon: dayInfo.icon,
            max_temp: dayInfo.max_temp,
            min_temp: dayInfo.min_temp,
        }
        return day;
    }

    /**
     * Private method to set the third day in the thirdDay class property
     * @param {*} data 
     * @returns 
     */
    _setThirdDay(data){
         let i = 0;
        while(data[i].dt_txt.split(' ')[0] <= this._secondDay.date){
            i++
        }
        let date = data[i].dt_txt.split(' ')[0];
        let daySet = data.filter((day)=>day.dt_txt.split(' ')[0] === date);
        const dayInfo = this._getBasicInfo(daySet);
        const day = {
            date: date,
            description:dayInfo.description,
            icon: dayInfo.icon,
            max_temp: dayInfo.max_temp,
            min_temp: dayInfo.min_temp,
        }
        return day;
    }
    
    /** returns first day weather */
    getFirstDay(){
        return this._firstDay;
    }

    /** returns second day weather */
    getSecondDay(){
        return this._secondDay;
    }

    /** returns third day weather */
    getThirdDay(){
        return this._thirdDay;
    }
} 