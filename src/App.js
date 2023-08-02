import React, { useState } from "react";
import { GoogleApiWrapper, Marker, Map, InfoWindow } from "google-maps-react";

const locations = [
  {
    locationName: "@Sample Location",
    latitude: 13.251932,
    longitude: 80.240927,
    phoneNumber: "+91 99999 99999",
    availableHour: "8:00 AM - 8:00 PM",
  },
];

const LocationMap = (props) => {
  const [availableMarker, setAvailableMarker] = useState(null);
  const [selectPlace, setSelectPlace] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const onMarkerClick = (props, marker, event) => {
    setAvailableMarker(marker);
    setSelectPlace(props.location);
    setShowInfoWindow(true);
  };
  const onClose = () => {
    setAvailableMarker(null);
    setSelectPlace(null);
    setShowInfoWindow(false);
  };

  return (
    <div className="map-container">
      <Map
        google={props.google}
        zoom={10}
        style={{ width: "100%", height: "100%" }}
        initialCenter={{ lat: 13.251932, lng: 80.240927 }}
      >
        {locations.slice(0, 10).map((location, index) => (
          <Marker
            key={index}
            position={{
              lat: location.latitude,
              lng: location.longitude,
            }}
            title={location.locationName}
            location={location}
            onClick={onMarkerClick}
          />
        ))}
        {selectPlace && (
          <InfoWindow
            marker={availableMarker}
            visible={showInfoWindow}
            onClose={onClose}
          >
            <div>
              <h3>{selectPlace.locationName}</h3>
              <p>Available Hours: {selectPlace.availableHour}</p>
              <p>Phone Number:{selectPlace.phoneNumber}</p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "<API-Key>",
})(LocationMap);
