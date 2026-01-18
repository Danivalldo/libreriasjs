class FormAnimationController {
  constructor(segmentController) {
    this.currentState = "idle";
    this.isPasswordVisible = false;
    this.isPasswordFocused = false;
    this.passwordField = null;
    this.toggleButton = null;
    this.form = null;
    this.segmentController = segmentController;
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.setupFormElements();
      this.setupEventListeners();
    });
    if (this.segmentController && this.segmentController.animation) {
      this.segmentController.animation.addEventListener("DOMLoaded", () => {
        this.transitionToIdle();
      });
    }
  }

  setupFormElements() {
    this.passwordField = document.getElementById("password");
    this.form = document.getElementById("login-form");
    this.createPasswordToggle();
  }

  createPasswordToggle() {
    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.id = "password-toggle";
    toggleButton.textContent = "👁️";
    toggleButton.style.cssText = `
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      z-index: 10;
    `;
    const passwordContainer = document.createElement("div");
    passwordContainer.style.cssText = `
      position: relative;
      display: inline-block;
      width: 100%;
    `;
    this.passwordField.parentNode.insertBefore(
      passwordContainer,
      this.passwordField,
    );
    passwordContainer.appendChild(this.passwordField);
    passwordContainer.appendChild(toggleButton);

    this.toggleButton = toggleButton;
  }

  setupEventListeners() {
    this.passwordField.addEventListener("focus", () => {
      this.isPasswordFocused = true;
      if (this.currentState === "idle") {
        this.transitionToNoWatch();
      }
    });

    this.passwordField.addEventListener("blur", (e) => {
      if (e.relatedTarget === this.toggleButton) {
        return;
      }

      this.isPasswordFocused = false;
      setTimeout(() => {
        if (!this.isPasswordFocused) {
          this.transitionBackToIdle();
        }
      }, 100);
    });

    this.toggleButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.togglePasswordVisibility();
      this.passwordField.focus();
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.transitionToSuccess();
    });
  }

  transitionToIdle() {
    this.currentState = "idle";
    this.segmentController.playSegment("idle", true, "forward");
  }

  transitionToNoWatch() {
    if (this.currentState === "idle") {
      this.currentState = "noWatch";
      this.segmentController.playSegment("noWatch", false, "forward");
    }
  }

  transitionToPeek() {
    if (this.currentState === "noWatch") {
      this.currentState = "peek";
      this.segmentController.playSegment("peek", false, "forward");
    }
  }

  transitionFromPeekToNoWatch() {
    if (this.currentState === "peek") {
      this.currentState = "noWatch";
      this.segmentController.playSegmentBackward("peek", false);
    }
  }

  transitionBackToIdle() {
    if (this.isPasswordVisible) {
      this.isPasswordVisible = false;
      this.passwordField.type = "password";
      this.toggleButton.textContent = "👁️";
    }

    if (this.currentState === "noWatch") {
      this.currentState = "idle";
      this.segmentController.playSegmentBackward("noWatch", false);
      const handleComplete = () => {
        if (this.currentState === "idle") {
          this.segmentController.playSegment("idle", true, "forward");
        }
        this.segmentController.animation.removeEventListener(
          "complete",
          handleComplete,
        );
      };
      this.segmentController.animation.addEventListener(
        "complete",
        handleComplete,
      );
    } else if (this.currentState === "peek") {
      this.currentState = "idle";
      this.segmentController.playSegmentBackward("peek", false);
      let step = 0;
      const handleStepComplete = () => {
        step++;
        if (step === 1) {
          this.segmentController.playSegmentBackward("noWatch", false);
        } else if (step === 2) {
          if (this.currentState === "idle") {
            this.segmentController.playSegment("idle", true, "forward");
          }
          this.segmentController.animation.removeEventListener(
            "complete",
            handleStepComplete,
          );
        }
      };
      this.segmentController.animation.addEventListener(
        "complete",
        handleStepComplete,
      );
    }
  }

  transitionToSuccess() {
    const previousState = this.currentState;
    this.currentState = "success";
    if (previousState === "peek") {
      let step = 0;
      const handleTransition = () => {
        step++;
        if (step === 1) {
          this.segmentController.playSegmentBackward("noWatch", false);
        } else if (step === 2) {
          this.segmentController.playSegment("success", false, "forward");
        } else if (step === 3) {
          this.currentState = "success";
          this.segmentController.animation.removeEventListener(
            "complete",
            handleTransition,
          );
        }
      };

      this.segmentController.animation.addEventListener(
        "complete",
        handleTransition,
      );
      this.segmentController.playSegmentBackward("peek", false);
    } else if (previousState === "noWatch") {
      let step = 0;
      const handleTransition = () => {
        step++;
        if (step === 1) {
          this.segmentController.playSegment("success", false, "forward");
        } else if (step === 2) {
          this.currentState = "success";
          this.segmentController.animation.removeEventListener(
            "complete",
            handleTransition,
          );
        }
      };

      this.segmentController.animation.addEventListener(
        "complete",
        handleTransition,
      );
      this.segmentController.playSegmentBackward("noWatch", false);
    } else {
      this.playSuccessAnimation();
    }
  }

  playSuccessAnimation() {
    this.segmentController.playSegment("success", false, "forward");
    const handleSuccessComplete = () => {
      this.currentState = "success";
      this.segmentController.animation.removeEventListener(
        "complete",
        handleSuccessComplete,
      );
    };

    this.segmentController.animation.addEventListener(
      "complete",
      handleSuccessComplete,
    );
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.passwordField.type = this.isPasswordVisible ? "text" : "password";
    this.toggleButton.textContent = this.isPasswordVisible ? "🙈" : "👁️";
    if (this.isPasswordVisible && this.currentState === "noWatch") {
      this.transitionToPeek();
    } else if (!this.isPasswordVisible && this.currentState === "peek") {
      this.transitionFromPeekToNoWatch();
    }
  }

  getCurrentState() {
    return this.currentState;
  }
}

export default FormAnimationController;
