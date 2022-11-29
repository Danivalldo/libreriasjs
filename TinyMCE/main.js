import "./style.sass";
import postTemplate from "./services/postTemplate";
import launchTinyMCE from "./services/launchTinyMCE";

const form = document.querySelector("#post-form");
const threadContainer = document.querySelector(".thread-container");

const init = async () => {
  const richTextEditor = await launchTinyMCE("#main-input");
  console.log(richTextEditor);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputPost = e.target.querySelector("#main-input");
    if (!inputPost.value) {
      return;
    }
    const post = postTemplate(inputPost.value);
    threadContainer.appendChild(post);
    richTextEditor.resetContent();
  });
};

init();
