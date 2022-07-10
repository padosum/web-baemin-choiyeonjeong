import Api from "../../api/index.js";

const validateForm = () => {
  const id = document.querySelector("#id").value;
  const pw = document.querySelector("#pw").value;

  toggleValidateMessage("id", id === "");
  toggleValidateMessage("pw", pw === "");

  if (id === "" || pw === "") {
    return false;
  }
  return true;
};

const toggleValidateMessage = (name, setVisible) => {
  const [el] = [...document.getElementsByName(name)];
  el.nextElementSibling.style.display = setVisible ? "block" : "none";
};

const login = async (userInfo) => {
  const { success, message } = await Api.loginUser(userInfo);
  if (!success) {
    alert(message);
  } else {
    window.location = "/";
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-login");
  form.addEventListener("keyup", (e) => {
    if (e.target.tagName === "INPUT") {
      toggleValidateMessage(e.target.name, e.target.value === "");
      return;
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
      if (!validateForm()) {
        return false;
      }
      const id = document.querySelector("#id").value;
      const password = document.querySelector("#pw").value;
      login({ id, password });
    } catch (error) {
      console.error(new Error("로그인 중 에러가 발생했습니다."));
    }
  });
});
