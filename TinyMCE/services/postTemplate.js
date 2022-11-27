const postTemplate = (body) => {
  const template = `
      ${body}
  `;
  const divPost = document.createElement("div");
  divPost.classList.add("post-container");
  divPost.innerHTML = template;
  return divPost;
};

export default postTemplate;
