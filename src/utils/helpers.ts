import { Legs } from '../api/interfaces'

export const parseTime = (start: Date, end: Date): string => {
  let msec = +new Date(end) - +new Date(start)
  const hh = Math.floor(msec / 1000 / 60 / 60)
  if(hh === 0) {
    return Math.ceil(msec / 1000 / 60) + ' min'
  }
  msec -= hh * 1000 * 60 * 60
  const mm = Math.floor(msec / 1000 / 60)
  msec -= mm * 1000 * 60
  const ss = Math.floor(msec / 1000)
  msec -= ss * 1000
  if(mm === 0) return hh + ' h'
  return hh + ' h ' + mm + ' min'
}

export const getTime = (unix: string): string => {
  const date = new Date(unix)
  const hours = date.getHours()
  const minutes = '0' + date.getMinutes()

  const formattedTime = hours + ':' + minutes.substr(-2)
  return formattedTime
}

export const switchMode = (mode: string): string => {
  switch (mode) {
  case Legs.WALK:
    return 'fa fa-ellipsis-v fa-lg mt-2 mb-2'
  case Legs.RAIL:
    return 'fa fa-grip-lines-vertical fa-lg mt-2 mb-2'
  case Legs.BUSS:
    return 'fa fa-grip-lines-vertical fa-lg mt-2 mb-2'
  default:
    return ''
  }
}

export const fakeData = {
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
}