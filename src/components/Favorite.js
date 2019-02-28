import React from "react";

const Favorite = props => (
    <div className="favorite__info">
        { props.favCity && props.favCountry && <p>{ props.favCity }, { props.favCountry }</p> }
        { props.favCity &&  <p>Temperature: {props.favTemp}</p> }
        { props.favCity && <p>Conditions: {props.favDes}</p> }
        { props.favCity && <p>Last updated: {props.favTempChecked}</p> }
        { !props.favCity && <p>You haven't set your current location yet. You can find the weather of different
             cities and set your current location. </p>}
    </div>
)

export default Favorite;

