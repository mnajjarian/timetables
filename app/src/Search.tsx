import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Place from './Place';
import Journey from './Journey';
import MapComponent from './MapComponent';
import { LatLngExpression } from 'leaflet';

interface Data {
    features: Feature[];
}

export interface Feature {
    properties: Property;
    geometry: Geometry;
}

export interface Property {
    id: string;
    name: string;
    label: string;
}
interface Geometry {
    coordinates: [];
}

const initialState: Data = {
    features: [
        {
            properties: { id: '', name: '', label: '' },
            geometry: { coordinates: [] },
        }
    ]
};

const Search = (): JSX.Element => {
    const [state, setState] = useState('');
    const [label, setLabel] = useState('')
    const [data, setData] = useState<Data>(initialState);
    const [coordinate, setCoordinate] = useState<LatLngExpression>();
    const [toggle, setToggle] = useState(false);


    const handleClick = (coord, label) => (): void => {
        setCoordinate(coord)
        setLabel(label)
        setToggle(false)
        console.log(typeof coord[0])
    };

    useEffect(() => {
        axios(`https://api.digitransit.fi/geocoding/v1/search?text=${state}&size=5`).then(result => {
            setData(result.data);
        });
    }, [state, coordinate]);

    const handleChange = (e: { target: { value: string } }): void => {
        setState(e.target.value);
    };
   
    const handleToggle = (): void => setToggle(true);
    
    console.log('60.169407, 24.926007')

    return (
        <>
        <MapComponent />
        
        <div className="col-md-4 mt-2">
            <input
                className="form-control"
                type="search"
                placeholder="Search..."
                name="address"
                value={state}
                onChange={handleChange}
                onFocus={handleToggle}
            />
            
            {data.features?.length > 0 && toggle && state.length > 1 && (
                <div className="list">
                    {data.features?.map(feature => (
                      <Place key={feature.properties.id} feature={feature} handleClick={handleClick} />
                    ))}
                </div>
            )}
            <Journey origin={{ label, coord: coordinate }}  />
        
        </div>
   </>
    );
};

export default Search;
