import { getElement } from "./getElement.js";
window.onload = () => {
  var mo = (element) => {
    getElement(element).classList.add("open");
  };
  var dong = (element) => {
    getElement(element).classList.remove("open");
  };
  getElement(".dangnhap").onclick = () => {
    mo(".nav-login");
  };
  getElement(".nav-login").onclick = () => {
    dong(".nav-login");
  };
  getElement(".content-login").onclick = (e) => {
    e.stopPropagation();
  };
  getElement(".dangky").onclick = () => {
    mo(".form-register");
  };
  getElement(".form-register").onclick = () => {
    dong(".form-register");
  };
  getElement(".btn-js").onclick = () => {
    dong(".form-register");
  };
  getElement(".register-body").onclick = (e) => {
    e.stopPropagation();
  };
  getElement(".btn-dangnhap").onclick = () => {
    dong(".form-register");
    mo(".nav-login");
  };
  getElement(".create").onclick = () => {
    dong(".nav-login");
    mo(".form-register");
  };
  getElement(".nav-login .content-login>i").onclick = () => {
    dong(".nav-login");
  };
  var checkEmpty = (element) => element.value === null || element.value === "";
  var logins = [];
  var getLogins = () => {
    if (logins.length === 0) {
      var storage = JSON.parse(localStorage.getItem("logins"));
      if (storage) {
        logins = storage;
      }
    }
  };
  getLogins();
  // Register
  var addLogin = () => {
    var txtEmail = getElement(".txtGmail");
    var txtTenTaiKhoan = getElement(".txtTenTaiKhoan");
    var password = getElement(".password");
    var againpassword = getElement(".againpassword");
    var typeAccout = getElement(
      '.form-register .accout input[type="radio"]:checked'
    );
    if (
      checkEmpty(txtEmail) ||
      !txtEmail.value.match("^\\D+\\d*@\\D+(\\.\\D+)+$")
    ) {
      getElement(".auth-form>p").innerText = "Bạn nhập gmail chưa hợp lệ";
      return true;
    }
    if (checkEmpty(txtTenTaiKhoan)) {
      getElement(".info").innerText = "Bạn chưa nhập tên tài khoản";
      return true;
    }
    if (checkEmpty(password)) {
      getElement(".info").innerText = "Bạn chưa nhập mật khẩu";
      return true;
    }
    if (checkEmpty(againpassword)) {
      getElement(".info").innerText = "Bạn chưa nhập lại mật khẩu";
      return true;
    }
    if (typeAccout === null) {
      getElement(".auth-form>p").innerText = "vui lòng checked radio";
      return;
    }
    if (password.value !== againpassword.value) {
      getElement(".info").innerText = "Hai mật khẩu chưa trùng khớp";
      return true;
    }
    var checkTaiKhoan = 0;
    var checkEmail = 0;
    logins.map((login) => {
      if (login.txtEmail === txtEmail.value) {
        checkEmail = 1;
        return true;
      }
      if (login.txtTenTaiKhoan === txtTenTaiKhoan.value) {
        checkTaiKhoan = 1;
        return true;
      }
    });
    if (checkEmail === 1) {
      getElement(".info").innerText =
        "Email này đã được dùng để tạo tài khoản!";
      return;
    }
    if (checkTaiKhoan === 1) {
      getElement(".info").innerText = "Tên đăng nhập đã tồn tại";
      return;
    }
    var acount = {
      txtEmail: txtEmail.value,
      txtTenTaiKhoan: txtTenTaiKhoan.value,
      password: password.value,
      typeAccout: typeAccout.value,
    };
    logins.push(acount);
    localStorage.setItem("logins", JSON.stringify(logins));
    txtEmail.value = "";
    txtTenTaiKhoan.value = "";
    password.value = "";
    againpassword.value = "";
    typeAccout.checked = false;
    getElement(".info").innerText = "Bạn đã đăng ký thành công!";
  };
  getElement(".btn-dangky").onclick = addLogin;
  // Login
  var setLogins = (txtTendangNhap, password, typeAccout) => {
    let bol1 = 0;
    var i;
    if (logins.length > 0) {
      logins.map((login, index) => {
        if (
          login.txtTenTaiKhoan === txtTendangNhap &&
          login.password === password
        ) {
          bol1 = 1;
          i = index;
          if (logins[i].typeAccout !== typeAccout) {
            bol1 = 0;
          }
        }
      });
    }
    if (bol1 === 1) return false;
    else return true;
  };
  getElement(".nav-login .btDangNhap").onclick = () => {
    var txtTenDangNhap = getElement("#txtTenDangNhap");
    var matKhau = getElement("#matKhau");
    var a = txtTenDangNhap.value;
    var b = matKhau.value;
    var c = getElement('.nav-login .accout input[type="radio"]:checked').value;
    if (checkEmpty(txtTenDangNhap)) {
      getElement(".body-login>p").innerText = "Bạn chưa điền tên đăng nhập";
      return true;
    }
    if (checkEmpty(matKhau)) {
      getElement(".body-login>p").innerText = "Bạn chưa điền mật khẩu";
      return true;
    }
    if (setLogins(a, b, c) === true) {
      getElement(".body-login>p").innerText =
        "Tài khoản hoặc mật khẩu không đúng!";
      return;
    }
    getElement(".body-login>p").innerText = ``;
    localStorage.setItem("tenLogin", JSON.stringify(a));
    if (c == "User") {
      window.location.href = "../publish/user.html";
    } else {
      window.location.href = "../publish/Admin.html";
    }
    txtTenDangNhap.value = ``;
    matKhau.value = ``;
  };
};
