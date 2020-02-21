import React from 'react'
import { render } from '@testing-library/react'
import Layout from './Layout'
import DataProvider from '../context/context'

describe('Testing Layout', () => {

  it('Should render map correctly', () => {
    const { container } = render(
      <DataProvider>
        <Layout />
      </DataProvider>
    )

    expect(container.getElementsByClassName('map')).toBeTruthy()
  })
})