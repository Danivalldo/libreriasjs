import Toastify from "toastify-js";

class ToastNotifications {
  launchNotification(message, type = "info") {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: type === "error" ? "rgb(255, 95, 109)" : "",
      },
    }).showToast();
  }
}

const toastNotifications = new ToastNotifications();

export default toastNotifications;
