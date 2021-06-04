import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Place from './Place'
import { Feature } from '../api/interfaces'

const feature: Feature = {
  properties: {
    id: '1',
    name: 'kammpi',
    label: 'kammpi'
  },
  geometry: {
    coordinates: []
  }
}


describe('Place component', () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClick = (coord, label) => jest.fn()

  it('should show the right label and be clickable', () => {
    const { container, getByText } = render(
      <Place feature={feature} handleClick={handleClick(feature.geometry.coordinates, feature.properties.label)} />
    )
    const btn = getByText('kammpi')

    expect(container.textContent).toBe('kammpi')
    expect(fireEvent.click(btn)).toBeTruthy()
  })
})