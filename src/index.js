import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
    apiKey: "AIzaSyAR3uX9Xb9-1Huau-iAizXAywJhWUabJBc",
    authDomain: "pseudogram-b0a18.firebaseapp.com",
    databaseURL: "https://pseudogram-b0a18.firebaseio.com",
    projectId: "pseudogram-b0a18",
    storageBucket: "pseudogram-b0a18.appspot.com",
    messagingSenderId: "575891325350"
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
