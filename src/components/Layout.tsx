import React, { useEffect, useContext } from 'react'
import 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/images/marker-icon.png'
import polyline from '@mapbox/polyline'
import L from 'leaflet'
import { MapContext } from '../context/context'

interface Props {
    children?: React.ReactNode;
}

const Layout: React.FC<Props> = (props: Props): JSX.Element => {
  const { data } = useContext(MapContext)

  useEffect(() => {
    const map = L.map('map').setView([60.192059, 24.805831], 12)
    L.tileLayer('https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}.png', {
      attribution:
                'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 19,
      tileSize: 512,
      zoomOffset: -1,
      id: 'hsl-map'
    }).addTo(map)

    const BlueIcon = L.icon({
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
    const redIcon = L.icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
    data.markers &&
            data.markers.forEach((m, index) => {
              L.marker(m, { icon: index === 0 ? BlueIcon : redIcon }).addTo(map)

              for (let i = 0; i < data.points.length; i++) {
                const points = polyline.decode(data.points[i].replace(/\\\\/g, '\\'))
                map.flyToBounds(
                  L.polyline(points as [number, number][], {
                    color: 'blue',
                    weight: 3
                  })
                    .addTo(map)
                    .getBounds()
                )
              }
              //map.flyTo(data.markers[1], 11);
            })

    return (): void => {
      map.off()
      map.remove()
    }
  }, [data])

  return (
    <>
      <div style={{ height: '100vh', width: '100%', zIndex: 1 }} id="map" />
      <div className="container">{props.children} </div>
    </>
  )
}

export default Layout
