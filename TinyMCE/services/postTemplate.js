const postTemplate = (body) => {
  const template = `
    <div class="post-header">
      <span class="snap-container">
        <img
          src="https://randomuser.me/api/portraits/${
            Math.random() > 0.5 ? "men" : "women"
          }/${Math.floor(Math.random() * (100 - 1 + 1) + 1)}.jpg"
          alt=""
        />
      </span>
      <span class="username"><strong>@userexample</strong> dijo:</span>
    </div>
    <div class="post-body">
    ${body}
    </div>
  `;
  const divPost = document.createElement("div");
  divPost.classList.add("post-container");
  divPost.innerHTML = template;
  return divPost;
};

export default postTemplate;
