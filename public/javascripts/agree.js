const checkAllHandler = (e) => {
  const checkboxes = document.querySelectorAll(
    "input[type='checkbox']:not(.checkAll)"
  );

  checkboxes.forEach((checkbox) => {
    checkbox.checked = e.target.checked;
  });
};

window.addEventListener("load", () => {
  const checkAll = document.querySelector(".checkAll");
  checkAll.addEventListener("click", (e) => {
    checkAllHandler(e);
  });
});
