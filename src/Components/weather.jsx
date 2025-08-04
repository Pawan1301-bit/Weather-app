import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { CiSun } from "react-icons/ci";
import { FaCloudSun } from "react-icons/fa";

const weatherIcons = {
    "clear sky": "☀️",
    "few clouds": "🌤",
    "scattered clouds": "⛅",
    "broken clouds": "🌥",
    "overcast clouds": "☁️",
    "light rain": "🌦",
    "moderate rain": "🌧",
    "heavy intensity rain": "⛈",
    "thunderstorm": "⛈",
    "snow": "❄️",
    "mist": "🌫",
    "fog": "🌁"
  };
  

const weather = () => {
    const [city, setCity] = useState("");
    const [weather, setweather] = useState(null);
    const [error, seterror] = useState(null);

  
    function handlechange(e){
        setCity(e.target.value);
    }
    
    const API_KEY = import.meta.env.VITE_KEY;
    
    async function fetchapi(){
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        if(!city)   return


        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if(data.cod !== 200){   //checking if the  city exist if we do not check the api will return error and our page gets crashed
                seterror("city not found");
                setweather(null);
                return;
            }
            setweather(data);
            seterror(null);
        } catch (error) {
            seterror('no city found');
            setweather(null);
        }
    }
    
    const weatherDescription = weather?.weather?.[0]?.description || "";
    const icon = weatherIcons[weatherDescription] || "❓";
    
    return (
    <div className=' text-white m-auto text-center'>
      <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl m-auto mt-2 p-2 text-center'> Pick the location</h2>
      <p className='text-sm sm:text-base md:text-lg lg:text-xl text-center'>Find the location or city you want to know the weather details  </p>

      <div className="inputbox">
        <input onChange={handlechange} value={city} type="text" placeholder='enter the location' className='text-white rounded-2xl w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/5 mt-4 p-2 bg-gradient-to-r from-[#20103D] to-[#2E1653] bg-opacity-60 backdrop-blur-md border border-[#3B2467] shadow-lg shadow-[#20103D]' />
        <button onClick={fetchapi} className='p-4 mt-4 hover:scale-110 transition-transform duration-500'><FaLocationDot size={24} /></button>
      </div>

      {weather && (
        <div className="p-4 mt-10 weathercard border-2 border-[#2E1653] shadow-xl shadow-[#433461] w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] xl:w-[20%] text-center m-auto h-[30vh] rounded-3xl">
        <div className="temp flex p-4 mt-4">
        <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl mr-4 sm:mr-6 md:mr-8 lg:mr-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]'>{Math.round(weather.main.temp)}&deg; </p><p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl ml-2 sm:ml-3 md:ml-4'>{icon}</p>
        </div>
        <div className="city mt-6 text-left text-lg sm:text-xl md:text-2xl lg:text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] ">{weather.name}, {weather.sys.country}</div>
        </div> 
      ) }
     

    </div>
  )
}

export default weather

// <FaCloudSun size={32}/>
/*
<div className="mt-6 bg-purple-800 p-6 rounded-xl shadow-lg text-white">
                <h2 className="text-xl">{weather.name}, {weather.sys.country}</h2>
                <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
                <p>{weather.weather[0].description}</p>
        </div>
*/