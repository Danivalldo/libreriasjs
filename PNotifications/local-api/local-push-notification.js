import CustomEnv from "custom-env";

CustomEnv.env("local");

import PushNotification from "../api/PushNotification.js";

const pushNotification = new PushNotification();
pushNotification.sendMessage(
  "e3upxpy21uP0JmpZTCQ5D-:APA91bEnUxkvet2IwKK5NcKIygVdNacgD2REra8X4Jl3hTclPUvtbyXaUTCzrWVw7sMTe4ZMLGochdFPI5hj31hZSLUcE_5VGk3WCNLqCrH1T4kakCw870rkD3NBqVQnKdfj-3e4DDKF",
  {
    notification: {
      title: "Nueva entrada!",
      body: "Una nueva entrada del blog acaba de ser publicada",
    },
    webpush: {
      notification: {
        title: "Nueva entrada!",
        body: "Una nueva entrada del blog acaba de ser publicada",
        click_action: "https://localhost:5173/",
      },
    },
    data: {
      title: "Japón - Dia 4",
      subtitle: "Koyasan",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste dolorum quae, reiciendis praesentium maiores ducimus...",
      snap: "https://picsum.photos/1000/350",
    },
  }
);
