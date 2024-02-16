import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { Location } from '../types/Location';
import { db } from './firebase';

const DB_NAME = import.meta.env.VITE_FIREBASE_DB_NAME;

export const getAllLocations = () => {
  return getDocs(collection(db, DB_NAME));
};

export const addLocation = (id: string, locationData: Omit<Location, 'id'>) => {
  return setDoc(doc(db, DB_NAME, id), locationData);
};

export const removeLocation = (id: string) => {
  return deleteDoc(doc(db, DB_NAME, id));
};

export const updateLocation = (id: string, newData: Omit<Location, 'id'>) => {
  return updateDoc(doc(db, DB_NAME, id), { ...newData });
};

export const removeAllLocations = async () => {
  try {
    const markers = await getAllLocations();

    markers.forEach(async marker => {
      await deleteDoc(doc(db, DB_NAME, marker.id));
    });
  } catch {
    throw new Error('Error');
  }
};
