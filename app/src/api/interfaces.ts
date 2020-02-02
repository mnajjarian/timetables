

export interface Variable {
  originLat: number
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
  from: Coord
  to: Coord
  trip: Trip
  route: {
    shortName?: string
  },
  legGeometry: {
    points: string
  }
}
export interface Coord {
  lat: string
  lon: string
  name: string
}

interface Trip {
  pattern: {
    code: string
    name: string
  }
}

// enums //

export enum Legs {
  BUSS = 'BUS',
  WALK = 'WALK',
  RAIL = 'RAIL'
}
