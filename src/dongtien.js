import { getElement } from './getElement.js';
var customers = JSON.parse(localStorage.getItem('customers'));
console.log(customers);
var i = localStorage.getItem('i');
getElement('.ten').innerText = customers[i].name;
getElement('.address').innerText = customers[i].address;
getElement('.hoadon').innerText = Math.ceil(Math.random()*90000+9999);
getElement('.money').innerText = customers[i].intomoney+" VNĐ";
getElement('.quaylai').onclick = () => {
    history.go(-1);
}