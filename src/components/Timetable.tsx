import React, { useState, useContext } from 'react'
import { Itinerary, Leg, Plan, Legs, Coordinate } from '../api/interfaces'
import { MapContext } from '../context/context'
import { Types } from '../reducer/reducer'
import { parseTime, getTime } from '../utils/helpers'
import { Detaile } from './index'

interface TimetableProps {
    itineraries: Itinerary;
    plan?: Plan;
    origin: Coordinate;
    destination: Coordinate;
}

const switchIcon = (leg: Leg): JSX.Element | undefined => {
  switch (leg.mode) {
  case Legs.BUSS:
    return (
      <span className="badge badge-primary p-1">
        <span className="fa fa-bus-alt mr-1"></span>
        <span>{leg.route?.shortName}</span>
      </span>
    )
  case Legs.WALK:
    return <span className="fa fa-walking"></span>
  case Legs.RAIL:
    return (
      <span className="badge badge-info p-1">
        <span className="fa fa-subway mr-1"></span>
        <span>{leg.route?.shortName}</span>
      </span>
    )
  default:
    break
  }
}

const Timetable: React.FC<TimetableProps> = (props: TimetableProps): JSX.Element => {
  const [showRoute, setShowRoute] = useState(false)
  const { dataDispatch } = useContext(MapContext)

  const { itineraries, plan, origin, destination } = props
  const handleRoute = (): void => {
    const points = itineraries.legs.map(leg => leg.legGeometry.points)
    setShowRoute(!showRoute)
    if(!showRoute) {
      dataDispatch({
        type: Types.ADD_POINT,
        payload: {
          points,
          markers: [
            [plan?.from.lat, plan?.from.lon],
            [plan?.to.lat, plan?.to.lon]
          ]
        }
      })
    }
  }
  return (
    <>
      <li className="route-table list-group-item ">
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
        <a className="btn" data-toggle="collapse" href={'#ID' + itineraries.duration} role="button" onClick={handleRoute}>
          {!showRoute ? 'more' : 'less'}
        </a>
      </li>
      <div className='collapse' id={'ID'+itineraries.duration}>
        <Detaile itineraries={itineraries} origin={origin} destination={destination} />
      </div>
    </>
  )
}

export default Timetable
