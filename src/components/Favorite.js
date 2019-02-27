import React from "react";

const Favorite = props => (
    <div>
       { props.favCity && props.favCountry && <p>Location: { props.favCity }, { props.favCountry }</p> }
    </div>
)

export default Favorite;