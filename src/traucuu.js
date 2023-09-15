import { getElement } from './getElement.js';
getElement('.tenLogin').innerText = JSON.parse(localStorage.getItem('tenLogin'));
getElement('body').onclick = () => {
    getElement('.feature').classList.remove('open');
}
getElement('.user').onclick = (e) => {
    e.stopPropagation();
    getElement('.feature').classList.add('open');
}
getElement('.quaylai').onclick = () => {
    window.history.go(-1);
}
getElement('.dangxuat').onclick = () => {
    window.location.href = "../publish/home.html";
}
getElement('.container-fluid').onclick = () => {
    getElement('.suggest').classList.remove('open');
}
getElement('.header-seach').onclick = (e) => {
    e.stopPropagation();
    getElement('.suggest').classList.add('open');
}
var arrSearch = [];
let i = -1;
let name;
getElement('.header-seach').onkeyup = (e) => {
    var keycode = e.which;
    var customers = JSON.parse(localStorage.getItem('customers'));
    if (customers) {
        if ((keycode >= 65 && keycode <= 90) || (keycode >= 97 && keycode <= 122) || (keycode >= 48 && keycode <= 57)) {
            i = -1;
            arrSearch.length = 0;
            getElement('.suggestSearch').innerHTML = `
            `;
        }
        customers.map((customer) => {
            if (customer.name.toLowerCase().indexOf(getElement("#search").value.toLowerCase()) != -1
                && ((keycode >= 65 && keycode <= 90) || (keycode >= 97 && keycode <= 122) || (keycode >= 48 && keycode <= 57))) {
                getElement('.suggestSearch').innerHTML += `
                <li class="nameCustomer">${customer.name}</li>
                `;
                name = getElement("#search").value;
                arrSearch.push(customer.name);
            }
        }
        )
        if (keycode === 40 && i < arrSearch.length - 1) {
            ++i;
            getElement("#search").value = arrSearch[i];
        }
        if (keycode === 38 && i > 0) {
            i = i - 1;
            getElement("#search").value = arrSearch[i];
        }
        if (keycode === 8) {
            getElement('.suggestSearch').innerHTML = `
            `;
            customers.map((customer) => {
                if (customer.name.toLowerCase().indexOf(getElement("#search").value.toLowerCase()) != -1 &&  getElement("#search").value!=="") {
                    console.log(getElement("#search").value!=="");
                    i = -1;
                    getElement('.suggestSearch').innerHTML += `
                    <li>${customer.name}</li>
                    `;
                }
            }
            )
        }
        if(keycode===13){
            var check = false;
            customers.map((customer,index)=>{
                    if(customer.name === getElement("#search").value){
                        localStorage.setItem('i',index);
                        check = true;
                    }
                })
                if(check == true) {
                        window.location.href="../publish/dongtien.html";
                }
                else {
                    alert("không tìm thấy kết quả nào")
                }
        }
        var liName = document.querySelectorAll('.nameCustomer');
        for(let i = 0; i < liName.length;i++) {
            liName[i].onclick = (e) => {
                customers.map((customer,index)=>{
                    if(customer.name === liName[i].innerText){
                        localStorage.setItem('i',index);
                        return
                    }
                })
                window.location.href="../publish/dongtien.html";
            }
        }
    }
}