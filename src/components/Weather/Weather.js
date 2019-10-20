import React from "react";
import Loading from "../Loading/Loading"


const Images = {
    2: "https://cdn0.iconfinder.com/data/icons/weather-line-19/32/Thunder-512.png",
    3: "https://cdn0.iconfinder.com/data/icons/weather-line-19/32/Light_Rain-512.png",
    5: "https://cdn0.iconfinder.com/data/icons/weather-line-19/32/Light_Rain-512.png",
    6: "https://cdn0.iconfinder.com/data/icons/weather-line-19/32/Light_Snow-512.png",
    7: "https://cdn0.iconfinder.com/data/icons/weather-line-19/32/Foggy-512.png",
    8: "https://cdn0.iconfinder.com/data/icons/weather-line-19/32/Sunny-512.png",
    80: "https://cdn0.iconfinder.com/data/icons/weather-line-19/32/Overcast-512.png"
}


const Weather = (props) => {
    function toDate(date) {
        const slicedDate = date.slice(0, 10);
        const splitDate = slicedDate.split('-');
        return (
            `${splitDate[2]}.${splitDate[1]}`
        )
    }
    function toId(id) {
        let idAsNumber = 0;
        if (id === 801 | id === 802 | id === 803 | id === 804) {
            idAsNumber = 80;
        } else {
            idAsNumber = ('' + id)[0];
        }
        return (
            idAsNumber
        )
    }
    return (
        <>
            {props.done ?
                <>
                    <h1>{props.city}</h1>
                    <div className="currentWeather">
                        <div className="currentTemperature">
                            <p>
                                {props.temperature} {' \u00b0C'}
                            </p>
                        </div>
                        <div className="currentDescription">
                            <div className="currentDescription__text">
                                {props.description}
                            </div>
                            {props.weatherId &&
                                <div className="currentWeather__imageWrapper">
                                    <img className="currentWeather__image" alt="Image_of_weather_description" src={Images[toId(props.weatherId)]} />
                                </div>
                            }
                        </div>
                    </div>
                    {props.forecast[0] &&
                        <div className="forecast">
                            {props.forecast.map((item) =>
                                <div className="forecastDay" key={item.dt}>
                                    <p className="forecastDate">{toDate(item.dt_txt)}</p>
                                    <p className="forecastTemperature">{item.main.temp.toFixed()} {' \u00b0C'}</p>
                                    <img className="forecastImage" alt="Weather_image" src={Images[toId(item.weather[0].id)]} />

                                </div>
                            )}
                        </div>
                    }
                </>
                : <Loading />
            }
        </>
    );
};

export default Weather;
