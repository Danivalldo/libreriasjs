class StepSequencer {
  constructor(containerSelector) {
    this.onClickButtonCallback = undefined;
    this.container = document.querySelector(containerSelector);
    this.mainContainer = document.createElement("div");
    this.mainContainer.classList.add("step-sequencer__main-container");
    this.container.appendChild(this.mainContainer);
    this.tracks = 8;
    this.selectedNotes = Array.from({ length: this.tracks }, () => []);
    this.createGrid();
    this.addListeners();
  }
  createGrid() {
    const notes = ["C", "D", "E", "F", "G", "A", "B"];

    for (let i = 0, j = notes.length; i < j; i++) {
      const note = notes[i];
      const row = document.createElement("div");
      row.classList.add("notes-row");
      for (let n = 0; n < this.tracks; n++) {
        const noteBtn = document.createElement("button");
        const octaveSlider = document.createElement("input");
        octaveSlider.setAttribute("type", "range");
        octaveSlider.setAttribute("min", 2);
        octaveSlider.setAttribute("max", 5);
        octaveSlider.setAttribute("step", 1);
        octaveSlider.setAttribute("value", 4);
        noteBtn.setAttribute("data-note-name", note);
        noteBtn.setAttribute("data-note-position", n);
        noteBtn.setAttribute("data-octave", 4);
        noteBtn.innerHTML = `<span>${note}4</span>`;
        noteBtn.appendChild(octaveSlider);
        row.appendChild(noteBtn);
        this.mainContainer.appendChild(row);
      }
    }
  }
  addListeners() {
    this.mainContainer.addEventListener(
      "click",
      this.handleOnPressNote.bind(this)
    );
    this.mainContainer.addEventListener(
      "input",
      this.handleOnChangeOctave.bind(this)
    );
  }
  handleOnPressNote(e) {
    const button = e.target;
    const noteName = button.dataset.noteName;
    const octave = button.dataset.octave;
    const notePosition = button.dataset.notePosition;
    if (!noteName) return;
    const noteIndex = this.selectedNotes[notePosition].findIndex(
      (note) => note.noteName === noteName
    );
    if (typeof this.onClickButtonCallback === "function") {
      this.onClickButtonCallback(`${noteName}${octave}`, noteIndex >= 0);
    }
    if (noteIndex >= 0) {
      button.classList.remove("active");
      return this.selectedNotes[notePosition].splice(noteIndex, 1);
    }
    button.classList.add("active");
    this.selectedNotes[notePosition].push({ noteName, octave });
  }
  handleOnChangeOctave(e) {
    e.preventDefault();
    const slider = e.target;
    if (slider.nodeName.toLowerCase() !== "input") return;
    const btn = slider.closest("button");
    const noteName = btn.dataset.noteName;
    const notePosition = Number(btn.dataset.notePosition);
    const indexNote = this.selectedNotes[notePosition].findIndex(
      (note) => note.noteName === noteName
    );
    if (indexNote >= 0) {
      this.selectedNotes[notePosition][indexNote].octave = slider.value;
    }
    btn.setAttribute("data-octave", slider.value);
    btn.querySelector("span").innerHTML = `${noteName}${slider.value}`;
  }
  getSelectedNotes() {
    return this.selectedNotes;
  }
  getNotesByStep(step) {
    if (step > this.tracks - 1 || step < 0) return;
    return this.selectedNotes[step];
  }
  updateButtonsStepState(step) {
    this.container
      .querySelectorAll(`button[data-note-position]`)
      .forEach((btn) => {
        const stepBtn = Number(btn.dataset.notePosition);
        if (stepBtn === step) {
          btn.classList.add("step-active");
          return;
        }
        btn.classList.remove("step-active");
      });
  }
  onClickButton(cb) {
    this.onClickButtonCallback = cb;
  }
  clear() {
    this.mainContainer.querySelectorAll("button").forEach((btn) => {
      btn.classList.remove("active");
    });
    this.selectedNotes.forEach((_, i) => {
      this.selectedNotes[i] = [];
    });
  }
}

export default StepSequencer;
