import React from 'react';
import { render } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import { Detaile } from './index';

const fakeData = {
    origin: {
        coordinate: [60.19775, 24.94053],
        label: 'origin'
    },
    destination: {
        coordinate: [60.1884, 25.00744],
        label: 'destination'
    },
    itineraries: {
        duration: '1084',
        startTime: '1580804008000',
        endTime: '1580805234000',
        legs: [
            {
                mode: 'WALK',
                startTime: '1580804008000',
                endTime: '1580804051000',
                route: null,
                from: {
                    name: 'Origin'
                },
                to: {
                    name: 'Asemapäällikönkatu'
                },
                trip: null,
                legGeometry: {
                    points: '{jlnJydfwCSFUH?D?D@BWH'
                }
            },
            {
                mode: 'BUS',
                startTime: '1580804051000',
                endTime: '1580804658000',
                route: {
                    shortName: '50'
                },
                from: {
                    name: 'Asemapäällikönkatu'
                },
                to: {
                    name: 'Kalasatama (M)'
                },
                trip: {
                    pattern: {
                        name: '50 to Vinsentinkatu (HSL:1100140)'
                    }
                },
                legGeometry: {
                    points:
                        'ullnJmdfwClEgBr@{@Di@@aCE_H~Bo@d@IZEZFRgAJa@Rk@nBqG~A_FvBcHnAqDr@}BhCeHd@gA\\eAvBoIb@kBf@qCd@gCb@mC^iC^{Cr@aGbBaRP}CZeE\\oEReCf@qCh@kDz@oFTyCLuADoAIEgBeB[Ye@g@SUcAeA~@eGP{@Ho@F_@Lw@Ny@z@}F^_CTsAr@yEvDpAzAl@'
                }
            }
        ]
    }
};
it('render Detail without props', () => {
    const { container } = render(<Detaile />);
    expect(container.textContent).toBe('');
});

it('render Detail with props', () => {
    const { container, getByText } = render(
        <Detaile origin={fakeData.origin} destination={fakeData.destination} itineraries={fakeData.itineraries} />
    );
    expect(container.textContent).not.toBe('');
    expect(getByText('origin').firstChild).toMatchInlineSnapshot(`origin`);
    expect(getByText('destination').firstChild).toMatchInlineSnapshot(`destination`);
});
