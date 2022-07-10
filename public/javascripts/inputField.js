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

  this.addClass = (className) => {
    this.$target.classList.add(className);
  };
  this.removeClass = (className) => {
    this.$target.closest("label").classList.remove(className);
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
        this.removeClass("focus");
        return;
      }
    });
  };

  this.init();
}

export default InputField;
