
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: -6.1484511,
    lng: 106.697525
  };

export default function Map(){
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBSGWwJ1H2sdpp0TKUIFyoY3vW10G2eiLs"
      })
      const [map, setMap] = useState(null)

      const onLoad = useCallback(function callback(map){
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
      }, [])

      const onUnmount = useCallback(function callback(map) {
        setMap(null)
      }, [])

      return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker
          key={1}
          position={center}
           />
          <></>
        </GoogleMap>
    ) : <></>
}