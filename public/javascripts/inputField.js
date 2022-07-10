const handleInputFocusChange = (e) => {
  e.target.closest("label").classList.add("focus");
};

const handleInputBlur = (e) => {
  e.target.closest("label").classList.remove("focus");
};

const handleMouseDown = (e) => {
  e.preventDefault();
};

function InputField($page, selector) {
  this.$target = $page.querySelector(selector);

  this.init = () => {
    this.initEventListeners();
  };

  this.removeFocusClass = () => {
    this.$target.closest("label").classList.remove("focus");
  };

  this.getValue = () => {
    return this.$target.value;
  };

  this.setValueEmpty = () => {
    this.$target.value = "";
  };

  this.initEventListeners = () => {
    this.$target.addEventListener("focus", handleInputFocusChange);
    this.$target.addEventListener("blur", handleInputBlur);

    const cancelBtn = this.$target.nextSibling;
    cancelBtn.addEventListener("mousedown", handleMouseDown);
    cancelBtn.addEventListener("click", (e) => {
      if (e.target.closest(".cancel")) {
        this.setValueEmpty();
        this.removeFocusClass();
        return;
      }
    });
  };

  this.init();
}

export default InputField;
