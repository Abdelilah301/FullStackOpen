import React, { useState } from "react";
import Country from "./Country";
;

const Countries = ({ filteredCountries, onShowCountry }) => {
    const [show, setShow] = useState(false);


    onShowCountry = () => {
        setShow(!show);
    }

    if (show) {
        // console.log(filteredCountries);
        return (
            <div>
                <Country filteredCountries={[filteredCountries]} /><button onClick={onShowCountry}>Hide</button>
            </div>
        )
    } else {
        return (
            <li>{filteredCountries.name.common}<button onClick={onShowCountry}>Show</button></li>
        )
    }


}
export default Countries