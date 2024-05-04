import React from 'react';
import { PiWindFill } from "react-icons/pi";
import { MdOutlineWaves } from "react-icons/md";
import { GiSpeedometer } from "react-icons/gi";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { TbUvIndex } from "react-icons/tb";
import { IWeatherData, IWeatherImages } from '../App';

interface WeatherConfig {
    weatherData: IWeatherData | null,
    WeatherImages: IWeatherImages | null,
}

const WeatherComponent: React.FC<WeatherConfig> = ({ weatherData, WeatherImages }) => {
    console.log(weatherData)
    let sunriseTimeString = '';
    let sunsetTimeString = '';

    if (weatherData) {
        const sunriseTimestamp = weatherData.sys.sunrise * 1000; 
        const sunsetTimestamp = weatherData.sys.sunset * 1000;    
        const sunriseDate = new Date(sunriseTimestamp);
        const sunsetDate = new Date(sunsetTimestamp);
        sunriseTimeString = sunriseDate.toLocaleTimeString(); 
        sunsetTimeString = sunsetDate.toLocaleTimeString();
    }

    return (
        <div className='container mx-auto p-8 text-center items-center flex md:flex-initial md:w-[60%] rounded-xl shadow-lg shadow-zinc-500/70 dark:shadow-zinc-950/80 flex-col md:flex-row'>
            <div className='flex flex-col'>
                <h2 className='md:text-start m-0 p-0'>{weatherData?.main.temp}'C</h2>
                <p className='text-xl font-medium'><span className='text-base  font-normal'>Feels Like:</span> {weatherData?.main.feels_like}'C</p>
                
                <div className='flex flex-col gap-4 items-center mt-8'>
                    <div className='sunrise_container flex items-center gap-4'>
                        <FiSunrise className='text-[2rem]'/>
                        <div className="sunrise flex flex-col">
                            <span>Sunrise</span>
                            <span>{sunriseTimeString}</span>
                        </div>
                    </div>
                    <div className='sunset_container flex items-center gap-4'>
                    <FiSunset className='text-[2rem]'/>
                        <div className="sunset flex flex-col">
                            <span>Sunset</span>
                            <span>{sunsetTimeString}</span>
                        </div>
                    </div>
                </div>
                {/* <h5>{weatherData?.weather[0].description} </h5> */}
            </div>

            <div className='flex md:flex-col flex-row-reverse justify-center items-center'>
                <div className='max-w-[70%] md:max-w-[100%] weather_img_container'>
                {
                    weatherData?.weather && WeatherImages?.WeatherImages && (
                        WeatherImages.WeatherImages.map((data, index) => (
                        weatherData.weather[0].main === data.type ? (
                            <img key={index} src={data.icon} alt='weather image' />
                        ) : 
                        weatherData.weather[0].description.includes(data.type)  ? (
                            <img key={index} src={data.icon} alt='weather image' />
                        ) : null
                        ))
                    )
                }
                </div>
                <h4>{weatherData?.weather[0].description}</h4>
            </div>

            <div className='w-[65%]'>
                <div className="icons_weather grid grid-cols-2 gap-8">
                    <div className="flex flex-col items-center humidity_container">
                        <MdOutlineWaves className='text-[2.5rem]'/>
                        <h6>{weatherData?.main.humidity}%</h6>
                        <span>Humidity</span>
                    </div>

                    <div className="flex flex-col items-center humidity_container">
                        <PiWindFill className='text-[2.5rem]'/>
                        <h6>{weatherData?.wind.speed}km/h</h6>
                        <span>Wind Speed</span>

                    </div>

                    <div className="flex flex-col items-center humidity_container">
                        <GiSpeedometer className='text-[2.5rem]'/>
                        <h6>{weatherData?.main.pressure}hPa</h6>
                        <span>Pressure</span>
                    </div>

                    <div className="flex flex-col items-center humidity_container">
                        <TbUvIndex className='text-[2.5rem]'/>
                        <h6>{weatherData?.wind.speed}</h6>
                        <span>UV</span>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherComponent