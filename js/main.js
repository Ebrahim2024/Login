var signupNameInput = document.getElementById("signupName");
var signupEmailInput = document.getElementById("signupEmail");
var signupPasswordInput = document.getElementById("signupPassword");
var signinEmailInput = document.getElementById("signinEmail");
var signinPasswordInput = document.getElementById("signinPassword");

var cartona = [];
if (localStorage.getItem("usersNames") == null) {
  cartona = [];
} else {
  cartona = JSON.parse(localStorage.getItem("usersNames"));
}

var username = localStorage.getItem("sessionUsername");
if (username) {
  document.getElementById("username").innerHTML =
    "Welcome " +
    username +
    " " +
    `<i class="fa-solid fa-hands-clapping"></i>
    `;
}

function isEmpty() {
  if (
    signupNameInput.value == "" ||
    signupEmailInput.value == "" ||
    signupPasswordInput.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function Empty() {
  if (signinPasswordInput.value == "" || signinEmailInput.value == "") {
    return false;
  } else {
    return true;
  }
}

function Exist() {
  for (var i = 0; i < cartona.length; i++) {
    if (
      cartona[i].email.toLowerCase() == signupEmailInput.value.toLowerCase()
    ) {
      return false;
    }
  }
}
function signUp() {
  if (isEmpty() == false) {
    document.getElementById("demo").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }
  var signUp = {
    name: signupNameInput.value,
    email: signupEmailInput.value,
    password: signupPasswordInput.value,
  };
  if (cartona.length == 0) {
    cartona.push(signUp);
    localStorage.setItem("usersNames", JSON.stringify(cartona));
    document.getElementById("demo").innerHTML =
      '<span class="text-success m-3">success</span>';
    return true;
  }
  if (Exist() == false) {
    document.getElementById("demo").innerHTML =
      '<p class="text-danger m-3 p-3">email already exists</p>';
  } else {
    cartona.push(signUp);
    localStorage.setItem("usersNames", JSON.stringify(cartona));
    document.getElementById("demo").innerHTML =
      '<p class="text-success m-3 p-3">Success</p>';
  }
}
// The pathname property of the Location interface is a string containing the path of the URL for the location. If there is no path, pathname will be empty:
// otherwise, pathname contains an initial '/' followed by the path of the URL, not including the query string or fragment.
var pass = location.pathname.split("/");
var URL = "";
for (var i = 0; i < pass.length - 1; i++) {
  URL += "/" + pass[i];
}

function login() {
  var password = signinPasswordInput.value;
  var email = signinEmailInput.value;
  if (Empty() == false) {
    document.getElementById("True").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }
  for (var i = 0; i < cartona.length; i++) {
    if (
      cartona[i].email.toLowerCase() == email.toLowerCase() &&
      cartona[i].password.toLowerCase() == password.toLowerCase()
    ) {
      localStorage.setItem("sessionUsername", cartona[i].name);
      if (URL == "/") {
        // The location.hostname property returns the host (IP adress or domain) of a URL.
        // The location.hostname property can also be set, to navigate to the same URL with a new hostname.

        location.replace("https://" + location.hostname + "/index3.html");
      } else {
        location.replace(URL + "/index3.html");
      }
    } else {
      document.getElementById("True").innerHTML =
        '<span class="p-2 text-danger">incorrect email or password</span>';
    }
  }
}

dInput = document.getElementById("signinPassword");

var nameRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
signupEmailInput.addEventListener("input", function () {
  validate(signupEmailInput, nameRegex);
});

function validate(ele1, ele2) {
  var testRegex = ele2;
  if (testRegex.test(ele1.value)) {
    ele1.classList.add("is-valid");
    ele1.classList.remove("is-invalid");
  } else {
    ele1.classList.add("is-invalid");
    ele1.classList.remove("is-valid");
  }
}
