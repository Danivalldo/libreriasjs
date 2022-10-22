import CustomEnv from "custom-env";

CustomEnv.env("local");

import PushNotification from "./PushNotification.js";

const pushNotification = new PushNotification();
pushNotification.sendMessage(
  "fbPgibbg3WkVGhMShclY0Q:APA91bGQisxfKUzZQd5jtxBcQt0ZjERugQ2m4Cm9Su_ca01dxT_iS_HOfBycwTuCeHLkRg9qiT8O6dG2Ppq0SOjyUeQwYQp6t6n0DYI8JmyUJZl3hN3vvoajttKWkN7p-nhYVLRB582r",
  {
    notification: {
      title: "Arigato!",
      body: "Las botas!",
    },
    data: {
      name: "dime tu name",
      age: "y edadddd",
    },
  }
);

// console.log(pushNotification);
