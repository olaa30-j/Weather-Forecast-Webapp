import React from 'react'
import { IDailyWeather, IWeatherData, IWeatherImages } from '../App'



interface WeatherConfig {
  WeatherImages: IWeatherImages | null,
  dailyWeather: IDailyWeather | null,
  weatherData: IWeatherData | null,
}

const WeeklyForecast: React.FC<WeatherConfig> = ({ dailyWeather, weatherData, WeatherImages }) => {

  return (
    <div className={`container mx-auto py-8 flex md:flex-initial lg:w-[25%] flex-col rounded-xl shadow-lg shadow-zinc-500/70 dark:shadow-zinc-950/80`}>
      <h5 className="text-center ">5 day Forecast:</h5>
      <div className='flex flex-col gap-2 p-6 justify-center h-full'>
        {dailyWeather?.list
          .filter((_, index) => [0, 8, 16, 24, 32].includes(index))
          .map((data, index) => (
            <div key={index} className='flex justify-between items-center gap-2'>
              <div className='max-w-[35%] md:max-w-[30%]'>

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

              <span className="ml-3">{data.main.temp_max}'C</span>
              <span>{data.dt_txt.slice(0, 10)}</span>
            </div>
          ))}
      </div>
    </div>
  )
}

export default WeeklyForecast