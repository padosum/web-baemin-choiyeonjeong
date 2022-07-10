import InputField from "./inputField.js";
import Api from "../../api/index.js";

document.addEventListener("DOMContentLoaded", () => {
  const page = new DetailsPage(document.querySelector(".details-wrapper"));
  page.init();
});

const handleCompleteBtn = (e) => {
  try {
    registerUser({
      email: inputEmal.getValue(),
      nickname: inputNickname.getValue(),
      password: inputPassword.getValue(),
      birth: inputBirth.getValue(),
    });
  } catch (error) {
    console.error("회원가입 중 오류가 발생했습니다", error);
  }
};

const handleValidateBtn = (e, inputFields) => {
  const { inputEmail } = inputFields;
  inputEmail.addClass("filled");

  for (let inputField in inputFields) {
    inputFields[inputField].removeClass("hidden");
  }
};

const registerUser = async (userInfo) => {
  const { response } = await Api.registerUser(userInfo);

  if (!response.error) {
    throw new Error(response.error);
  } else {
    window.location = "/";
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
    validateBtn.addEventListener("click", (e) =>
      handleValidateBtn(e, {
        inputEmail,
        inputNickname,
        inputPassword,
        inputBirth,
      })
    );
  };
}
