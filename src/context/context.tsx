import React, { createContext, useReducer, ReactNode } from 'react';
import reducer, { initialState } from '../reducer/reducer';



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MapContext = createContext({} as any)

interface Props {
    children?: ReactNode
}

const Provider = ({ children }: Props): JSX.Element => {
    const [data, dataDispatch] = useReducer(reducer, initialState);

    const values = {
        data,
        dataDispatch
    }
    return(
        <MapContext.Provider value={values} >
            {children}
        </MapContext.Provider>
    )
}

export default Provider;