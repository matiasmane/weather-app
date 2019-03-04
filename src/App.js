import React from 'react';

import Form from "./components/Form"
import Weather from "./components/Weather"
import Favorite from "./components/Current"

const API_KEY = "12de0761e0857cf7589f898c183bb2d9";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    description: undefined,
    button: false,
    error: undefined,
    curCity: localStorage.getItem('curCity'),
    curCountry: localStorage.getItem('curCountry'),
    curTemperature: localStorage.getItem('curTemperature'),
    curDescription: localStorage.getItem('curDescription')
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (city && country && data.cod !== '404') {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        button: true,
        error: ""
      })
    } else if (city && country && data.cod === '404') {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        description: undefined,
        button: false,
        error: "City not found."
      })
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        description: undefined,
        button: false,
        error: "Please enter both values."
      })
    }
  }

  setCurrent = (ev) => {
    localStorage.setItem('curCity', this.state.city);
    localStorage.setItem('curCountry', this.state.country);
    localStorage.setItem('curTemperature', this.state.temperature);
    localStorage.setItem('curDescription', this.state.description);
    this.setState({
      curCity: localStorage.getItem('curCity'),
      curCountry: localStorage.getItem('curCountry'),
      curTemperature: localStorage.getItem('curTemperature'),
      curDescription: localStorage.getItem('curDescription')
    })
  }

  refreshCurrent = async (a) => {
    const city = localStorage.getItem('curCity');
    const country = localStorage.getItem('curCountry');
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (data.cod !== '404') {
      localStorage.setItem('curTemperature', data.main.temp);
      localStorage.setItem('curDescription', data.weather[0].description);
      this.setState({
        curTemperature: localStorage.getItem('curTemperature'),
        curDescription: localStorage.getItem('curDescription')
      })
    }
  }

  componentDidMount() {
    if (this.state.curCity) {
      this.refreshCurrent();
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="row">
              <div className="col-5 current-location-container">
                <div className="col-9 current-location-title">
                  <h1>Current location</h1>
                </div>
                <div className="col-9 current-location-info">
                  <Favorite
                    curCity={this.state.curCity}
                    curCountry={this.state.curCountry}
                    curTemperature={this.state.curTemperature}
                    curDescription={this.state.curDescription}
                  />
                </div>
              </div>
              <div className="col-7 form-container">
                <Form getWeather={this.getWeather} />
                <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  description={this.state.description}
                  error={this.state.error}
                />
                {this.state.button && (this.state.city !== this.state.curCity || this.state.country !== this.state.curCountry) &&
                  <button onClick={this.setCurrent}>Set as current location</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;