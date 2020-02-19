import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Search } from './index'
import { DataProvider } from '../context/context'

it('rende Search', () => {
  const { getByPlaceholderText } = render(
    <DataProvider>
      <Search />
    </DataProvider>
  )
  expect(getByPlaceholderText('Search...')).toBeTruthy()
})


it('change input value on input change', () => {
  const { getByTestId } = render(
    <DataProvider>
      <Search />
    </DataProvider>
  )
  const input = getByTestId('test-input') as HTMLInputElement

  expect(input.value).toBe('') // empty before

  input.onchange = jest.fn()

  fireEvent.change(input, { target: { value: 'test input' } })

  expect(input.onchange).toHaveBeenCalled()
  expect(input.value).toEqual('test input')

})