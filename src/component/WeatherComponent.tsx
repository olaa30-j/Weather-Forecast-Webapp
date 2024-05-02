import React from 'react'

interface WeatherData {
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
    }
}

interface WeatherConfig {
    weatherData: WeatherData | null,
}

const WeatherComponent: React.FC<WeatherConfig> = ({ weatherData }) => {
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
        <div className='container mx-auto text-center flex justify-around items-center'>
            <div>
                <h4>{weatherData?.main.temp} 'C</h4>
                <h5><span>Feels Like:</span> {weatherData?.main.feels_like} 'C</h5>
                <div>
                    <div className='sunrise_container flex'>
                        <span>icon</span>
                        <div className="sunrise">
                            <span>Sunrise</span>
                            <span>{sunriseTimeString}</span>
                        </div>
                    </div>
                    <div className='sunset_container flex'>
                        <span>icon</span>
                        <div className="sunset">
                            <span>Sunset</span>
                            <span>{sunsetTimeString}</span>
                        </div>
                    </div>
                </div>
                {/* <h5>{weatherData?.weather[0].description} </h5> */}
            </div>

            <div>
                <h5>{weatherData?.weather[0].description}</h5>
            </div>

            <div className=''>
                <div className="icons_weather grid grid-cols-2 gap-4">
                    <div className="humidity_container">
                        <p>icon</p>
                        <h5>{weatherData?.main.humidity}%</h5>
                        <span>Humidity</span>
                    </div>

                    <div className="humidity_container">
                        <p>icon</p>
                        <h5>{weatherData?.wind.speed}km/h</h5>
                        <span>Wind Speed</span>

                    </div>

                    <div className="humidity_container">
                        <p>icon</p>
                        <h5>{weatherData?.main.pressure}hPa</h5>
                        <span>Pressure</span>
                    </div>

                    <div className="humidity_container">
                        <p>icon</p>
                        <h5>{weatherData?.wind.speed}</h5>
                        <span>UV</span>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherComponent