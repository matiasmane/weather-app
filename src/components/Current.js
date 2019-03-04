import React from "react";

const Favorite = props => (
    <div className="favorite__info">
        { props.curCity && props.curCountry && <p>{ props.curCity }, { props.curCountry }</p> }
        { props.curCity &&  <p>Temperature: {props.curTemperature}</p> }
        { props.curCity && <p>Conditions: {props.curDescription}</p> }
        { !props.curCity && <p>You haven't set your current location yet. You can find the weather of different
             cities and set your current location. Once you have set your current location its weather information will be visible here. </p>}
    </div>
)

export default Favorite;