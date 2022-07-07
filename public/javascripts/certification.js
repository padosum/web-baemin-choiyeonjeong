const handleInputFocusChange = (e) => {
  e.target.closest("label").classList.add("focus");
};

window.addEventListener("click", (e) => {
  const inputs = document.querySelectorAll("input");
  if (e.target.tagName === "INPUT") {
    return;
  }
  for (const input of inputs) {
    input.closest("label").classList.remove("focus");
  }
});

window.addEventListener("load", () => {
  const inputs = document.querySelectorAll("input");
  for (const input of inputs) {
    input.addEventListener("focus", handleInputFocusChange);
  }
});
