import React from "react";

const Images = {
    2: "https://cdn0.iconfinder.com/data/icons/weather-line-19/32/Thunder-512.png",
    3: "https://cdn0.iconfinder.com/data/icons/weather-line-19/32/Light_Rain-512.png",
    5: "https://cdn0.iconfinder.com/data/icons/weather-line-19/32/Light_Rain-512.png",
    6: "https://cdn0.iconfinder.com/data/icons/weather-line-19/32/Light_Snow-512.png",
    7: "https://cdn0.iconfinder.com/data/icons/weather-line-19/32/Foggy-512.png",
    8: "https://cdn0.iconfinder.com/data/icons/weather-line-19/32/Sunny-512.png",
    80: "https://cdn0.iconfinder.com/data/icons/weather-line-19/32/Overcast-512.png"
}


const Current = (props) => {
    function toDatetime(date) {
        const slicedDate = date.slice(0, 10);
        const splitDate = slicedDate.split('-');
        console.log(splitDate);
        return (
            `${splitDate[2]}.${splitDate[1]}`
        )
    }
    function toId(id) {
        let idAsNumber = 0;
        if (id === 801 | id === 802 | id === 803 | id === 804 ) {
            idAsNumber = 80;
        } else {
            idAsNumber = (''+id)[0];
        }
        return (
            idAsNumber
        )
    }
    return (
        <div>
            <h1>{props.city} weather</h1>
            <div className="weather">
                <div className="temperature">
                    <p>
                        {props.temperature} {' \u00b0C'}
                    </p>
                </div>
                <div className="description">
                    <div className="text">
                        {props.description}
                    </div>
                    {props.conditionId &&
                        <div className="image">
                            <img className="weather_image" alt="Weather_image" src={Images[props.conditionId]} />
                        </div>
                    }
                </div>
            </div>
            {props.forecast[0] &&
                <div className="forecast">
                    {props.forecast.map((item) =>
                        <div className="forecast_day">
                            <p className="forecast_date">{toDatetime(item.dt_txt)}</p>
                            <p className="temp">{item.main.temp.toFixed()} {' \u00b0C'}</p>
                            <img className="forecast_image" alt="Weather_image" src={Images[toId(item.weather[0].id)]} />
                            
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default Current;
