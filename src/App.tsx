import { useState, useEffect, useRef } from 'react';
import Date from './component/Date';
import WeatherComponent from './component/WeatherComponent';
import './App.css'
import { MdMyLocation } from "react-icons/md";
import { PiToggleLeftFill } from "react-icons/pi";
import { PiToggleRightLight } from "react-icons/pi";
import { TbMapSearch } from "react-icons/tb";
import WeeklyForecast from './component/WeeklyForecast';
import HourlyComponent from './component/HourlyComponent';
import sunny from './assets/weathers images/sunny.png';
import almostsunny from './assets/weathers images/almostsunny.png';
import cloudy from './assets/weathers images/rain.png';
import rainy from './assets/weathers images/rainy.png';


export interface IWeatherImages {
  WeatherImages: {
    type: string,
    icon: string,
  }[];
}


const WeatherImages: IWeatherImages = {
  WeatherImages: [
    {
        type: 'sunny',
        icon: sunny
    },
    {
        type: 'almostsunny',
        icon: almostsunny
    },
    {
        type: 'cloudy',
        icon: cloudy
    },
    {
        type: 'rainy',
        icon: rainy
    },
  ]
};

export interface IWeatherData {
  name: string;
  main: {
      feels_like: number;
      humidity: number;
      pressure: number;
      temp:number;
  };
  weather: {
      main: string;
      description: string;
  }[];
  wind: {
      speed: number;
  };
  sys:{
      sunrise:number;
      sunset:number;
  };
  coord:{
    lon:number;
    lat:number;
  }
}

export interface IDailyWeather {
  list: {
    weather: {
      main: string;
      description: string;
    }[];
    dt_txt: string;
    main: {
      temp_max:number;
  };
  wind: {
    speed: number;
  };
  }[];
}

function App() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY || '';
  const apiBase = import.meta.env.VITE_WEATHER_API_BASE || '';
  const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);
  const [dailyWeather, setDailyWeather] = useState<IDailyWeather | null>(null)
  const [search, setSearch] = useState<string>("");
  const [weatherData, setWeatherData] = useState<IWeatherData | null >(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lon = weatherData?.coord.lon;
  const lat = weatherData?.coord.lat;


  useEffect(() => {
    // Setup Darkmode 
    localStorage.setItem('dark_mode', darkMode ? 'dark' : 'light');
    if (localStorage.getItem('dark_mode') === 'dark') {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }

    // Get Weather at Current Location
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      fetch(`${apiBase}weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then((data: IWeatherData) => setWeatherData(data));
    });

    fetch(`${apiBase}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then((response) =>{
      if(!response.ok){
        throw new Error('Not found')
      }
      return response.json()
    })
    .then((data:IDailyWeather)=>{
      console.log(data)
      setDailyWeather(data)
    })
    .catch((err:Error) =>{
      console.log("Error fetching weather data:", err)
    })

  }, [darkMode , weatherData]);
  
  

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const searchValue= e.target.value;
    setSearch(searchValue);
  }

  // Check Weather for any location (By City Name)
  const handleSubmit = (e:React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch(`${apiBase}weather?q=${search}&units=metric&APPID=${apiKey}`)
    .then((response) =>{
      if(!response.ok){
        throw new Error('Not found')
      }
      return response.json()
    })
    .then((data: IWeatherData)=>{
      setWeatherData(data);
      inputRef.current ? inputRef.current.value = "" : inputRef; 
    })
    .catch((err:Error) =>{
      console.log("Error fetching weather data:", err)
    })
  }

  return (
    <div className={`bg-gradient-to-l min-h-[100vh] ${darkMode ? 'dark from-zinc-900 to-zinc-600' :' from-zinc-400 to-zinc-50 ' }`}>
      <div className={`container mx-auto dark:text-white px-4`}>
        <header className='flex justify-between items-center gap-4 py-6'>
          {/* ********************************** Start Navbar Section ********************************* */}
          <div className='flex flex-col items-center flex-col'>
            {
              darkMode === true ? (
                <button onClick={()=>{setDarkMode(false)}}><PiToggleLeftFill className='text-[2rem]'/></button>
              ):(
                <button className="" onClick={()=>{setDarkMode(true)}}><PiToggleRightLight className='text-[2rem]'/></button>
              )
            }
            { !darkMode ? (<span className='hidden	md:block'> Light Mode </span>) : (<span className='hidden	md:block'> Dark Mode </span>)}
          </div>
          <div className='max-w-[65%] flex gap-2 grow px-4 py-1 rounded-full  bg-zinc-300 border-black dark:bg-zinc-700 shadow-lg shadow-zinc-500/20 dark:shadow-zinc-800/20'>
            <button onClick={handleSubmit}><TbMapSearch/></button>
            <input className=' grow bg-transparent focus:outline-none' ref={inputRef} onChange={handleSearchInput} type='search' placeholder='Please Enter The City'/>
          </div>
          <button className='flex justify-between items-center bg-lime-600 rounded-full px-4 py-3'><MdMyLocation className='md:mr-1'/>  <span className='hidden	md:block'>Current Location</span></button>
        </header>
        {/* ********************************** End Navbar Section *********************************** */}

        {/* ********************************** Start Main Section *********************************** */}
        <main className='flex gap-6 flex-col md:flex-row py-6'>
          <Date city={weatherData?.name} />
          <WeatherComponent weatherData= {weatherData} WeatherImages= {WeatherImages}/>
        </main>
        {/* ********************************** End Main Section ************************************* */}

        {/* ********************************** Start Main Section *********************************** */}
        <section className='flex gap-6 flex-col md:flex-row py-6'>
          <WeeklyForecast dailyWeather={dailyWeather} WeatherImages= {WeatherImages}/>
          <HourlyComponent dailyWeather={dailyWeather} WeatherImages= {WeatherImages}/>
        </section>
        {/* ********************************** End Main Section ************************************* */}

      </div>
    </div>
  )
}

export default App
