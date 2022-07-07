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

  const initEventListeners = () => {
    this.$target.addEventListener("focus", handleInputFocusChange);

    cancelBtn.addEventListener("click", (e) => {
      if (e.target.closest(".cancel")) {
        this.$target.value = "";
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

      if (e.target.closest(".cancel")) {
        e.target.closest("input[type='text']").value = "";
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
