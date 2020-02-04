import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import axiosMock from 'axios';
import { Search } from './index';

it('rende Search', () => {
    const { container, getByPlaceholderText } = render(<Search />)
    expect(getByPlaceholderText('Search...')).toBeTruthy();
})

const setup = () => {
    const { container } = render(<Search />)
    const input = container.querySelector('input') as HTMLInputElement;
    return {
        input,
        ...container
    }
}
it('change input value on input change', () => {
    const { getByTestId } = render(<Search />)
    const input = getByTestId('test-input') as HTMLInputElement;

    expect(input.value).toBe('') // empty before

    input.onchange = jest.fn();

    fireEvent.change(input, { target: { value: 'test input' }})

    expect(input.onchange).toHaveBeenCalled();
    expect(input.value).toEqual('test input');

});