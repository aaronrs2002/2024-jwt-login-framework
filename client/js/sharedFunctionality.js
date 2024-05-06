const activeModule = document.querySelector("html").dataset.module;
let userEmail = null;

if (sessionStorage.getItem("email")) {
    userEmail = sessionStorage.getItem("email");
}
let isValidUser = false;
let token = null;
if (sessionStorage.getItem("token")) {
    token = sessionStorage.getItem("token")
}
let confirm = "default";
let alert = "default";
let alertType = "danger";

let infoMessage = "";
let newUser = false;

const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
}

//START GLOBAL ALERT
function globalAlert(alertLevel, message) {

    document.getElementById("globalAlert").classList.remove("hide");
    document.getElementById("globalAlert").classList.add(alertLevel);
    document.getElementById("globalAlert").classList.add("animated");
    document.getElementById("globalAlert").innerHTML = message;

    setTimeout(function () {
        document.getElementById("globalAlert").classList.add("hide");
        document.getElementById("globalAlert").classList.remove(alertLevel);
    }, 5000);

}

//CLIENT SIDE VALIDATE USER
const validateUser = (success, tokenPass, email, msg) => {
    if (success === 1) {
        isValidUser = true;
        token = tokenPass;
        sessionStorage.setItem("token", tokenPass);
        checkedToken = true;
        userEmail = email;
        sessionStorage.setItem("email", email);
        if (msg !== "token success") {
            window.location = "home.html";
        }
    } else {
        isValidUser = false;
        token = tokenPass;
        sessionStorage.removeItem("token");
        userEmail = null;
        globalAlert("alert-warning", "That didn't work: " + msg);
        logout();
    }
}





/* START CHANGE PASSWORD */
function setConfirm(confirmWhat) {

    [].forEach.call(document.querySelectorAll("[data-confirm]"), (e) => {
        e.classList.add("hide");
    });
    if (confirmWhat !== "default") {
        document.querySelector("[data-request='" + confirmWhat + "']").classList.add("hide");
        document.querySelector("[data-confirm='" + confirmWhat + "']").classList.remove("hide");
    } else {
        [].forEach.call(document.querySelectorAll("[data-request]"), (e) => {
            e.classList.remove("hide");
        });
    }
}

//CLIENT SIDE START LOG OUT

const logout = () => {
    isValidUser = false;
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");

    axios.put(profile[0].serverUrl + "/logout-uuid", {
        email: userEmail,
        uuid: "logged-out"
    }, config).then(
        (res) => {
            if (res.affectedRows === 1) {
                globalAlert("alert-success", "Logout success!");
                if (activeModule !== "login") {
                    window.location = "index.html";
                }
            } else {
                globalAlert("alert-warning", "We cleared your info from session storage.");
                window.location = "index.html";
            }
            return false;
        }, (error) => {
            globalAlert("alert-warning", "We cleared your info from session storage.");
        })

}
