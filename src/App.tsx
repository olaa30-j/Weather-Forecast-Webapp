import { useState, useEffect, useRef } from 'react';
import './App.css'
import Date from './component/Date';
import WeatherComponent from './component/WeatherComponent';

interface WeatherData {
  name: string;
  main: {
    feels_like: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
}

function App() {

  const weatherApi = { 
    key:"910d3e2ec9a3a7d5e37016ab1a7dbdd3",
    base:"https://api.openweathermap.org/data/2.5/"
  };

  const [search, setSearch] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null >(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      fetch(`${weatherApi.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApi.key}`)
        .then(response => response.json())
        .then((data: WeatherData) => setWeatherData(data));
    });
  }, []);
  
  

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const searchValue= e.target.value;
    setSearch(searchValue);
  }

  const handleSubmit = (e:React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch(`${weatherApi.base}weather?q=${search}&units=metric&APPID=${weatherApi.key}`)
    .then((response) =>{
      if(!response.ok){
        throw new Error('Not found')
      }
      return response.json()
    })
    .then((data: WeatherData)=>{
      setWeatherData(data);
      inputRef.current ? inputRef.current.value = "" : inputRef; 
    })
    .catch((err:Error) =>{
      console.log("Error fetching weather data:", err)
    })
  }
  return (
    <>
      <div className='container mx-auto'>
        
        <div className='flex justify-between items-center'>
          <button>Toggle Button</button>
          <div className='flex-initial w-64'>
            <input ref={inputRef} onChange={handleSearchInput} type='search' placeholder='Please Enter The City'/>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <button>--icon--Current Location</button>
        </div>

        <div className='flex justify-between'>
          <Date city={weatherData?.name}/>
          <WeatherComponent weatherData= {weatherData} />
        </div>
      </div>
    </>
  )
}

export default App
