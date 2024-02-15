import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { Location } from './types/Location';

export const getNormilizedData = (markers: QuerySnapshot<DocumentData, DocumentData>) => {
  const normalizedData: Location[] = [];

  markers.forEach(marker => {
    const { location, timestamp } = marker.data();

    normalizedData.push({
      id: marker.id,
      location,
      timestamp,
    });
  });

  return normalizedData;
};

export const getUniqueID = (locations: Location[]) => {
  let id = 1;

  while (locations.find(location => location.id === id.toString())) {
    id++;
  }

  return id.toString();
};
