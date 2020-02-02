import React, { useState, useContext } from 'react';
import { Itinerary, Leg, Plan, Legs } from './api/interfaces';
import { MapContext } from './context/context';
import { Types } from './reducer/reducer';
import { parseTime, getTime, switchMode } from './utils';

interface TimetableProps {
    itineraries: Itinerary;
    plan?: Plan;
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

export const Detailes = ({ itineraries }: { itineraries: Itinerary }): JSX.Element => {
    return (
        <div className="container m-2">
            {itineraries.legs.map((leg, index) => (
                    <div key={index} className="row">
                        <div className="col-md-3">
                            {/*  <span className="fa fa-walking fa-lg"></span> */}
                            <div className="row">
                                <span>{leg.from.name}</span>
                            </div>
                            <div className="row">
                                {index === itineraries.legs.length - 1 && <span className='align-self-flex-end' >{leg.to.name}</span>}
                            </div>
                        </div>
                        <div className="col-md-2 text-center p-0">
                            <div className="row justify-content-center align-items-center">
                                <span className="far fa-dot-circle fa-lg"></span>
                            </div>
                            <div className="row justify-content-center align-items-center">
                                <span className={switchMode(leg.mode)}></span>
                            </div>
                            {index === itineraries.legs.length - 1 && (
                                <div className="row justify-content-center align-items-center">
                                    <span className="fa fa-dot-circle fa-lg"></span>
                                </div>
                            )}
                        </div>
                        <div className="col p-0">
                            <span> {getTime(leg.startTime)} </span>
                            <span className="ml-4">
                                {leg.mode === 'WALK'
                                    ? 'Walking '
                                    : leg.mode === 'BUS'
                                    ? 'Take the bus ' + leg.trip.pattern.name.split('(')[0]
                                    : 'Take the Train ' + leg.trip.pattern.name.split('(')[0]}
                            </span>
                            <div className='row offset-3'>
                            {parseTime(new Date(leg.startTime), new Date(leg.endTime))}
                            </div>
                        </div>
                    </div>
            ))}
        </div>
    );
};

const Timetable: React.FC<TimetableProps> = (props: TimetableProps): JSX.Element => {
    const [showRoute, setShowRoute] = useState(true);
    const { dataDispatch } = useContext(MapContext);

    const { itineraries, plan} = props;
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
                        {/*  {(Number(itineraries.duration) / 60).toFixed() + ' min'} */}
                        {parseTime(new Date(itineraries.startTime), new Date(itineraries.endTime))}
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
                {/* <a className='btn btn-primary' data-toggle='collapse' href='/' role='button'>
                    Details
                </a> */}
        </>
    );
};

export default Timetable;
