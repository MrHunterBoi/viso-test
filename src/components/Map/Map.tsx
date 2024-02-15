import { GoogleMap, Marker, MarkerClusterer, useJsApiLoader } from '@react-google-maps/api';
import { Location } from '../../types/Location';
import { center, mapSize } from './vars';

interface Props {
  locations: Location[];
  onMapClick: (position: google.maps.LatLng | null) => void;
  onMarkerRClick: (id: string) => void;
  onMarkerDrag: (newPosition: google.maps.LatLng | null, id: string) => void;
}

export const Map: React.FC<Props> = ({ locations, onMapClick, onMarkerRClick, onMarkerDrag }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapSize}
      onClick={event => onMapClick(event.latLng)}
      center={center}
      zoom={15}
    >
      <MarkerClusterer>
        {clusterer => (
          <>
            {locations.map(location => (
              <Marker
                draggable={true}
                position={{ lat: location.location.latitude, lng: location.location.longitude }}
                key={location.id}
                onDragEnd={event => onMarkerDrag(event.latLng, location.id)}
                onRightClick={() => onMarkerRClick(location.id)}
                label={location.id.toString()}
                clusterer={clusterer}
              />
            ))}
          </>
        )}
      </MarkerClusterer>
    </GoogleMap>
  ) : (
    <></>
  );
};
