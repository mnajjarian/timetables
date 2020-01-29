import { LatLngExpression } from "leaflet";

export enum Types {
    ADD_POINT = 'ADD_POINT',
    ADD_MARKER ='ADD_MARKER'
}

export interface DataState {
    markers: LatLngExpression[],
    points: string[]
}
export const initialState: DataState = {
    markers: [],
    points: []
}

export type DataAction =
    | { type: 'ADD_POINT', payload: { points: string[], markers: LatLngExpression[]} }

const reducer = (state = initialState, action: DataAction): DataState => {
    console.log(action)
    switch (action.type) {
        case Types.ADD_POINT:
            return {...state, points:  action.payload.points, markers: action.payload.markers };
        default:
            return state;
    }
}

export default reducer