import React from "react";

const Current = props => (
    <div className="current-location__info">
        {props.curCity && props.curCountry && <p>{props.curCity}, {props.curCountry}</p>}
        {props.curCity && <p>Temperature: {props.curTemperature}</p>}
        {props.curCity && <p>Conditions: {props.curDescription}</p>}
        {!props.curCity && <p>You haven't set your current location yet. You can find the weather of different
             cities and set your current location. Once you have set your current location its weather information will be visible here. </p>}
    </div>
)

export default Current;