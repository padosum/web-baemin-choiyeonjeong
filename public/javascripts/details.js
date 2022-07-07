const handleInputFocusChange = (e) => {
  e.target.closest("label").classList.add("focus");
};

const handleInputBlur = (e) => {
  e.target.closest("label").classList.remove("focus");
};

function InputEl($page, selector) {
  this.$target = $page.querySelector(selector);

  const cancelBtn = document.createElement("button");
  const cancelIcon = document.createElement("img");

  cancelIcon.src = "/images/cancel-circle.png";
  cancelBtn.classList.add("cancel");
  cancelBtn.type = "button";
  cancelBtn.appendChild(cancelIcon);

  this.$target.parentNode.insertBefore(cancelBtn, this.$target.nextSibling);

  this.init = () => {
    this.initEventListeners();
  };

  this.initEventListeners = () => {
    console.log(this.$target);
    this.$target.addEventListener("focus", handleInputFocusChange);
    this.$target.addEventListener("blur", handleInputBlur);
  };

  this.getValue = () => {
    return this.$target.value;
  };

  this.init();
}

function DetailsPage($target) {
  const inputEmal = new InputEl($target, "#email");
  const inputNickname = new InputEl($target, "#nickname");
  const inputPassword = new InputEl($target, "#password");
  const inputBirth = new InputEl($target, "#birth");

  this.init = () => {
    const button = document.querySelector(".complete-btn");
    button.addEventListener("click", (e) => {
      fetch("/auth/register_process", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputEmal.getValue(),
          nickname: inputNickname.getValue(),
          password: inputPassword.getValue(),
          birth: inputBirth.getValue(),
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            window.location = "/";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
}

const page = new DetailsPage(document.querySelector(".details-wrapper"));
page.init();
