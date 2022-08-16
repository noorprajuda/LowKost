import BoardingHousesList from "../components/BoardingHousesList";

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function GoogleMapSearchPage() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBSGWwJ1H2sdpp0TKUIFyoY3vW10G2eiLs",
  });

  const { id } = useParams();

  console.log(id);
  const [localBoardingHouse, setLocalBoardingHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMarker, setActiveMarker] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:4000/user/boardinghouses", {
        params: { city: id },
      })
      .then((resp) => {
        setLocalBoardingHouses(resp.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  if (loading) {
    return (
      <>
        <div className="mt-20 flex flex-row">Loading...</div>
      </>
    );
  }
  console.log(localBoardingHouse);
  const markers = localBoardingHouse.map((el, i) => {
    return {
      id: i + 1,
      name: el.name,
      price: el.price,
      position: {
        lat: el.location.coordinates[0],
        lng: el.location.coordinates[1],
      },
    };
  });
  console.log(markers, "<<<<<<,,");
  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  return isLoaded && !loading ? (
    <>
      <div className="mt-20 flex flex-row">
        <div className="sticky top-20 mb-20 basis-1/2 h-screen ">
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={16}
            onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
          >
            {markers.map(({ id, name, position, price }) => (
              <Marker
                key={id}
                position={position}
                onClick={() => handleActiveMarker(id)}
              >
                {activeMarker === id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div>{name}</div>
                    <div>{price}</div>
                  </InfoWindow>
                ) : null}
              </Marker>
            ))}
          </GoogleMap>
        </div>
        <div className="basis-1/2">
          <h1 className="font-bold">
            Daftar kos di {localBoardingHouse[0].City.name}
          </h1>
          {/* {JSON.stringify(localBoardingHouse, null, 2)} */}
          <div className="mb-20">
            {localBoardingHouse.map((boardingHouse, index) => {
              return (
                <>
                  <BoardingHousesList
                    key={boardingHouse.id}
                    boardingHouse={boardingHouse}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="mt-20 flex flex-row">Loading...</div>
    </>
  );
}
