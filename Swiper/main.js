import Swiper from "swiper";
import { EffectCards, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";

const swiper = new Swiper(".swiper", {
  modules: [Navigation, EffectCards],
  effect: "cards",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
