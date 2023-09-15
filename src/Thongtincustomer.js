import { getElement } from "./getElement.js";
window.onload = () => {
  var customers = [];
  var getData = () => {
    var k = JSON.parse(localStorage.getItem("customers"));
    if (k) {
      customers = k;
      getElement(".container tbody").innerHTML = "";
      customers.map((kh, index) => {
        getElement(".container tbody").innerHTML += `<tr>
    <td>${index + 1}</td>
    <td>${kh.name}</td>
    <td>${kh.address}</td>
    <td>${kh.startUpPeriod}</td>
    <td>${kh.endOfItem}</td>
    <td>${kh.vat}</td>
    <td>${kh.intomoney + "  VNĐ"}</td>
 </tr>
`;
      });
    }
  };
  getElement(".quaylai").onclick = () => {
    window.history.go(-1);
  };
  getData();
};
