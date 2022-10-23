import PushNotification from "./PushNotification.js";

export default async function handler(request, response) {
  const pushNotification = new PushNotification();
  const result = await pushNotification.sendMessage(request.query.token, {
    notification: {
      title: "Mensajeeeee!",
      body: "With love",
    },
    data: {
      date: Date.now().toString(),
    },
  });
  response.status(200).json({
    status: result.success ? "ok" : "error",
    message: result.message,
  });
}
