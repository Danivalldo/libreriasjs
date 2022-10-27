// Import and configure the Firebase SDK
//Here is is the code snippet to initialize Firebase Messaging in the Service Worker when your app is not hosted on Firebase Hosting.
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
// firebase.initializeApp({
//   apiKey: 'api-key',
//   authDomain: 'project-id.firebaseapp.com',
//   databaseURL: 'https://project-id.firebaseio.com',
//   projectId: 'project-id',
//   storageBucket: 'project-id.appspot.com',
//   messagingSenderId: 'sender-id',
//   appId: 'app-id',
//   measurementId: 'G-measurement-id',
// });

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB0de3v63rcTp6MB_q5r4IiGFhLkVYm6io",
  authDomain: "libreriasjs-pnotifications.firebaseapp.com",
  projectId: "libreriasjs-pnotifications",
  storageBucket: "libreriasjs-pnotifications.appspot.com",
  messagingSenderId: "892795652792",
  appId: "1:892795652792:web:e01b4ff96316b6bb7c024d",
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.

const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically
// and you should use data messages for custom notifications.
// For more info see:
// https://firebase.google.com/docs/cloud-messaging/concept-options
// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "_____[firebase-messaging-sw.js] Received background message cbonBackgroundMessage v.1.0.6",
//     payload
//   );

//   self.clients.matchAll({ includeUncontrolled: true }).then(function (clients) {
//     //you can see your main window client in this list.
//     clients.forEach(function (client) {
//       console.log("client", client);
//       client.postMessage(payload);
//     });
//   });
// });
