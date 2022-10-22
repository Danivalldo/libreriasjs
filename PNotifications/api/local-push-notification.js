import CustomEnv from "custom-env";

CustomEnv.env("local");

import PushNotification from "./PushNotification.js";

//app token: fHmxjiYnT5aJN0va1jCJZC:APA91bEepoixm3_9Xr76hGvhN1Mrcvtt2JsiL7gTThR9VpZY2wppLulQJ8-yzblP8H8D5GyCgaIPrbZO-8WEQ94F2El0aooOZ53wARcPOgYSsnOtVo1g8Joij5Y-KR7Qg4VNXfwySJ2Q

//otro token fjPkF5W8Z8cElS_LBCx4XP:APA91bFdsOomlhfaDCekf1XuvDn4_Nhn1i9YPW-8lg9SYp6tO7G_tpoz7pgtydZZKPalqgQ_Zjw52XSLMNTlmHbPXLW7SqEs4NEvSfbYt7u1fwzweYQLMF3MHw84YNXyXQY_PucVGbGH

const pushNotification = new PushNotification();
pushNotification.sendMessage(
  "fHmxjiYnT5aJN0va1jCJZC:APA91bEepoixm3_9Xr76hGvhN1Mrcvtt2JsiL7gTThR9VpZY2wppLulQJ8-yzblP8H8D5GyCgaIPrbZO-8WEQ94F2El0aooOZ53wARcPOgYSsnOtVo1g8Joij5Y-KR7Qg4VNXfwySJ2Q",
  {
    notification: {
      title: "Nueva entrada!",
      body: "Una nueva entrada del blog acaba de ser publicada",
    },
    data: {
      title: "Japón - Dia 4",
      subtitle: "Koyasan",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste dolorum quae, reiciendis praesentium maiores ducimus...",
      snap: "https://i.picsum.photos/id/243/900/600.jpg?hmac=jYs4-Mu2PLLZiCM0aEVapBX3hj-sZLiJ7HZFr70n5kY",
    },
  }
);

// console.log(pushNotification);
