import React, { useState, useContext } from 'react';
import { Itinerary, Leg, Plan } from './api/route';
import { MapContext } from './context/context';
import { Types } from './reducer/reducer';

interface TimetableProps {
    itineraries: Itinerary;
    plan?: Plan;
}

enum Legs {
    BUSS = 'BUS',
    WALK = 'WALK',
    RAIL = 'RAIL'
}

const switchIcon = (leg: Leg): JSX.Element | undefined => {
    switch (leg.mode) {
        case Legs.BUSS:
            return (
                <span className="badge badge-primary p-1">
                    <span className="fa fa-bus-alt mr-1"></span>
                    <span>{leg.route.shortName}</span>
                </span>
            );
        case Legs.WALK:
            return <span className="fa fa-walking"></span>;
        case Legs.RAIL:
            return (
                <span className="badge badge-info p-1">
                    <span className="fa fa-subway mr-1"></span>
                    <span>{leg.route.shortName}</span>
                </span>
            );
        default:
            break;
    }
};

const switchMode = (leg: Leg): JSX.Element | undefined => {
    switch (leg.mode) {
        case Legs.WALK:
            return <div></div>;

            break;

        default:
            break;
    }
};
const Timetable: React.FC<TimetableProps> = (props: TimetableProps): JSX.Element => {
    //const [showRoute, setShowRoute] = useState(false);
    const { dataDispatch } = useContext(MapContext);

    const { itineraries, plan } = props;

    const getTime = (unix: string): string => {
        const date = new Date(unix);
        const hours = date.getHours();
        const minutes = '0' + date.getMinutes();

        const formattedTime = hours + ':' + minutes.substr(-2);
        return formattedTime;
    };
    const handleRoute = (): void => {
        const points = itineraries.legs.map(leg => leg.legGeometry.points);

        dataDispatch({
            type: Types.ADD_POINT,
            payload: {
                points,
                markers: [
                    [plan?.from.lat, plan?.from.lon],
                    [plan?.to.lat, plan?.to.lon]
                ]
            }
        });
    };
    return (
        <>
            <li className="route-table list-group-item " onClick={handleRoute}>
                <div className="row">
                    <span
                        className={`fa fa-${
                            itineraries.legs.length === 1 && itineraries.legs.map(leg => leg.mode === 'WALK')
                                ? 'walking '
                                : 'bus '
                        }ml-2 mr-4`}
                    ></span>
                    <span>
                        <span>
                            {getTime(itineraries.startTime)}
                            {'-'}
                        </span>
                        <span>{getTime(itineraries.endTime)}</span>
                    </span>
                    <span className="badge badge-primary badge-pill ml-auto">
                        {(Number(itineraries.duration) / 60).toFixed() + ' min'}
                    </span>
                </div>
                <div className="row ml-4">
                    {itineraries.legs.map((leg, index) => (
                        <span className="badge badge-light" key={index}>
                            {switchIcon(leg)}{' '}
                            {index !== itineraries.legs.length - 1 && <span className="fa fa-angle-right ml-1"></span>}
                        </span>
                    ))}
                </div>
            </li>
            {/* <div>{showRoute && itineraries.legs.map(leg => <div key={leg.startTime}>{switchMode(leg)}</div>)}</div> */}
        </>
    );
};

export default Timetable;
