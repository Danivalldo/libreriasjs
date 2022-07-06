const templateNovelPortion = (portion) => {
  return `
    <div id="${portion.id}" class="novel-part-container">
      ${portion.isOwner ? `<button class="delete-btn">🗑️</button>` : ""}
      <div>
        ${portion.data.pharagraph}
      </div>
      <div class="meta">
        ${portion.data.date}
      </div>
    </div>
  `;
};

export default templateNovelPortion;
