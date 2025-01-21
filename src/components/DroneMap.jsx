/* eslint-disable react/prop-types */
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import DroneIcon from '../assets/drone.svg';

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};

const defaultCenter = { lat: 0, lng: 0 };

const markerIcon = {
  url: DroneIcon,
  scaledSize: { width: 32, height: 32 },
};

const DroneMap = ({ coordinates, currentIndex }) => {
  const center = coordinates.length > 0 ? coordinates[0] : defaultCenter;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={4}>
      {coordinates.length > 0 && (
        <>
          {/* Completed path */}
          <Polyline
            path={coordinates.slice(0, currentIndex + 1)}
            options={{
              strokeColor: '#ff0000',
              strokeOpacity: 1,
              strokeWeight: 3,
            }}
          />
          {/* Remaining path */}
          <Polyline
            path={coordinates.slice(currentIndex)}
            options={{
              strokeColor: '#94A3B8',
              strokeOpacity: 0.5,
              strokeWeight: 2,
            }}
          />
          {/* Drone marker */}
          {currentIndex < coordinates.length && (
            <Marker
              position={coordinates[currentIndex]}
              icon={markerIcon}
              animation={window.google.maps.Animation.BOUNCE}
            />
          )}
        </>
      )}
    </GoogleMap>
  );
};

export default DroneMap;
