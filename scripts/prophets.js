const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

//Fetch API
async function getPropehtData(){
    let response = await fetch(url);
    let data  =  await response.json();
    console.table(data)
    return data;
}

getPropehtData();
