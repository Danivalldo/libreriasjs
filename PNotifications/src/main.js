import "./style.sass";
import FirebaseCtrl from "./services/FirebaseCtrl";
import { Capacitor } from "@capacitor/core";

const fireBaseCtrl = new FirebaseCtrl();
const cardsContainer = document.querySelector(".content");
const tokenContainer = document.querySelector("#token-container");
const requestPermissionContainer = document.querySelector(
  ".request-permission-container"
);

fireBaseCtrl.initApp();

fireBaseCtrl.onError((errorMessage) => {
  requestPermissionContainer.classList.remove("hidden");
  tokenContainer.classList.remove("ready");
  tokenContainer.classList.add("active", "error");
  tokenContainer.innerHTML = errorMessage;
});

fireBaseCtrl.onGetToken((token) => {
  requestPermissionContainer.classList.add("hidden");
  tokenContainer.classList.remove("error");
  tokenContainer.classList.add("active", "ready");
  tokenContainer.innerHTML = token;
});

const createCard = (notificationData) => {
  const dataCard = {
    title: "Título",
    snap: "https://picsum.photos/1000/350",
    subtitle: "Subtítulo",
    excerpt: "Lorem ipsum dolor sit amet",
    ...notificationData,
  };
  const a = document.createElement("a");
  a.classList.add("blog-post", "appear");
  a.setAttribute("href", "#");
  a.innerHTML = `
  <img src="${dataCard.snap}" alt="" />
  <div class="post-content">
    <div class="title-wrapper">
      <h2>${dataCard.title}</h2>
      <h3>${dataCard.subtitle}</h3>
    </div>
    <p class="content-excerpt">
      ${dataCard.excerpt}
    </p>
  </div>`;
  return a;
};

fireBaseCtrl.onRecieveNotification((notificationData) => {
  const element = createCard(notificationData.data);
  cardsContainer.prepend(element);
  window.setTimeout(() => {
    element.classList.remove("appear");
  }, 500);
});

requestPermissionContainer
  .querySelector(".request-permission-btn")
  .addEventListener("click", async (event) => {
    const loader = requestPermissionContainer.querySelector(".loader");
    const label = requestPermissionContainer.querySelector(".label-btn");
    label.classList.add("hidden");
    loader.classList.remove("hidden");

    if (Capacitor.isNativePlatform()) {
      await fireBaseCtrl.enableMobileNotifications();
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.log("No se ha aceptado el registro de notificaciones");
        return;
      }
      await fireBaseCtrl.enableWebNotifications();
    } catch (err) {
      console.log("Hubo un error", err);
    } finally {
      label.classList.remove("hidden");
      loader.classList.add("hidden");
    }
  });
