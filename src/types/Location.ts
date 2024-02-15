import { GeoPoint, Timestamp } from 'firebase/firestore';

export interface Location {
  id: string;
  location: GeoPoint;
  timestamp: Timestamp;
}
