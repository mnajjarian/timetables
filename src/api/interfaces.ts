import { LatLngExpression, LatLng } from 'leaflet'


export interface Variable {
  originLat: any
  originLon: number
  destLat: number
  destLon: number
}
export interface Data {
  plan: Plan
}

export interface Plan {
  itineraries: Itinerary[]
  from: {
    lon: number
    lat: number
  }
  to: {
    lon: number
    lat: number
  }
}
export interface Itinerary {
  legs: Leg[]
  duration: string
  startTime: string
  endTime: string
}

export interface Geometry {
  coordinates: [];
}


export interface Feature {
  properties: Property;
  geometry: Geometry;
}
export interface Property {
  id: string;
  name: string;
  label: string;
}

export interface Leg {
  mode: string
  startTime: string
  endTime: string
  from: Spot
  to: Spot
  trip: Trip | null
  route: {
    shortName?: string
  } | null,
  legGeometry: {
    points: string
  }
}

export interface Spot {
  name: string
}
export interface Coordinate {
  label?: string;
  coordinate?: LatLngExpression | LatLng | number[];
}

interface Trip {
  pattern: {
    name: string
  }
}

// enums //

export enum Legs {
  BUSS = 'BUS',
  WALK = 'WALK',
  RAIL = 'RAIL'
}
