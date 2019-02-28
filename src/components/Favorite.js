import React from "react";

const Favorite = props => (
    <div>
        { props.favCity && props.favCountry && <p>Location: { props.favCity }, { props.favCountry }</p> }
        { props.favCity &&  <p>Temperature: {props.favTemp}</p> }
        { props.favCity && <p>Last updated: {props.favTempChecked}</p> }
        { !props.favCity && <p>You haven't selected a favorite city yet.</p>}
    </div>
)

export default Favorite;