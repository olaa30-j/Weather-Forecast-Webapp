import React from 'react'
import { IDailyWeather, IWeatherData, IWeatherImages } from '../App';
import arrow from '../assets/arrow.png'
interface WeatherConfig {
  WeatherImages: IWeatherImages | null,
  dailyWeather: IDailyWeather | null,
  weatherData: IWeatherData | null
}

const HourlyComponent: React.FC<WeatherConfig> = ({ dailyWeather , weatherData, WeatherImages }) => {
  return (
    <div className='container mx-auto p-4 text-center items-center flex flex-col md:flex-initial lg:w-[70%] rounded-xl shadow-lg shadow-zinc-500/70 dark:shadow-zinc-950/80'>
      <h4 className='mb-8'>Hourly Forecast:</h4>

      <div className='grid md:grid-cols-5 grid-cols-1 gap-8 justify-between w-[90%]'>
        {dailyWeather?.list
          .filter((_, index) => [0, 2, 4, 6, 8].includes(index))
          .map((data, index) => (
            <div key={index} className={`flex md:flex-col gap-4 px-3 py-2 items-center rounded-3xl bg-gradient-to-b from-orange-400 to-orange-100`}>
              <span>{data.dt_txt.slice(11 , 16)}</span>

              <div className='w-[100%] md:max-w-[100%]'>
              {
                  weatherData?.weather && WeatherImages?.WeatherImages && (
                    WeatherImages.WeatherImages.map((data, index) => (
                      weatherData.weather[0].main === data.type ? (
                        <img key={index} src={data.icon} alt='weather image' />
                      ) :
                        weatherData.weather[0].description.includes(data.type) ? (
                          <img key={index} src={data.icon} alt='weather image' />
                        ) : null
                    ))
                  )
                }
              </div>

              <h6 className="ml-3">{data.main.temp_max}'C</h6>
              <div className='max-w-[100%] md:max-w-[75%] '>
                <img src={arrow} alt="img" />
              </div>
              <span>{data.wind.speed}km/h</span>
            </div>
          ))}
      </div>

    </div>
  )
}

export default HourlyComponent;