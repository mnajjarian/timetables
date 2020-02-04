import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import { Journey, Place } from './index';
import { LatLngExpression } from 'leaflet';
import { Feature } from '../api/interfaces';

interface State {
    features: Feature[];
}

const initialState: State = {
    features: [
        {
            properties: { id: '', name: '', label: '' },
            geometry: { coordinates: [] }
        }
    ]
};

const Search: FC = (): JSX.Element => {
    const [state, setState] = useState<string | undefined>();
    const [label, setLabel] = useState<string | undefined>();
    const [data, setData] = useState<State>(initialState);
    const [coordinate, setCoordinate] = useState<LatLngExpression>();
    const [toggle, setToggle] = useState(false);

    const handleClick = (coord, label) => (): void => {
        setCoordinate(coord);
        setLabel(label);
        setState(label)
        setToggle(false);
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

    return (
        <div className="search col-md-5 mt-2">
            <input
                data-testid="test-input"
                className="form-control"
                type="search"
                placeholder="Search..."
                name="address"
                value={state || ''}
                onChange={handleChange}
                onFocus={handleToggle}
            />

            <div>
                {label && state && (
                    <a className="btn btn-sm" data-toggle="collapse" href="#menuCard" role="button">
                        <span className="fa fa-grip-lines fa-lg"></span>
                        
                    </a>
                )}
                <div className="collapse show" id="menuCard">
                    {state && toggle && data.features?.length > 0 && (
                        <div data-testid='test-dropdown' className="dropdown">
                            {data.features?.map(feature => (
                                <Place key={feature.properties.id} feature={feature} handleClick={handleClick} />
                            ))}
                        </div>
                    )}
                    <Journey origin={{ label, coordinate }} />
                </div>
            </div>
        </div>
    );
};

export default Search;
