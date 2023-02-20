import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
    // apiKey: (process.env.API_KEY),
    apiKey: "AIzaSyAU_CrVyZDQ0OgipvMiKY8RPRHfpIla-gU",
    authDomain: process.env.AUTH_DOMAIN,
    // projectId: process.env.PROJECT_ID,
    projectId: "reactinsta-ec4dc",
    // storageBucket: process.env.STORAGE_BUCKET,
    storageBucket: "reactinsta-ec4dc.appspot.com",
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    // messagingSenderId: "293639597483",
    appId: process.env.APP_ID,
    // appId: "1:293639597483:web:6525bb828436e7320c36ee"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };