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
    favTempChecked:  localStorage.getItem('favTempChecked')
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if ( city && country && data.cod !== '404'  ) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        button: true,
        error: ""
      });
    } else if ( city && country && data.cod === '404' ) {
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
      favTemp: localStorage.getItem('favTemp'),
      favTempChecked: localStorage.getItem('favTempChecked'),
})
  }
  render() {
    return (
      <div>
        <Titles />
        <Form getWeather={this.getWeather}/>
        <Weather 
          temperature={this.state.temperature}
          city={this.state.city} 
          country={this.state.country} 
          description={this.state.description}
          error={this.state.error}
        />
        <Favorite 
          favCity={this.state.favCity}
          favCountry={this.state.favCountry}
          favTemp={this.state.favTemp}
          favTempChecked={this.state.favTempChecked}
        />
        {this.state.button && <button onClick={this.saveFavorite}>Set as favorite city.</button> }
        <button onClick={this.Refresh}>Check for update</button>
      </div>
    )
  }
}

export default App;
