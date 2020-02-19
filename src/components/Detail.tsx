import React from 'react'
import { getTime, parseTime, switchMode } from '../utils/helpers'
import { Itinerary, Coord } from '../api/interfaces'

interface Props {
    origin?: Coord;
    destination?: Coord;
    itineraries?: Itinerary;
}
export const Detail = (props: Props): JSX.Element => {
  const { itineraries, origin, destination } = props

  if (!itineraries || !origin || !destination) {
    return <div></div>
  }
  return (
    <div className="container">
      {itineraries.legs.map((leg, index) => (
        <div key={index} className="row">
          <div className="col-sm-5">
            <div data-testid="originId">{index === 0 ? origin.label?.split(',')[0] : leg.from.name}</div>
            {index === itineraries.legs.length - 1 && (
              <div data-testid="destinationId" className="pt-4">
                {destination.label?.split(',')[0]}
              </div>
            )}
          </div>
          <div className="col-sm-1 text-center p-0">
            <div className="justify-content-center align-items-center">
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
          <div className="details-item col-sm-6 p-0">
            <span> {getTime(leg.startTime)} </span>
            <span className="ml-4">
              {leg.mode === 'WALK'
                ? 'Walking '
                : leg.mode === 'BUS'
                  ? 'Take the bus ' + leg.trip?.pattern.name.split('(')[0]
                  : 'Take the Train ' + leg.trip?.pattern.name.split('(')[0]}
            </span>
            <span>
              {parseTime(new Date(leg.startTime), new Date(leg.endTime))}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Detail
