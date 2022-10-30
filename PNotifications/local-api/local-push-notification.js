import CustomEnv from "custom-env";

CustomEnv.env("local");

import PushNotification from "../api/PushNotification.js";

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
        click_action: "https://localhost:5173",
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
