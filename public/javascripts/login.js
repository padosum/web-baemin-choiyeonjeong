const toggleValidateMessage = (name, setVisible) => {
  const [el] = [...document.getElementsByName(name)];
  el.nextElementSibling.style.display = setVisible ? "block" : "none";
};

const validateForm = () => {
  const id = document.querySelector("#id").value;
  const pw = document.querySelector("#pw").value;

  toggleValidateMessage("id", id === "");
  toggleValidateMessage("pw", pw === "");

  if (id === "" || pw === "") {
    return false;
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

    const id = document.querySelector("#id").value;
    const password = document.querySelector("#pw").value;

    fetch("/auth/login_check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          window.location = "/";
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        console.error(new Error("로그인 중 에러 발생"));
      });
  });
});
