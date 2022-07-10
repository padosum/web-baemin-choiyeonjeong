const handleCheckAllCheckBoxes = (e) => {
  const checkboxes = document.querySelectorAll(
    "input[type='checkbox']:not(.checkAll)"
  );

  checkboxes.forEach((checkbox) => {
    checkbox.checked = e.target.checked;
  });
};

const handleNextPage = () => {
  window.location.href = "/join/certification";
};

const isEnableNext = () => {
  const essential = document.querySelectorAll(
    "input[type='checkbox']:checked:not(.checkAll):not(.optional"
  );

  let checkedRadio = false;
  const radioButtons = document.querySelectorAll("input[name=age]");
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      checkedRadio = true;
      break;
    }
  }
  return essential.length >= 3 && checkedRadio;
};

window.addEventListener("DOMContentLoaded", () => {
  const checkAll = document.querySelector(".checkAll");
  checkAll.addEventListener("click", handleCheckAllCheckBoxes);

  const main = document.querySelector("main");
  main.addEventListener("click", (e) => {
    const label = e.target.closest("label");

    if (!label) return;

    const optional = e.target.closest(".optional");
    if (!optional) {
      const next = document.querySelector("button.next");

      if (isEnableNext()) {
        next.classList.add("enable");
        next.addEventListener("click", handleNextPage);
      } else {
        next.classList.remove("enable");
        next.removeEventListener("click", handleNextPage);
      }
    }
  });
});
