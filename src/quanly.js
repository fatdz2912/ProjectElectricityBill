import { getElement } from './getElement.js';
import { checkEmpty, checknumber, compareValue } from './invalidValue.js';
import { fields } from './data.js';
import { addEvent } from './event.js';
import { calculate } from './calculate.js';
window.onload = () => {
    let stt;
    let bienChiDinh = -1;
    var customers = [];
    var editCustomer;
    function Customer(name, address, startUpPeriod, endOfItem, vat, intomoney) {
        this.name = name,
            this.address = address,
            this.startUpPeriod = startUpPeriod,
            this.endOfItem = endOfItem,
            this.vat = vat
        this.intomoney = intomoney
    }
    var checkValue = (txtName, txtAddress, startUp, End, vat) => {
        if (checkEmpty(txtName)) {
            alert(fields.name.requied)
            return true;
        }
        if (checkEmpty(txtAddress)) {
            alert(fields.address.requied)
            return true;
        }
        if (checkEmpty(startUp)) {
            alert(fields.startUp.requied)
            return true;
        }
        if (checkEmpty(End)) {
            alert(fields.endOf.requied)
            return true;
        }
        if (checkEmpty(vat)) {
            alert(fields.vat.requied)
            return true;
        }
        if (checknumber(startUp.value)) {
            alert(fields.startUp.greaterThan0)
            return true;
        }
        if (checknumber(End.value)) {
            alert(fields.endOf.greaterThan0)
            return true;
        }
        if (compareValue(parseFloat(startUp.value), parseFloat(End.value))) {
            alert(fields.endOf.bigger);
            return true;
        }
    }
    var getData = () => {
        var k = JSON.parse(localStorage.getItem('customers'));
        if (k) {
            customers = k;
            getElement('.container tbody').innerHTML = '';
            customers.map((kh, index) => {
                stt = index;
                getElement('.container tbody').innerHTML += 
                    `<tr>
                        <td>${index + 1}</td>
                        <td>${kh.name}</td>
                        <td>${kh.address}</td>
                        <td>${kh.startUpPeriod}</td>
                        <td>${kh.endOfItem}</td>
                        <td>${kh.vat}</td>
                        <td>${kh.intomoney}</td>
                        <td>
                            <div>
                            <button class="edit"  type="button" data-idx=${index}>Edit</button>
                                <button class="delete" type="button">Delete</button>
                            </div>
                        </td>
                    </tr>
`;
            })
        }
        var txtName = getElement('#name');
        var txtAddress = getElement('#address');
        var startUp = getElement('#startUp');
        var End = getElement('#end');
        var vat = getElement('#vat');
        var clears = document.querySelectorAll('.clear');
        for (let i = 0; i < clears.length; i++) {
            clears[i].onclick = () => {
                txtName.value = "";
                txtAddress.value = "";
                startUp.value = "";
                End.value = "";
                vat.value = "";
            }
        }
        var deleteTr = document.querySelectorAll('.delete');
        var editTr = document.querySelectorAll('.edit');
        var table = getElement('table');
        var editRow;
        for (let i = 0; i < deleteTr.length; i++) {
            addEvent(deleteTr[i], 'click', function (e) {
                var boolDetete = confirm("Bạn chắn chắn muốn xóa?");
                if (boolDetete) {
                    table.deleteRow(i + 1);
                    customers.splice(i, 1);
                    localStorage.removeItem('customers');
                    localStorage.setItem('customers', JSON.stringify(customers));
                    getData();
                }
            })
            addEvent(editTr[i], 'click', function (e) {
                editRow = customers[i];
                txtName.value = editRow.name;
                txtAddress.value = editRow.address;
                startUp.value = editRow.startUpPeriod;
                End.value = editRow.endOfItem;
                vat.value = editRow.vat;
                bienChiDinh = i;
            })
        }

    }
    addEvent(getElement('.update'), 'click', (e) => {
        if (bienChiDinh === -1) {
            alert("vui lòng chọn trường để edit");
            return;
        }
        var txtName = getElement('#name');
        var txtAddress = getElement('#address');
        var startUp = getElement('#startUp');
        var End = getElement('#end');
        var vat = getElement('#vat');
        if (checkValue(txtName, txtAddress, startUp, End, vat)) {
            return;
        }
        editCustomer = new Customer(txtName.value, txtAddress.value, startUp.value, End.value, vat.value, calculate(startUp.value, End.value, vat.value));
        customers[bienChiDinh] = editCustomer;
        bienChiDinh = -1;
        localStorage.removeItem('customers');
        localStorage.setItem('customers', JSON.stringify(customers));
        alert('update thành công');
        txtName.value = "";
        txtAddress.value = "";
        startUp.value = "";
        End.value = "";
        vat.value = "";
        getData();
    })
    getData();
    addEvent(getElement('.submit'), 'click', function (e) {
        var txtName = getElement('#name');
        var txtAddress = getElement('#address');
        var startUp = getElement('#startUp');
        var End = getElement('#end');
        var vat = getElement('#vat');
        var reset = () => {
            txtName.value = "";
            txtAddress.value = "";
            startUp.value = "";
            End.value = "";
            vat.value = "";
        }
        if (checkValue(txtName, txtAddress, startUp, End, vat)) {
            return;
        }
        var kh = new Customer(txtName.value, address.value, startUp.value, End.value, vat.value, calculate(startUp.value, End.value, vat.value));
        customers.push(kh);
        localStorage.setItem('customers', JSON.stringify(customers));
        getData();
        reset();
        alert("submit thành công");
    })
}