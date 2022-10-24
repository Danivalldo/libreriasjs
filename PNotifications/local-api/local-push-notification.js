import CustomEnv from "custom-env";

CustomEnv.env("local");

import PushNotification from "../api/PushNotification.js";

//app token: fHmxjiYnT5aJN0va1jCJZC:APA91bEepoixm3_9Xr76hGvhN1Mrcvtt2JsiL7gTThR9VpZY2wppLulQJ8-yzblP8H8D5GyCgaIPrbZO-8WEQ94F2El0aooOZ53wARcPOgYSsnOtVo1g8Joij5Y-KR7Qg4VNXfwySJ2Q

//otro token fjPkF5W8Z8cElS_LBCx4XP:APA91bFdsOomlhfaDCekf1XuvDn4_Nhn1i9YPW-8lg9SYp6tO7G_tpoz7pgtydZZKPalqgQ_Zjw52XSLMNTlmHbPXLW7SqEs4NEvSfbYt7u1fwzweYQLMF3MHw84YNXyXQY_PucVGbGH

//local web fFajlWh2ItYVxwvQ8oq8UB:APA91bGBPKCSxqDQPq0zK6jSAs7qjQzo646fIJTyS-fzYPwT3IhP9Txfp4Y50eM_K6DlH1UudgGiJPW1Ao06dwIfF3nT9Jf4P0Sd4dux96NuelhzSKAOJnmJFshXHuu-M7bDdnEbDz3_

const pushNotification = new PushNotification();
pushNotification.sendMessage(
  "e6YF2B_sq6ow8Nr6dHoGZ6:APA91bETsWJc0YJHzg0YrH7dxVTOK_l8xi4vKc9PIIXgZWd9x-VSX_INojw-WH0QkZvGksuF80bAf0DxQOEdnuFbafUhT018SOktILQA9Iw1dlK_F8i0wLZdi-hTGBfCNKc74ZFXNJUS",
  {
    notification: {
      title: "Nueva entrada!",
      body: "Una nueva entrada del blog acaba de ser publicada",
    },
    webpush: {
      notification: {
        title: "Nueva entrada!",
        body: "Una nueva entrada del blog acaba de ser publicada",
        click_action: "https://pn-otifications.vercel.app", //https://127.0.0.1:5173/
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
