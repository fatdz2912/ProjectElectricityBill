import { getElement } from "./getElement.js";
getElement(".tenLogin").innerText = JSON.parse(
  localStorage.getItem("tenLogin")
);
getElement(".container-fluid").onclick = () => {
  getElement(".dangxuat").classList.remove("open");
};
getElement(".avatar").onclick = (e) => {
  e.stopPropagation();
  getElement(".dangxuat").classList.add("open");
};
getElement(".tracuu").onclick = () => {
  window.location.href = "../publish/tracuu.html";
};
getElement(".quanly").onclick = () => {
  window.location.href = "../publish/QuanLy.html";
};
getElement(".dangxuat").onclick = () => {
  window.location.href = "../publish/home.html";
};
