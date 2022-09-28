import "./SASS/index.sass";
import Shepherd from "shepherd.js";

const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
    classes: "shadow-md bg-purple-dark",
    scrollTo: { behavior: "smooth", block: "center" },
  },
});

tour.addSteps([
  {
    id: "step-1",
    title: "Menú de navegación",
    text: "Este es el menú principal, navega entre apartados a través de sus iconos.",
    attachTo: {
      element: ".menu",
      on: "right",
    },
    buttons: [
      {
        text: "Siguiente",
        action: tour.next,
      },
    ],
  },
  {
    id: "step-2",
    title: "Tour virtual",
    text: "Puedes repetir este tutorial en cualquier momento haciendo click en el botón de esta caja.",
    attachTo: {
      element: ".take-screenshot-card",
      on: "bottom",
    },
    buttons: [
      {
        text: "Anterior",
        action: tour.back,
      },
      {
        text: "Más información",
        action: () => {
          alert("Más información");
        },
      },
      {
        text: "Siguiente",
        action: tour.next,
      },
    ],
  },
  {
    id: "step-3",
    title: "Gráfico de proyectos",
    text: "Un primer vistazo del estado de tus proyectos",
    attachTo: {
      element: ".card-circle-projects",
      on: "auto",
    },
    buttons: [
      {
        text: "Anterior",
        action: tour.back,
      },
      {
        text: "Siguiente",
        action: tour.next,
      },
    ],
  },
  {
    id: "step-4",
    title: "Gráfico de evolución",
    text: "Evalúa como avanza el rendimiento",
    attachTo: {
      element: ".card-linecharts",
      on: "auto",
    },
    buttons: [
      {
        text: "Anterior",
        action: tour.back,
      },
      {
        text: "Siguiente",
        action: tour.next,
      },
    ],
  },
  {
    id: "step-5",
    title: "Logout de la aplicación",
    text: "Cierra la sessión a través de éste panel",
    attachTo: {
      element: ".user-badge",
      on: "auto",
    },
    buttons: [
      {
        text: "Anterior",
        action: tour.back,
      },
      {
        text: "Finalizar",
        action: tour.next,
      },
    ],
  },
]);

window.addEventListener("load", () => {
  tour.start();
});

document.querySelector(".tour-btn").addEventListener("click", () => {
  tour.start();
});
