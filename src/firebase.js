import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCqMwqAzkKXf6IEK_77_9kHc24kQfwnvyU",
  authDomain: "album-53e9b.firebaseapp.com",
  databaseURL: "https://album-53e9b.firebaseio.com",
  projectId: "album-53e9b",
  storageBucket: "album-53e9b.appspot.com",
  messagingSenderId: "33083043655",
  appId: "1:33083043655:web:22651429d4b3c29ee0a662"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const storage = firebase.storage();

export function snapshotToArray(snapshot) {
  const updatedArray = [];
  snapshot.forEach(s => {
    const data = s.data();
    data.id = s.id;
    updatedArray.push(data);
  });
  return updatedArray;
}
