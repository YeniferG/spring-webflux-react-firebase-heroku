import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
    apiKey: "AIzaSyBAxX4iehzXerzfUuzk4xx-wiY_AYKrWFo",
    authDomain: "questions-answers-app-4bd96.firebaseapp.com",
    projectId: "questions-answers-app-4bd96",
    storageBucket: "questions-answers-app-4bd96.appspot.com",
    messagingSenderId: "90849278077",
    appId: "1:90849278077:web:6ba5d58ebd9b67d2b61914",
    measurementId: "G-XVK9MP42QJ"
});

export const auth = firebase.auth();

export function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

export function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

export function logoutu() {
    return auth.signOut();
}

export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
};