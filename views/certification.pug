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

function inputEl($page, name) {
  this.$target = $page.querySelector(name);
  this.init = () => {
    initEventListeners();
  };

  const initEventListeners = () => {
    this.$target.addEventListener("focus", handleInputFocusChange);
  };

  this.setEvent = (type, listener) => {
    this.$target.addEventListener(type, listener);
  };

  this.init();
}

function certificationPage($target) {
  this.init = () => {
    const inputPhone = new inputEl($target, "#phone");
    inputPhone.setEvent("keyup", handlePhoneInputHyphen);

    const certificationNumber = new inputEl($target, "#cNumber");

    initEventListeners();
  };

  const initEventListeners = () => {
    const inputs = $target.querySelectorAll("input");

    $target.addEventListener("click", (e) => {
      if (e.target.tagName === "INPUT") {
        return;
      }
      for (const input of inputs) {
        input.closest("label").classList.remove("focus");
      }
    });
  };
}

const page = new certificationPage(
  document.querySelector(".certification-wrapper")
);
page.init();
