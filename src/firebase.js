import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {

    apiKey: "AIzaSyC0_v2WUgkzxoO_Wdycm723lL3lkh_i7k0",
    authDomain: "ootp-project-aa32c.firebaseapp.com",
    projectId: "ootp-project-aa32c",
    storageBucket: "ootp-project-aa32c.appspot.com",
    messagingSenderId: "783896843146",
    appId: "1:783896843146:web:0123da29d3a51a1f15ee73",
    measurementId: "G-JMES9DVDC2"
  };
  firebase.initializeApp(firebaseConfig);

  export default firebase