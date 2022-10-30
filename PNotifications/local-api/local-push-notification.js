import CustomEnv from "custom-env";

CustomEnv.env("local");

import PushNotification from "../api/PushNotification.js";

//app token: fHmxjiYnT5aJN0va1jCJZC:APA91bEepoixm3_9Xr76hGvhN1Mrcvtt2JsiL7gTThR9VpZY2wppLulQJ8-yzblP8H8D5GyCgaIPrbZO-8WEQ94F2El0aooOZ53wARcPOgYSsnOtVo1g8Joij5Y-KR7Qg4VNXfwySJ2Q

//otro token fjPkF5W8Z8cElS_LBCx4XP:APA91bFdsOomlhfaDCekf1XuvDn4_Nhn1i9YPW-8lg9SYp6tO7G_tpoz7pgtydZZKPalqgQ_Zjw52XSLMNTlmHbPXLW7SqEs4NEvSfbYt7u1fwzweYQLMF3MHw84YNXyXQY_PucVGbGH

//local web fFajlWh2ItYVxwvQ8oq8UB:APA91bGBPKCSxqDQPq0zK6jSAs7qjQzo646fIJTyS-fzYPwT3IhP9Txfp4Y50eM_K6DlH1UudgGiJPW1Ao06dwIfF3nT9Jf4P0Sd4dux96NuelhzSKAOJnmJFshXHuu-M7bDdnEbDz3_

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
        // click_action: "https://pn-otifications.vercel.app", //https://127.0.0.1:5173/
        click_action: "http://localhost:5173/",
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

// console.log(pushNotification);
