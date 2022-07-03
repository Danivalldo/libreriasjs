const templateNovelPortion = (portion) => {
  return `
    <div>
      <div>
        <button class="delete-btn">X</button>
      </div>
      <div>
        ${portion.data.date}
      </div>
      <div>
        ${portion.data.pharagraph}
      </div>
    </div>
  `;
};

export default templateNovelPortion;
