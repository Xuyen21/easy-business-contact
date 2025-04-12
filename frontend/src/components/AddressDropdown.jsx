import React, { useState } from "react";
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function AddressDropDown() {
    const [country, setCountry] = useState(null);
    const [currentState, setCurrentState] = useState(null);
    const [currentCity, setCurrentCity] = useState(null);

    return (
        <div className="flex gap-2">
            <div>
                <p className="block text-sm/6">Country</p>
                <CountrySelect
                    // containerClassName="form-group"
                    // inputClassName=""
                    onChange={(_country) => setCountry(_country)}
                    onTextChange={(_txt) => console.log(_txt)}
                    placeHolder="Select Country"
                />
            </div>
            <div>
                <p className="block text-sm/6">State</p>
                <StateSelect
                    countryid={country?.id}
                    // containerClassName="form-group"
                    // inputClassName=""
                    onChange={(_state) => setCurrentState(_state)}
                    onTextChange={(_txt) => console.log(_txt)}
                    defaultValue={currentState}
                    placeHolder="Select State"
                />
            </div>
            <div>
                <p className="block text-sm/6">City</p>
                <CitySelect
                    countryid={country?.id}
                    stateid={currentState?.id}
                    onChange={(_city) => setCurrentCity(_city)}
                    defaultValue={currentCity}
                    placeHolder="Select City"
                />
            </div>
        </div>

    );
}