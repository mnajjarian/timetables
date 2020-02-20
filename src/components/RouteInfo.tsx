import React from 'react'
import { Query } from 'react-apollo'
import { Data, Variable, Coord } from '../api/interfaces'
import { Timetable } from './index'
import { FIND_PLAN } from '../query'

interface Props {
    origin: Coord
    destination: Coord
}

const RouteInfo: React.FC<Props> = (props: Props) => {
  const{ origin, destination } = props

  const [originLat, originLon] = origin.coordinate
  const [destLat, destLon] = destination.coordinate

  if (!originLat && !destLat) {
    return <div></div>
  }

  return (
    <Query<Data, Variable> query={FIND_PLAN} variables={{ originLat, originLon, destLat, destLon }}>
      {({ loading, error, data }): JSX.Element => {
        if (loading) return <div className="spinner-border m-5" role="status"></div>
        if (error) return <div>{error.name}</div>
        return (
          <div className='route-list bg-info' >
            {data?.plan.itineraries.map(it => (
              <ul key={it.duration} className="list-group">
                <Timetable key={it.duration} itineraries={it} plan={data?.plan} origin={origin} destination={destination} />
              </ul>
            ))}
          </div>
        )
      }}
    </Query>
  )
}

export default RouteInfo
