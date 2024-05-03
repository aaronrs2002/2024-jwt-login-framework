
[].forEach.call(document.querySelectorAll(".nav-link[data-module]"), (e) => {
    e.classList.remove("active");
});
let toggleCl = ["show", "animated", "fadeIn"];
let mobileNav = true;
let mainLinks = "";
let checkedToken = false;
let themeOptions = "<option value='default'>Select Theme</option>";
for (let i = 0; i < profile[0].themesList.length; i++) {
    themeOptions = themeOptions + "<option value='" + profile[0].themesList[i].toLocaleLowerCase() + "'>Theme: <span class='capitalize'>" + profile[0].themesList[i] + "</span></option>";
}
document.getElementById("themes").innerHTML = themeOptions;
function navigateOut(selected) {
    window.location.href = profile[0].footerLinks[selected].link;
}
(() => {
    let footerLinksHTML = "";
    for (let i = 0; i < profile[0].footerLinks.length; i++) {
        footerLinksHTML = footerLinksHTML + "<button onClick='javascript:navigateOut(" + i + ")' class='btn btn-warning'>" + profile[0].footerLinks[i].name + "</button>";
    }
    document.querySelector("#footerLinks").innerHTML = footerLinksHTML;
})();
document.getElementById("contentTitle").innerHTML = profile[0].content[0].title;
document.getElementById("contentText").innerHTML = profile[0].content[0].text;
/*START NAVIGATING ANIMATION*/
function tadaRollover(element) {

    document
        .querySelector("[data-tada='" + element + "']")
        .classList.add("tada");
}
function tadaRollout(element) {
    document
        .querySelector("[data-tada='" + element + "']")
        .classList.remove("tada");
}

//START SOCIAL MEDIA
let socialHTML = "";
for (let i = 0; i < profile[0].socialMedia.length; i++) {
    socialHTML = socialHTML + `<a class="p-2 text-primary"  href="${profile[0].socialMedia[i].link
        }" target="_blank" title="${profile[0].socialMedia[i].link}" ><i class="${profile[0].socialMedia[i].theClass
        } animated"  onmouseover="javascript:tadaRollover('${profile[0].socialMedia[i].theClass
        }')" onmouseout="javascript:tadaRollout('${profile[0].socialMedia[i].theClass
        }')" data-tada="${profile[0].socialMedia[i].theClass
        }"></i></a>`;
}
document.querySelector("#socialMediaList").innerHTML = socialHTML;


function toggle(element) {
    [].forEach.call(document.querySelectorAll("[data-toggle]"), function (e) {
        e.classList.add("hide");
    });

    [].forEach.call(document.querySelectorAll("[data-toggle='" + element + "']"), function (e) {
        e.classList.remove("hide");
    });
}

/*END GLOBAL TOGGLE FUNCTION*/


//SAVE THEME
function changeTheme() {
    let whichTheme = document.getElementById("themes").value;
    if (whichTheme === "default") {
        return false;
    }
    axios.put(profile[0].serverUrl + "/edit-theme", {
        email: userEmail,
        theme: whichTheme
    }, config).then(
        (res) => {
            document.getElementById("themedStyle").setAttribute("href", "https://bootswatch.com/5/" + whichTheme + "/bootstrap.css");
            localStorage.setItem("theme", whichTheme);
        }, (error) => {
            globalAlert("alert-danger", "Theme Change failed.");
        }
    );

}

//START REFRESH
if (activeModule !== "login") {
    if (localStorage.getItem("theme")) {

        document.getElementById("themedStyle").setAttribute("href", "https://bootswatch.com/5/" + localStorage.getItem("theme") + "/bootstrap.css");
    }

    for (let i = 0; i < profile[0].content.length; i++) {
        mainLinks = mainLinks + "<li class='nav-item'><a class='nav-link' data-module='" + profile[0].content[i].title + "' href='#' onClick=\"toggleMobileNav('" + profile[0].content[i].title + "')\">" + profile[0].content[i].title + "</a></li>";
    }
    if (activeModule !== "login") {
        document.querySelector("#mobileNav ul.navbar-nav").innerHTML = mainLinks + "<li class='nav-item'><a class='nav-link capitalize' data-module='login' href='#' onClick=\"logout()\">logout</a></li>";
    }
}

if (sessionStorage.getItem("token") && checkedToken === false) {
    axios.get(profile[0].serverUrl + "/check-token/" + sessionStorage.getItem("email"), config).then(
        (res) => {
            try {
                if (res.status === 200 && res.data[0].token === sessionStorage.getItem("token")) {
                    [].forEach.call(document.querySelectorAll(".userEmail"), (e) => {
                        e.innerHTML = sessionStorage.getItem("email");
                    });
                } else {
                    globalAlert("alert-danger", "Wrong token");
                    logout();
                }
            } catch (error) {
                globalAlert("alert-danger", "Wrong token");
                console.log("TOKENS DO NOT MATCH: " + error);
                logout();
                return false
            }
        }, (error) => {
            if (activeModule !== "login") {
                globalAlert("alert-danger", "That token request didn't work.");
                window.location = "index.html";
            }
        }
    )
    checkedToken = true;
} else {
    if (activeModule !== "login") {
        globalAlert("alert-danger", "That token request didn't work ");
        window.location = "index.html";
    }
}


//START NAVIGATION
const toggleMobileNav = (whatSection) => {
    let prePopulated = ["settings", "contact", "logout", null];
    console.log("whatSection: " + whatSection)
    if (whatSection) {
        localStorage.setItem("activeModule", whatSection);
    }

    if (prePopulated.indexOf(whatSection) === -1) {

        for (let i = 0; i < profile[0].content.length; i++) {
            if (profile[0].content[i].title === whatSection) {
                document.querySelector(".nav-link[data-module='" + whatSection + "']").classList.add("active");
                document.getElementById("contentTitle").innerHTML = profile[0].content[i].title;
                document.getElementById("contentText").innerHTML = profile[0].content[i].text;
            }


            localStorage.setItem("activeModule", whatSection);
        }
        whatSection = "content";
    }

    [].forEach.call(document.querySelectorAll(".content[data-module]"), (e) => {
        e.classList.add("hide");
        for (let i = 0; i < toggleCl.length; i++) {
            e.classList.remove(toggleCl[i]);
        }
    });

    if (whatSection) {
        document.querySelector(".content[data-module='" + whatSection + "']").classList.remove("hide");
        for (let i = 0; i < toggleCl.length; i++) {
            document.querySelector(".content[data-module='" + whatSection + "']").classList.add(toggleCl[i]);
        }
        [].forEach.call(document.querySelectorAll(".nav-link[data-module]"), (e) => {
            e.classList.remove("active");
        });

    }


    if (mobileNav === false) {
        for (let i = 0; i < toggleCl.length; i++) {
            document.getElementById("mobileNav").classList.add(toggleCl[i]);
        }
        mobileNav = true;
    } else {
        for (let i = 0; i < toggleCl.length; i++) {
            document.getElementById("mobileNav").classList.remove(toggleCl[i]);
        }
        mobileNav = false;
    }

}

//START PERSISTENCE

let goHere = localStorage.getItem("activeModule");
if (!localStorage.getItem("activeModule")) {
    goHere = "home";
}
toggleMobileNav(goHere);



//START PASSWORD CHANGE
const changePassword = () => {
    const newPasswordElem = document.querySelector("input[name='new-password']");
    let newPassword = "";
    if (newPasswordElem) {
        newPassword = newPassword.value
    }
    if (newPassword !== "") {
        axios.put(profile[0].serverUrl + "/change-password",
            {
                email: sessionStorage.getItem("email"),
                password: document.querySelector("input[name='new-password']").value
            },
            config
        ).then(
            (res) => {
                if (res.data.affectedRows > 0) {
                    document.querySelector("[data-request='changePassword']").classList.remove("hide");

                    globalAlert("alert-success", "Password changed.");

                    document.querySelector("input[name='new-password']").value = "";
                    setConfirm("default");

                } else {

                    globalAlert("alert-danger", "Password change did NOT work.");
                }
            }, (error) => {

                globalAlert("alert-danger", "Password change did NOT work: " + error,);
            }
        )
    } else {
        newPasswordElem.classList.add("error");
    }
}


/*START DELETE USER*/
function deleteUser() {
    axios.delete(profile[0].serverUrl + "/delete-user/" + userEmail, config).then(
        (res) => {
            if (res.data.success === 0) {
                globalAlert("alert-danger", "There was a problem: " + res.data.message);
            }
            else if (res.data.email === sessionStorage.getItem("email")) {
                globalAlert("alert-success", userEmail + " was deleted successfully.");
                validateUser(0, "logged out", null, "logged out");
            }
        }, (error) => {
            globalAlert("alert-danger", "User was NOT deleted.");
        }
    )
}

