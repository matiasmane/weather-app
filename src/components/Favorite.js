import React from "react";

const Favorite = props => (
    <div>
       { props.favCity && props.favCountry && <p>Location: { props.favCity }, { props.favCountry }, { props.favTemp }, {props.favTempChecked} </p> }
    </div>
)

export default Favorite;