openInfo.addEventListener("click", function () {
  infoPopup.classList.add("show");
});
closePopup.addEventListener("click", function () {
  infoPopup.classList.remove("show");
});
window.addEventListener("click", function (event) {
  if (event.target == infoPopup) {
    infoPopup.classList.remove("show");
  }
});
