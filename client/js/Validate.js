
const blkList = [];//email address that are blocked
let email = "";

const Validate = (fields) => {
    /*const letterOnly = /^[a-zA-Z\s-.]*$/;
    const numOnly = /^[0-9-().+]+$/;*/
    if (activeModule !== "login") {
        if (document.querySelector("input[name='legit']").value) {//check if user is human
            document.querySelector("input[name='legit']").classList.add("error");
        } else {
            document.querySelector("input[name='legit']").classList.remove("error");
        }
    }

    for (let i = 0; i < fields.length; i++) {//validate each field in array with a loop
        let value = "";

        try {
            if (document.querySelector("[name='" + fields[i] + "']").value) {
                value = document.querySelector("[name='" + fields[i] + "']").value;

            }
        } catch (err) {
            document
                .querySelector("[name='" + fields[i] + "']")
                .classList.add("error");
        }

        const maxCharNum = document.querySelector("[name='" + fields[i] + "']").getAttribute("maxLength");

        if (value.length <= Number(maxCharNum) && value.length > 0) {
            if (document.querySelector(".error[name='" + fields[i] + "']")) {
                document.querySelector("[name='" + fields[i] + "']").classList.remove("error");
            }
        } else {
            document
                .querySelector("[name='" + fields[i] + "']")
                .classList.add("error");
        }

        if (fields[i] === "email") {//XX@XX.XX format required
            email = document.querySelector("[name='" + fields[i] + "']").value;
            email = email.toLowerCase();
            var atpos = email.indexOf("@");
            var dotpos = email.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
                document
                    .querySelector("[name='" + fields[i] + "']")
                    .classList.add("error");
            } //end if
        }

        if (blkList.indexOf(email) !== -1) {//do not allow these emails to post
            globalAlert("alert-warning", email + ". Please, stop emailing me.");
            return false;
        }

        if (fields[i] === "phone") {//clear everythikng except numbers
            let phone = 0;
            let tempPhone = "";
            try {
                if (document.querySelector("[name='" + fields[i] + "']").value) {
                    phone = document.querySelector("[name='" + fields[i] + "']").value;
                }
            } catch (error) {
                console.log("Phone field is empty.")
            }
            for (let i = 0; i < phone.length; i++) {
                phone[i] = Number(phone[i]);
                if (!isNaN(Number(phone[i]))) {
                    tempPhone = tempPhone + phone[i];
                }
                tempPhone = tempPhone.trim();
                document.querySelector("[name='phone']").value = tempPhone;
            }
            if (typeof Number(phone[i]) == "number") {
                phone = tempPhone;
            }

            if (phone.length > 20 || phone.length < 10) {
                document.querySelector("[name='" + fields[i] + "']").classList.add("error");
            }
        }
    }

    if (document.querySelector("#portfolioContact button[type='submit']")) {
        if (document.querySelector(".error")) {
            document.querySelector("#portfolioContact button[type='submit']").disabled = true;
            document.querySelector("#portfolioContact").setAttribute("action", "");

            return false;
        } else {
            document.querySelector("#portfolioContact button[type='submit']").disabled = false;

            document.querySelector("#portfolioContact").setAttribute("action", profile[0].relay);
        }
    }
};


function runningProcess() {
    if (document.querySelector(".error")) {
        globalAlert("alert-danger", "There is something wrong with your form.");
        return false;
    } else {
        globalAlert("alert-success", "Your form looks good. Let me take a few seconds to send the email.");
        document.querySelector("#portfolioContact button[type='submit']").disabled = true;
    }
}

function onHandleChange() {
    Validate(["name", "email", "phone", "message"]);
}

if (activeModule !== "login") {
    document.querySelector("[name='url']").value = window.location.href;
}
