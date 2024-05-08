
const onHandlePswdChange = (e) => {
    if (document.querySelector("button.ckValidate.hide")) {
        document.querySelector("button.ckValidate").classList.remove("hide");
    }
    if (newUser === false) {
        Validate(["email", "password"]);
    } else {
        Validate(["email", "password1", "password2"]);
    }
}

function setNewUser(trueFalse) {
    if (trueFalse) {
        document.querySelector("div[data-newUser='true']").classList.add("hide");
        document.querySelector("div[data-newUser='false']").classList.remove("hide");
    } else {
        document.querySelector("div[data-newUser='true']").classList.remove("hide");
        document.querySelector("div[data-newUser='false']").classList.add("hide");
    }
}

const ckNewPassword = () => {
    localStorage.setItem("email", document.querySelector("input[name='email']").value.toLowerCase());
    localStorage.setItem("password", document.querySelector("input[name='password2']").value);
    onHandlePswdChange();
    let pass1 = "";
    if (document.querySelector("input[name='password1']")) {
        pass1 = document.querySelector("input[name='password1']").value;
    }
    let pass2 = "";
    if (document.querySelector("input[name='password2']").value) {
        pass2 = document.querySelector("input[name='password2']").value;
    }
    if (pass1 === pass2) {
        document.querySelector("button[name='newUser']").classList.remove("hide");
        document.querySelector("input[name='password2']").classList.remove("error");
    } else {
        document.querySelector("button[name='newUser']").classList.add("hide");
        document.querySelector("input[name='password2']").classList.add("error");
    }
}


//CLIENT SIDE CREAT USER
async function createUser() {
    const email = document.querySelector("input[name='newEmail']").value;
    const password = document.querySelector("input[name='password1']").value;
    const level = document.querySelector("select[name='level']").value;
    try {
        const response = await fetch(profile[0].serverUrl + "/newUser", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ theme: "css/bootstrap.min.css", "email": email, "level": level, "password": password }),
        });
        const res = await response.json();
        if (res.success !== 0) {
            newUser = false;
            setNewUser(false);
            document.querySelector("input[name='email']").value = email;
            document.querySelector("input[name='password']").value = password;

            if (document.querySelector("button.ckValidate")) {
                document.querySelector("button.ckValidate").classList.remove("hide");
            }
            globalAlert("alert-success", email + " has been added");
            localStorage.removeItem("email");
        } else {
            globalAlert("alert-danger", "That didn't work: " + res.message);
        }
    } catch (error) {
        globalAlert("alert-danger", "That didn't work: " + error);
    }
}


//CLIENT SIDE START LOGIN 
async function login() {
    userEmail = null;
    Validate(["email", "password"]);
    if (document.querySelector(".error")) {
        globalAlert("alert-danger", "There is an error in your form.");
        return false
    } else {
        const email = document.querySelector("input[name='email']").value.toLowerCase();
        const password = document.querySelector("input[name='password']").value;
        const response = await fetch(profile[0].serverUrl + "/login", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "email": email, "password": password }),
        });
        const res = await response.json();

        if (res.success === 1) {
            globalAlert("alert-success", email + " logged in.");


            if (res.results.theme) {
                window.alert("JSON.stringify(res): " + res.results.theme)
                localStorage.setItem("theme", res.results.theme);

            }
            validateUser(res.success, res.token, email, "logged in");
            localStorage.removeItem("password");
        } else {

            globalAlert("alert-danger", "That didn't work: " + res.data);
        }
    }
}


