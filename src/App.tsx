import './App.scss';

import { GeoPoint, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Map } from './components/Map';

import {
  addLocation,
  getAllLocations,
  removeAllLocations,
  removeLocation,
} from './api/firebase.services';
import { getNormilizedData, getUniqueID } from './helper';
import { Location } from './types/Location';

const App = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    getAllLocations()
      .then(markers => {
        setLocations(getNormilizedData(markers));
      })
      .catch(() => {});
  }, []);

  const handleAddMarker = (position: google.maps.LatLng | null) => {
    if (!position) {
      return;
    }

    const id = getUniqueID(locations);
    const location = new GeoPoint(position.lat(), position.lng());
    const timestamp = Timestamp.fromDate(new Date());

    addLocation(id, { location, timestamp })
      .then(() => {
        setLocations(prevLocations => [
          ...prevLocations,
          {
            id,
            location,
            timestamp,
          },
        ]);
      })
      .catch(() => {});
  };

  const handleRemoveMarker = (id: string) => {
    removeLocation(id)
      .then(() => {
        setLocations(prevLocations => prevLocations.filter(location => location.id !== id));
      })
      .catch(() => {});
  };

  const handleRemoveAllMarkers = () => {
    removeAllLocations()
      .then(() => {
        setLocations([]);
      })
      .catch(() => {});
  };

  const handleDragEnd = (newPosition: google.maps.LatLng | null, id: string) => {
    if (!newPosition) {
      return;
    }

    const location = locations.find(location => location.id === id);

    if (!location) {
      return;
    }

    location.location = new GeoPoint(newPosition.lat(), newPosition.lng());
    location.timestamp = Timestamp.fromDate(new Date());

    setLocations(prevLocations => {
      const filteredLocations = prevLocations.filter(location => location.id !== id);

      return [...filteredLocations, location];
    });
  };

  return (
    <div className='main'>
      <h1 className='main__title'>Viso front-end task</h1>

      <div className='main__map-section'>
        <Map
          locations={locations}
          onMapClick={handleAddMarker}
          onMarkerDrag={handleDragEnd}
          onMarkerRClick={handleRemoveMarker}
        />

        <div className='side main__side'>
          <div className='instructions side__instructions'>
            <h2 className='instructions__title'>How to use:</h2>

            <p className='instructions__rule'>Add a marker - left click on empty space on map</p>

            <p className='instructions__rule'>Remove marker - right click on marker</p>
          </div>

          <button
            onClick={handleRemoveAllMarkers}
            className='side__button'
          >
            Remove all markers
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
