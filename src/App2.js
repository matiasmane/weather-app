import React from 'react';

import Current from "./components/Current/Current"

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
        const data = await api_call.json();
        const api_call2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${props.coords.latitude}&lon=${props.coords.longitude}&appid=12de0761e0857cf7589f898c183bb2d9&units=metric`);
        const data2 = await api_call2.json();
        const list = data2.list;
        const id = data.weather[0].id
        let idAsNumber = 0;
        if (id === 801 | id === 802 | id === 803 | id === 804) {
            idAsNumber = 80;
        } else {
            idAsNumber = ('' + id)[0];
        }
        this.setState({
            city: data.name,
            temperature: data.main.temp.toFixed(),
            description: data.weather[0].description,
            conditionId: idAsNumber,
            forecast: [list[8], list[16], list[24], list[32], list[39]]
        })
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.GetWeather.bind(this))
    }
    
    render() {
        return (
            <Current
                city={this.state.city}
                temperature={this.state.temperature}
                description={this.state.description}
                conditionId={this.state.conditionId}
                forecast={this.state.forecast}>
            </Current>
        )
    }
}

export default App;