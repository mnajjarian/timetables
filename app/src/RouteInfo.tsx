import React from 'react';
import { Query } from 'react-apollo';
import { Data } from './api/route';
import Timetable from './Timetable';
import { FIND_PLAN } from './query';
import { LatLngExpression } from 'leaflet';

interface Props {
    origin: {
    coordinate: LatLngExpression;
    }
    destination: {
        coordinate: LatLngExpression;
    }
}

const RouteInfo: React.FC<Props> = (props: Props) => {
    const [originLat, originLon] = props.origin.coordinate;
    const [destLat, destLon] = props.destination.coordinate;
    if (!originLat && !destLat) {
        return <div></div>;
    }

    return (
        <Query<Data> query={FIND_PLAN} variables={{ originLat, originLon, destLat, destLon }}>
            {({ loading, error, data }): JSX.Element => {
                if (loading) return <div className='spinner-border m-5' role='status' ></div>;
                if (error) return <div>Error...</div>;
                return (
                    <div style={{ zIndex: 9999, backgroundColor: '#ddd'}} >
                        {data?.plan.itineraries.map(it => (
                            <ul className="list-group">
                                <Timetable key={it.duration} itineraries={it} plan={data?.plan}  />
                            </ul>
                        ))}
                    </div>
                );
            }}
        </Query>
    );
};

export default RouteInfo;
