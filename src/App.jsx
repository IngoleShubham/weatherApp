import { useState } from 'react'
import axios from 'axios'

function App() {

  const [location, setLocation] = useState('')
  const [data, setData] = useState('')
  const [error, setErrors] = useState([])
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=4b39993a0179d5a6fa150a927eedd87e`

  const serachLocation = (event) =>{
    if(event.key === 'Enter') {
      axios.get(URL).then((Response) => {
        setData(Response.data)
        // console.log(Response.data);
      }).catch(err=>{
        setErrors(err.response.data)
        console.log(err.response.data)
      })
      setLocation('')
    }
  }
  
  return (

    <div className="app">
         
      <div className='searchbox'>
        <input 
          value={location} 
          onKeyDown={serachLocation} 
          onChange ={event => setLocation(event.target.value)}
          placeholder="Enter City to Search"
          type='text' />
      </div>

      <div style={{"textAlign": "center"}}>
        {error.cod}<br/>
        {error.message}
      </div> 

      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p className='bold'>{data.name}</p>
          </div>

          <div className='temprature'>
            {data.main ? <h1>{Math.floor(data.main.temp) - 273}°C</h1> : null}
          </div>

          <div className='description'>
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>

        <div className='bottom'>
          <div className='feels'>
            {data.main ? <p className='bold'>{data.main.feels_like}°K</p> : null}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.wind ? <p className='bold'>{data.wind.speed} Kmph</p> : null}
            <p>Wind speed</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
