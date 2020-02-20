import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Journey from './Journey'

describe('Tesing Journey', () => {
  const origin = {
    label: 'kammpi',
    coordinate: [24, 62]
  }



  it('Should render the label for origin', () => {
    const { getByText } = render(
      <Journey origin={origin} />
    )
    expect(getByText('kammpi').textContent).toBe('kammpi')
  })

  it('Switch button Should be clickable', () => {
    const { getByTestId } = render(
      <Journey origin={origin} />
    )
    const btn = getByTestId('test-button')

    expect(fireEvent.click(btn)).toBeTruthy()
  })
})