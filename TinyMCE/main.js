import "./style.sass";
import postTemplate from "./services/postTemplate";
import launchMainInput from "./services/launchMainInput";

const form = document.querySelector("#post-form");
const threadContainer = document.querySelector(".thread-container");

const init = async () => {
  const mainInput = await launchMainInput("#main-input");
  console.log(mainInput);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputPost = e.target.querySelector("#main-input");
    if (!inputPost.value) {
      return;
    }
    const post = postTemplate(inputPost.value);
    threadContainer.appendChild(post);
    mainInput.resetContent();
  });
};

init();
