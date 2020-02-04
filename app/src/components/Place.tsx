import React from 'react';
import { Feature } from '../api/interfaces';
import { LatLngExpression, LatLng } from 'leaflet';

interface Props {
    feature: Feature;
    handleClick: (coords: LatLngExpression | LatLng[], label: string) => () => void;
}
const Place: React.FC<Props> = (props: Props): JSX.Element => {
    const { feature, handleClick } = props;

    return (
        <div>
            <a
                href="#"
                className="dropdown-item"
                key={feature.properties.id}
                onClick={handleClick(feature.geometry.coordinates.reverse(), feature.properties.label)}
            >
                {feature.properties.label}
            </a>
        </div>
    );
};

export default Place;
