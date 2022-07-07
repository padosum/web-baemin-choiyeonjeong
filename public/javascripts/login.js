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

window.addEventListener("load", () => {
  const form = document.querySelector(".form-login");
  form.addEventListener("keyup", (e) => {
    if (e.target.tagName === "INPUT") {
      toggleValidateMessage(e.target.name, e.target.value === "");
      return;
    }
  });
});
