import React from 'react'
import { render } from '@testing-library/react'
import Timetable from './Timetable'
import { fakeData } from '../utils/helpers'

describe('Testing Timetable', () => {

  it('Should render page properly', () => {
    const { getAllByText } = render(
      <Timetable
        itineraries={fakeData.itineraries}
        destination={fakeData.destination}
        origin={fakeData.origin}
      />
    )
    const origin = getAllByText(fakeData.itineraries.legs[0].to.name)
    expect(origin[0].textContent).toBe('Asemapäällikönkatu')
  })
})