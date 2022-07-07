const handleInputFocusChange = (e) => {
  e.target.closest("label").classList.add("focus");
};

const handlePhoneInputHyphen = (e) => {
  e.target.value = e.target.value
    .replace(/[^0-9]/g, "")
    .replace(
      /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
      "$1-$2-$3"
    )
    .replace("--", "-");
};

const isFillInputMaxLength = (target) => {
  return target.value.length === target.maxLength;
};

const handleCheckFillInput = (e) => {
  if (isFillInputMaxLength(e.target)) {
    e.target.classList.add("filled");
  } else {
    e.target.classList.remove("filled");
  }
};

function inputEl($page, name) {
  this.$target = $page.querySelector(name);

  const cancelBtn = document.createElement("button");
  const cancelIcon = document.createElement("img");

  cancelIcon.src = "/images/cancel-circle.png";
  cancelBtn.classList.add("cancel");
  cancelBtn.type = "button";
  cancelBtn.appendChild(cancelIcon);

  this.$target.parentNode.insertBefore(cancelBtn, this.$target.nextSibling);

  this.init = () => {
    initEventListeners();
  };

  this.removeFocus = () => {
    this.$target.closest("label").classList.remove("focus");
  };

  const initEventListeners = () => {
    this.$target.addEventListener("focus", handleInputFocusChange);
    this.$target.addEventListener("keyup", handleCheckFillInput);

    cancelBtn.addEventListener("click", (e) => {
      if (e.target.closest(".cancel")) {
        this.$target.value = "";
        this.$target.classList.remove("filled");
        return;
      }
    });
  };

  this.setEvent = (type, listener) => {
    this.$target.addEventListener(type, listener);
  };

  this.init();
}

function certificationPage($target) {
  const inputPhone = new inputEl($target, "#phone");
  inputPhone.setEvent("keyup", handlePhoneInputHyphen);

  const certificationNumber = new inputEl($target, "#cNumber");

  this.init = () => {
    initEventListeners();
  };

  const initEventListeners = () => {
    const inputs = $target.querySelectorAll("input");

    $target.addEventListener("click", (e) => {
      if (e.target.tagName === "INPUT") {
        return;
      }

      inputPhone.removeFocus();
      certificationNumber.removeFocus();
    });
  };
}

const page = new certificationPage(
  document.querySelector(".certification-wrapper")
);
page.init();
