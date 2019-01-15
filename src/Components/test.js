var firebase=require('firebase')
var config = {
    apiKey: "AIzaSyDQWMc7tn7Gjldjhr1LYfCYn6a-8vAGW_E",
    authDomain: "e-voting-2f5a4.firebaseapp.com",
    databaseURL: "https://e-voting-2f5a4.firebaseio.com",
    projectId: "e-voting-2f5a4",
    storageBucket: "e-voting-2f5a4.appspot.com",
    messagingSenderId: "57011686457"
  };

const firebaseConf = firebase.initializeApp(config);

const ref = firebaseConf.ref("aspirants");
                ref.orderByKey().on("child_added", function(snapshot) {
  console.log(snapshot.key);
});

