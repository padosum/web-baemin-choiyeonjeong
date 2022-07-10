import InputField from "./inputField.js";
import Api from "../../api/index.js";

document.addEventListener("DOMContentLoaded", () => {
  const page = new DetailsPage(document.querySelector(".details-wrapper"));
  page.init();
});

const registerUser = async (userInfo) => {
  const { response } = await Api.registerUser(userInfo);

  if (!response.error) {
    throw new Error(response.error);
  } else {
    window.location = "/";
  }
};

function DetailsPage($target) {
  const inputEmal = new InputField($target, "#email");
  const inputNickname = new InputField($target, "#nickname");
  const inputPassword = new InputField($target, "#password");
  const inputBirth = new InputField($target, "#birth");

  this.init = () => {
    const button = document.querySelector(".complete-btn");
    button.addEventListener("click", (e) => {
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
    });
  };
}
