import React, { useState, FC } from 'react'
import { RouteInfo } from './index'
import { Coordinate } from '../api/interfaces'


interface Props {
    origin: Coordinate;
}

const Journey: FC<Props> = (props: Props): JSX.Element => {
  const [toggle, setToggle] = useState(false)
  const [showRoute, setShowRoute] = useState(false)

  const goToDirection = (): void => setShowRoute(!showRoute)

  const {
    origin: { label, coordinate }, origin
  } = props

  const destination: Coordinate = {
    label: 'Pohjoinen Rautatiekatu 25, Helsinki',
    coordinate: [60.169407, 24.926007]
  }
  const handleSwitch = (): void => {
    setToggle(!toggle)
  }

  if (!label) {
    return <div></div>
  }
  return (
    <div className="card">
      <div className="card-body">
        <div className="alert alert-primary m-0">{toggle ? destination.label : label}</div>
        <div className="card-points">
          <span className="fa fa-random fa-lg p-2" data-testid="test-button" role="button" onClick={handleSwitch}></span>
        </div>
        <div className="alert alert-danger">{!toggle ? destination.label : label}</div>
        <div className='card-points' >
          <button className='btn btn-primary ml-auto'>
            <span className="fa fa-directions fa-lg " onClick={goToDirection}></span>
          </button>
        </div>
      </div>

      {showRoute && coordinate && destination.coordinate && (
        <RouteInfo
          origin={ !toggle ? origin : destination }
          destination={!toggle ? destination : origin}
        />
      )}
    </div>
  )
}

export default Journey
