import React from 'react'
import { IDailyWeather, IWeatherImages } from '../App';

interface WeatherConfig {
  WeatherImages: IWeatherImages | null,
  dailyWeather: IDailyWeather | null
}

const HourlyComponent: React.FC<WeatherConfig> = ({ dailyWeather }) => {
  return (
    <div className='container mx-auto p-4 text-center items-center flex flex-col md:flex-initial md:w-[70%] rounded-xl shadow-lg shadow-zinc-500/70 dark:shadow-zinc-950/80'>
      <h4 className='mb-8'>Hourly Forecast:</h4>

      <div className='flex gap-8 justify-between w-[90%]'>
        {dailyWeather?.list
          .filter((_, index) => [0, 2, 4, 6, 8].includes(index))
          .map((data, index) => (
            <div key={index} className={`flex flex-col gap-4 px-3 py-2 rounded-3xl bg-gradient-to-b from-orange-400 to-orange-100`}>
              <span>{data.dt_txt.slice(11 , 16)}</span>
              <img src="" alt="img" />
              <span className="ml-3">{data.main.temp_max}'C</span>
              <img src="" alt="img" />
              <span>{data.wind.speed}km/h</span>
            </div>
          ))}
      </div>

    </div>
  )
}

export default HourlyComponent;