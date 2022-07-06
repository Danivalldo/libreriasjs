const templateNovelPortion = (portion) => {
  return `
    <div id="${portion.id}" class="novel-part-container">
      ${
        portion.isOwner
          ? `
        <div>
          <button class="delete-btn">X</button>
        </div>
        `
          : ""
      }
      <div>
        ${portion.data.pharagraph}
      </div>
      <div>
        ${portion.data.date}
      </div>
    </div>
  `;
};

export default templateNovelPortion;
