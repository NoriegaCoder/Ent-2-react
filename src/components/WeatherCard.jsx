import React, { useState } from 'react'
import './styles/weatherCardStyle.css';

const WeatherCard = ({data}) => {

    const [temp, setTemp] = useState(true)

    function handleTemp() {
        setTemp(!temp)
    }

  return (
    <article className='wrapper'>
        <div>
            
        <h1>Weather App</h1>
        <h2>{data?.name}, {data?.sys.country} </h2>
        </div>
        <div className='content'>
            <img src = {`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png` }alt="current state" />
            <div className='list'>
                <h3 className='merged-cells'>"{data?.weather[0].description}"</h3>
                <ul className='cell'>
                    <li>Wind Speed</li>
                    <li>Clouds</li>
                    <li>Pressure</li>
                </ul>

                <ul className='cell padrig'>
                    <li>{data?.wind.speed}m/s</li>
                    <li>{data?.clouds.all}%</li>
                    <li>{data?.main.pressure}hPa</li>
                </ul>
            </div>
        </div>
        <div>
            <h3 className='temperatura'>
                {temp ? 
                `${(data?.main.temp - 273.15).toFixed(2)} °C`  :
                `${((data?.main.temp - 32) * 5/9).toFixed(2)} °F`
                }
            </h3>

        <button onClick={handleTemp} className='btnTemp'>
            Change to °{temp ? 
            'F' :
            'C'
            } 
        </button>
        </div>
    </article>
  )
}

export default WeatherCard