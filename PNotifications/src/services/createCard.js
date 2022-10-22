const createCard = (dataCard) => {
  const a = document.createElement("a");
  a.classList.add("blog-post");
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

export default createCard;
