// so this function will get me the name of the city
const data = document.querySelector('input');
let city_name = '';
let city_temp = 0;


async function logdata(){
    const weather = await fetchtemp(city_name);
    console.log(`tempreture of ${weather.city} : ${weather.temp}`);
    city_temp = weather.temp;

//and the last part is to display the city name and the tempreature
let element = document.createElement("h2");
element.innerHTML = `Temperature of ${city_name} : ${city_temp}`;
element.setAttribute("class", "temp"); // Add the class "temp" to the new element
document.querySelector(".temp").replaceWith(element);
}

// creating another evvent listnerr for button also 
const find = function(){
    //so what i want that when i click on this button it will take the data from the input
    city_name = data.value;
    data.value = 'enter the city name';
    console.log(city_name);
    logdata();
}

//now the another task is to find the city tempreture
const API_KEY = '1771d473aebdc9b52fe77d3e061838a5';

async function fetchtemp(city) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        if(!response.ok){
            alert("No city found with this name");
            return null;
        }
        const data = await response.json();
        return{
            city: data.name,
            temp : data.main.temp
        }
    }catch(err){
        alert("some error encounter ");
        return null;
    }
}

// console.log();
