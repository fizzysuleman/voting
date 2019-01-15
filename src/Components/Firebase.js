import firebase from 'firebase';

 var config = {
    apiKey: "AIzaSyDQWMc7tn7Gjldjhr1LYfCYn6a-8vAGW_E",
    authDomain: "e-voting-2f5a4.firebaseapp.com",
    databaseURL: "https://e-voting-2f5a4.firebaseio.com",
    projectId: "e-voting-2f5a4",
    storageBucket: "e-voting-2f5a4.appspot.com",
    messagingSenderId: "57011686457"
  };

const firebaseConf = firebase.initializeApp(config);

export default firebaseConf;



