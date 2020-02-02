import React, { useState, FC } from 'react';
import { LatLngExpression } from 'leaflet';
import RouteInfo from './RouteInfo';

interface Props {
    origin: Spot;
}

interface Spot {
    label: string;
    coord?: LatLngExpression;
}

const Journey: FC<Props> = (props: Props): JSX.Element => {
    const [toggle, setToggle] = useState(false);
    const [showRoute, setShowRoute] = useState(false);

    const goToDirection = (): void => setShowRoute(!showRoute);

    const {
        origin: { label, coord }
    } = props;

    const destination: Spot = {
        label: 'Pohjoinen Rautatiekatu 25, Helsinki',
        coord: [60.169407, 24.926007]
    };
    const handleSwitch = (): void => {
        setToggle(!toggle);
    };

    if (!label) {
        return <div></div>;
    }
    return (
        <div className="card">
            <div className="card-body">
                <div className="alert alert-primary m-0">{toggle ? destination.label : label}</div>
                <div className="card-points">
                    <span className="fa fa-random fa-lg p-2" role="button" onClick={handleSwitch}></span>
                </div>
                <div className="alert alert-danger">{!toggle ? destination.label : label}</div>
                <div className='card-points' >
                    <button className='btn btn-primary ml-auto'>
                    <span className="fa fa-directions fa-lg " onClick={goToDirection}></span>
                    </button>
                </div>
            </div>

            {showRoute && coord && destination.coord && (
                <RouteInfo
                    origin={{ coordinate: !toggle ? coord : destination.coord }}
                    destination={{ coordinate: !toggle ? destination.coord : coord }}
                />
            )}
        </div>
    );
};

export default Journey;
