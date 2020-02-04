import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    //const input = setup();
    const { getByTestId } = render(<Search />)
    const input = getByTestId('test-input') as HTMLInputElement;

    input.onchange = jest.fn();

    fireEvent.change(input, { target: { value: 'test input' }})

    expect(input.onchange).toHaveBeenCalled();
    expect(input.value).toEqual('test input');
});