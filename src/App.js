import React from 'react';

import Weather from "./components/Weather/Weather"

class App extends React.Component {

    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        description: undefined,
        forecast: []
    }

    async GetWeather(props) {
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${props.coords.latitude}&lon=${props.coords.longitude}&appid=12de0761e0857cf7589f898c183bb2d9&units=metric`);
        const weather = await api_call.json();
        const api_call2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${props.coords.latitude}&lon=${props.coords.longitude}&appid=12de0761e0857cf7589f898c183bb2d9&units=metric`);
        const forecast = await api_call2.json();
        const list = forecast.list;
        this.setState({
            city: weather.name,
            temperature: weather.main.temp.toFixed(),
            description: weather.weather[0].description,
            weatherId: weather.weather[0].id,
            forecast: [list[8], list[16], list[24], list[32], list[39]]
        })
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.GetWeather.bind(this))
    }

    render() {
        return (
            <Weather
                city={this.state.city}
                temperature={this.state.temperature}
                description={this.state.description}
                conditionId={this.state.conditionId}
                forecast={this.state.forecast}
                weatherId={this.state.weatherId}>
            </Weather>
        )
    }
}

export default App;