import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'
import { NotificationManager } from "react-notifications";

const config = {
  apiKey: "AIzaSyASwrXSjMjaCCOB2-063BSmzq8N83EfXkc",
  authDomain: "sneaker-landingpage.firebaseapp.com",
  databaseURL: "https://sneaker-landingpage.firebaseio.com",
  projectId: "sneaker-landingpage",
  storageBucket: "sneaker-landingpage.appspot.com",
  messagingSenderId: "109336421744",
  appId: "1:109336421744:web:31e3e3580f173816711bb5"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      NotificationManager.error(error.message)
    }
  }

  return userRef;
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase