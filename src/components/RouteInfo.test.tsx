import React from 'react'
import { render, cleanup, wait } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import { FIND_PLAN } from '../query'
import RouteInfo from './RouteInfo'
import { fakeData } from '../utils/helpers'

const origin = {
  label: 'kammpi',
  coordinate: [60.166774, 24.55581]
}
const destination = {
  label: 'Pohjoinen Rautatiekatu 25, Helsinki',
  coordinate: [60.169407, 24.926007]
}
const [originLat, originLon] = origin.coordinate
const [destLat, destLon] = destination.coordinate
const mocks = [
  {
    request: {
      query: FIND_PLAN,
      variables: { originLat, originLon, destLat, destLon },
      result: {
        data: fakeData
      }
    }
  }
]

describe('Testing RouteInfo', () => {
  afterEach(cleanup)

  it('renders without error', async () => {

    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false} >
        <RouteInfo origin={origin} destination={destination} />
      </MockedProvider>
    )
    wait()
    const spinner = container.getElementsByClassName('spinner-border m-5')
    expect(spinner).toBeTruthy()
  })
})