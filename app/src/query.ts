import gql from 'graphql-tag';

export const FIND_PLAN = gql`
    query findByCoord($originLat: Float!, $originLon: Float!, $destLat: Float!, $destLon: Float!) {
        plan(from: { lat: $originLat, lon: $originLon }, to: { lat: $destLat, lon: $destLon }, numItineraries: 3) {
            from {
                lon
                lat
            }
            to {
                lon
                lat
            }
            itineraries {
                walkDistance
                duration
                startTime
                endTime
                legs {
                    mode
                    startTime
                    endTime
                    route {
                        shortName
                    }
                    from {
                        lat
                        lon
                        name
                    }
                    to {
                        lat
                        lon
                        name
                    }
                    trip {
                        gtfsId
                        pattern {
                            code
                            name
                        }
                        tripHeadsign
                    }
                    legGeometry {
                        length
                        points
                    }
                }
            }
        }
    }
`;
