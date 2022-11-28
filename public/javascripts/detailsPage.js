import InputField from "./inputField.js";
import Api from "../../api/index.js";

document.addEventListener("DOMContentLoaded", () => {
  const page = new DetailsPage(document.querySelector(".details-wrapper"));
  page.init();
});

const handleCompleteBtn = e => {
  const inputEmail = document.querySelector("#email");
  const inputNickname = document.querySelector("#nickname");
  const inputPassword = document.querySelector("#password");
  const inputBirth = document.querySelector("#birth");

  registerUser({
    email: inputEmail.value,
    nickname: inputNickname.value,
    password: inputPassword.value,
    birth: inputBirth.value,
  });
};

const handleValidateBtn = (e, inputFields) => {
  const { inputEmail } = inputFields;
  inputEmail.addClass("filled");

  for (let inputField in inputFields) {
    inputFields[inputField].removeClass("hidden");
  }
};

const registerUser = async userInfo => {
  const { status, data } = await Api.registerUser(userInfo);

  if (status === 200) {
    alert(data.message);
    document.location.href = "/";
  } else {
    alert("회원가입 중 오류가 발생했습니다.");
  }
};

function DetailsPage($target) {
  const inputEmail = new InputField($target, "#email");
  const inputNickname = new InputField($target, "#nickname");
  const inputPassword = new InputField($target, "#password");
  const inputBirth = new InputField($target, "#birth");

  this.init = () => {
    const completeBtn = $target.querySelector(".complete-btn");
    const validateBtn = $target.querySelector(".validate-btn");
    completeBtn.addEventListener("click", handleCompleteBtn);
    validateBtn.addEventListener("click", e =>
      handleValidateBtn(e, {
        inputEmail,
        inputNickname,
        inputPassword,
        inputBirth,
      })
    );
  };
}
