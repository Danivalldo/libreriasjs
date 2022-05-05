import ClipboardJS from "clipboard";
import "./SCSS/index.scss";

const textblock = document.querySelector(".chat-box__container textarea");
const clipboard = new ClipboardJS(".copy-btn");

clipboard.on("success", (copiedContent) => {
  textblock.value = copiedContent.text;
});
