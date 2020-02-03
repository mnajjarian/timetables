import React from 'react';
import { getTime, parseTime, switchMode } from '../utils';
import { Itinerary, Coord } from '../api/interfaces';

interface Props {
    origin: Coord;
    destination: Coord;
    itineraries: Itinerary
}
export const Detailes = (props: Props): JSX.Element => {
    const { itineraries, origin, destination } = props;
    return (
        <div className="container m-2">
            {itineraries.legs.map((leg, index) => (
                    <div key={index} className="row">
                        <div className="col-md-3">
                            <div className="row">
                                <span>{index === 0 ? origin.label?.split(',')[0] : leg.from.name}</span>
                            </div>
                            <div className="row">
                                {index === itineraries.legs.length - 1 && <span className='align-self-flex-end' >{destination.label?.split(',')[0]}</span>}
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