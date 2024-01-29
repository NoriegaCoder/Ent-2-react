import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';

function App() {
  const [coords, setCoords] = useState();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [textInput, setTextInput] = useState('')
  const [finder, setFinder] = useState(null)


  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=44a7ade7e8e6dfb2953ea15e4d117bb1`;

  const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${textInput}&appid=44a7ade7e8e6dfb2953ea15e4d117bb1`

  useEffect(() => {
    if (coords) {
      setLoading(true)
      axios.get(url)
        .then(res => setData(res.data))

        .catch(err => console.log(err))
        .finally(setLoading(false))
    }

  }, [coords])

  const handleForm = event => {
    event.preventDefault()
    setTextInput(city.current.value.trim().toLowerCase())

  }

  const city = useRef()

  useEffect(() => {
    if (textInput) {
      axios.get(url2)
        .then(res => setFinder(res.data))
        .catch(err => console.log(err))
    }
  }, [textInput])



  /*------------------------FIN--------------------*/

  /*---------Acceso a localizacion ---------------*/
  const success = position => {
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    setCoords(obj)
  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);

  }, [])

  /*------------------------FIN--------------------*/

  return (
    <div>
      {loading ?
        <><div className='wrapper'><h1 >Loading...</h1>
          <img src="https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif" alt="Cargando" className='loadingGif' /></div></>
        :
        textInput ?
          <><div className='search'><form className='formulario' onSubmit={handleForm}>
            <input type="text" ref={city} />
            <button type="submit" className='formulario'>Search</button>
          </form></div>
            <WeatherCard
              data={finder}
            /></>
          :
          <><div className='search'><form className='formulario' onSubmit={handleForm}>
            <input type="text" ref={city} />
            <button type="submit" className='formulario'>Search</button>
          </form></div>
            <WeatherCard
              data={data}
            /></>
      }

    </div>
  )
}

export default App
