import { LatLngExpression } from 'leaflet'

export enum Types {
    ADD_POINT = 'ADD_POINT',
    ADD_MARKER ='ADD_MARKER',
    REMOVE_MAP = 'REMOVE_MAP',
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
    | { type: 'REMOVE_MAP' }

const reducer = (state = initialState, action: DataAction): DataState => {
  switch (action.type) {
  case Types.ADD_POINT:
    return { ...state, points:  action.payload.points, markers: action.payload.markers }
  case Types.REMOVE_MAP:
    return { ...state, points: [], markers: [] }
  default:
    return state
  }
}

export default reducer