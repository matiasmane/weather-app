import React from 'react';

import Titles from "./components/Titles"
import Form from "./components/Form"
import Weather from "./components/Weather"
import Favorite from "./components/Favorite"

const API_KEY = "12de0761e0857cf7589f898c183bb2d9";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    description: undefined,
    button: false,
    error: undefined,
    favCity: localStorage.getItem('favCity'),
    favCountry: localStorage.getItem('favCountry'),
    favTemp: localStorage.getItem('favTemp'),
    favTempChecked: localStorage.getItem('favTempChecked')
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
        error: "Please enter the values."
      })
    }
  }
  saveFavorite = (ev) => {
    localStorage.setItem('favCity', this.state.city);
    localStorage.setItem('favCountry', this.state.country);
    localStorage.setItem('favTemp', this.state.temperature);
    localStorage.setItem('favTempChecked', Date().toLocaleString());
    this.setState({
      favCity: localStorage.getItem('favCity'),
      favCountry: localStorage.getItem('favCountry'),
      favTemp: localStorage.getItem('favTemp'),
      favTempChecked: localStorage.getItem('favTempChecked'),
    })
  }
  Refresh = async (a) => {
    a.preventDefault();
    const city = localStorage.getItem('favCity');
    const country = localStorage.getItem('favCountry');
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    localStorage.setItem('favTemp', data.main.temp);
    localStorage.setItem('favTempChecked', Date().toLocaleString());
    this.setState({
      favTemp: data.main.temp,
      favTempChecked: localStorage.getItem('favTempChecked'),
    })
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="row">
              <div className="col-5 title-container">
                <div className="col-9 title">
                  <h1>Favorite city</h1>
                </div>
                <div className="col-9 title-container2">
                  <Favorite
                    favCity={this.state.favCity}
                    favCountry={this.state.favCountry}
                    favTemp={this.state.favTemp}
                    favTempChecked={this.state.favTempChecked}
                  />
                </div>
                <div className="col-5 title-button">
                  {localStorage.getItem('favCity') && <button onClick={this.Refresh}>Check for update</button>}
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
                {this.state.button && <button className="save-button" onClick={this.saveFavorite}>Set as favorite city</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
