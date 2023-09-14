class StepSequencer {
  constructor(containerSelector) {
    this.onClickButtonCallback = undefined;
    this.container = document.querySelector(containerSelector);
    this.mainContainer = document.createElement("div");
    this.mainContainer.classList.add("step-sequencer__main-container");
    this.container.appendChild(this.mainContainer);
    this.tracks = 8;
    this.selectedNotes = Array.from({ length: this.tracks }, () => []);
    // this.selectedNotes = [
    //   ["C"],
    //   ["D"],
    //   ["E"],
    //   ["C"],
    //   ["F"],
    //   ["E"],
    //   ["D"],
    //   ["G"],
    // ];
    this.createGrid();
    this.addListeners();
  }
  createGrid() {
    const notes = [
      "C",
      // "C#",
      "D",
      // "D#",
      "E",
      // "E#",
      "F",
      // "F#",
      "G",
      // "G#",
      "A",
      // "A#",
      "B",
      // "B#",
    ];

    // const notes = ["F4", "Eb4", "C4", "Bb3", "Ab3", "F3"];

    for (let i = 0, j = notes.length; i < j; i++) {
      const note = notes[i];
      const row = document.createElement("div");
      row.classList.add("notes-row");
      // this.selectedNotes.push([]);
      for (let n = 0; n < this.tracks; n++) {
        const noteBtn = document.createElement("button");
        noteBtn.setAttribute("data-note-name", note);
        noteBtn.setAttribute("data-note-position", n);
        noteBtn.innerHTML = note;
        row.appendChild(noteBtn);
        this.mainContainer.appendChild(row);
      }
    }
  }
  addListeners() {
    this.mainContainer.addEventListener(
      "pointerdown",
      this.handleOnPressNote.bind(this)
    );
  }
  handleOnPressNote(e) {
    e.preventDefault();
    const button = e.target;
    const noteName = button.dataset.noteName;
    const notePosition = button.dataset.notePosition;
    if (!noteName) return;
    const noteIndex = this.selectedNotes[notePosition].findIndex(
      (note) => note === noteName
    );

    this.onClickButtonCallback(noteName, noteIndex >= 0);
    if (noteIndex >= 0) {
      button.classList.remove("active");
      return this.selectedNotes[notePosition].splice(noteIndex, 1);
    }
    button.classList.add("active");
    this.selectedNotes[notePosition].push(noteName);
  }
  getSelectedNotes() {
    return this.selectedNotes;
  }
  getNotesByStep(step) {
    if (step > this.tracks - 1 || step < 0) return;
    return this.selectedNotes[step];
  }
  onClickButton(cb) {
    this.onClickButtonCallback = cb;
  }
}

export default StepSequencer;
