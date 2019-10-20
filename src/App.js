import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import { styled } from '@material-ui/styles';

import Weather from "./components/Weather/Weather"
import Loading from "./components/Loading/Loading"

const API_KEY = "9f3b5a163b6c4102b3c407f6668527b4";

const MyRefreshIcon = styled(RefreshIcon)({
    color: '#979797',
    height: '36px',
    width: '36px'
})


class App extends React.Component {

    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        description: undefined,
        forecast: [],
        done: false,
        update: false,
        api_failure: false
    }

    async GetWeather(props) {
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${props.coords.latitude}&lon=${props.coords.longitude}&appid=${API_KEY}&units=metric`);
        if (api_call.ok) {
            const weather = await api_call.json();
            const api_call2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${props.coords.latitude}&lon=${props.coords.longitude}&appid=${API_KEY}&units=metric`);
            if (api_call2.ok) {
                const forecast = await api_call2.json();
                const list = forecast.list;
                this.setState({
                    city: weather.name,
                    temperature: weather.main.temp.toFixed(),
                    description: weather.weather[0].main,
                    weatherId: weather.weather[0].id,
                    forecast: [list[8], list[16], list[24], list[32]],
                    done: true,
                    update: false
                })
            } else {
                this.setState({
                    api_failure: true
                })
            }
        } else {
            this.setState({
                api_failure: true
            })
        }
    }

    componentDidMount() {
        setTimeout(() => {
            navigator.geolocation.getCurrentPosition(this.GetWeather.bind(this))
        }, 1500);
    }

    refresh() {
        this.setState({
            update: true
        })
        setTimeout(() => {
            navigator.geolocation.getCurrentPosition(this.GetWeather.bind(this))
        }, 1500);
    }

    render() {
        return (
            <>
                {this.state.api_failure ?
                    <div>
                        <h1>The service is currently unavailable</h1>
                    </div> :
                    <>
                        {navigator.geolocation ?
                            <>
                                {this.state.done &&
                                    <div className="buttonWrapper">
                                        <IconButton onClick={this.refresh.bind(this)}>
                                            <MyRefreshIcon />
                                        </IconButton>
                                    </div>
                                }
                                {!this.state.update ?
                                    <div className="main">
                                        <Weather
                                            city={this.state.city}
                                            temperature={this.state.temperature}
                                            description={this.state.description}
                                            conditionId={this.state.conditionId}
                                            forecast={this.state.forecast}
                                            weatherId={this.state.weatherId}
                                            done={this.state.done}>
                                        </Weather>
                                    </div> : <div className="main"><Loading /></div> }
                            </> :
                            <div>
                                <h1>The app needs your location.</h1>
                            </div>
                        }
                    </>
                }
            </>
        )
    }
}

export default App;