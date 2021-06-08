import React from 'react'
import { render } from '@testing-library/react'
import { Detail } from './index'
import { fakeData } from '../utils/helpers'

describe('Testing Detail', () => {
  it('render Detail without props', () => {
    const { container } = render(<Detail />)
    expect(container.textContent).toBe('')
  })

  it('render Detail with props', () => {
    const { container, getByText } = render(
      <Detail origin={fakeData.origin} destination={fakeData.destination} itineraries={fakeData.itineraries} />
    )
    expect(container.textContent).not.toBe('')
    expect(getByText('origin').firstChild).toMatchInlineSnapshot('origin')
    expect(getByText('destination').firstChild).toMatchInlineSnapshot('destination')
  })
})
