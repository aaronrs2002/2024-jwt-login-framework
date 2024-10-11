let gaParam = "";
let url = window.location;

const profile = [{
    serverUrl: "http://localhost:5000",
    companyWebsite: "https://web-presence.biz/",
    companyName: "Web-Presence LLC",
    companyAddress: "YOUR ADDRESS",
    userEmail: "YOUR@EMAIL.COM",
    companyPhone: "555-555-5555",
    companyLogo: "https://web-presence.biz/img/MA_Logo.png",
    relay: "../endpoint/EmailRelay.php",
    socialMedia: [
        { link: "https://www.linkedin.com/in/aaronrs2002", theClass: "fab fa-linkedin" },
        { link: "https://github.com/aaronrs2002", theClass: "fab fa-github" },
        { link: "https://www.youtube.com/@web-presence-developer", theClass: "fab fa-youtube" },
        { link: "https://www.instagram.com/aaronrs2002/", theClass: "fab fa-instagram" },
        { link: "mailto:aaron@web-presence.biz", theClass: "far fa-paper-plane" }
    ],
    footerLinks: [
        { link: "https://aaronrs2002.github.io/black-jack/?" + gaParam + "&", name: "21" },
        { link: "https://aaronrs2002.github.io/texas-holdem/?" + gaParam + "&", name: "Poker" },
        { link: "https://aaronrs2002.github.io/bingo/?" + gaParam + "&", name: "Bingo" },
        { link: "https://aaronrs2002.github.io/javascript-slot-machine/index.html?" + gaParam + "&", name: "Slots" },
        { link: "https://aaronrs2002.github.io/word-game/?" + gaParam + "&", name: "WordFun" }],
    content: [{
        title: "home",
        text: "<div class='row'><div class='col-md-6'>Introducing the latest release of our JWT login framework, designed for seamless authentication in Node.js environments coupled with client-side simplicity using HTML and Vanilla JavaScript. This annual update brings enhanced security and efficiency to your web applications, leveraging the power of MySQL databases for robust data management. Whether you\'re a seasoned developer or just starting out, our framework empowers you to build secure, scalable login systems with ease. Upgrade now and unlock the full potential of your web projects!</div><div class='col-md-6'><iframe class='mediaFrame' src='https://www.youtube.com/embed/_MzoPQ3B8RQ?&amp;rel=0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' frameborder='0' allowfullscreen='' mozallowfullscreen='mozallowfullscreen' msallowfullscreen='msallowfullscreen' oallowfullscreen='oallowfullscreen' webkitallowfullscreen='webkitallowfullscreen'></iframe></div></div>",
    },
    {
        title: "about",
        text: "<p>Explore beyond mere login functionality with our comprehensive JWT framework for Node.js. In addition to seamless authentication, we provide a rich set of features to elevate your web application experience.</p><ul class='list-unstyled'><li><strong>1. Enhanced User Management:</strong> Empower your users with a settings page, granting them control over their accounts. They can effortlessly change passwords or even opt for account deletion, ensuring a personalized and secure experience.</li><li><strong>2. Seamless Communication:</strong> Our framework includes a contact form example, facilitating effortless communication between users and administrators. With easy integration, stay connected with your audience and address their queries promptly.</li><li><strong> 3. Personalized Profiles:</strong> Elevate user engagement with customizable profiles. Utilize a local JSON storage system to effortlessly manage and update user-specific information, including server locations, company details, logos, and social media links. Empower users to personalize their experience and foster a sense of belonging.</li><li><strong>4. Dynamic Theming:</strong> Elevate aesthetics with our theme selection feature, powered by Bootswatch. Users can personalize their interface, reflecting their style preferences. Theme choices and employment status seamlessly integrate with user profiles, providing a cohesive and immersive experience.</li><li><strong>5. Robust Data Management:</strong> Leveraging MySQL databases, our framework ensures robust data management, guaranteeing scalability and efficiency for your web application.</li></ul><p>Embark on a journey of innovation and user-centric design with our JWT framework. From streamlined authentication to personalized user experiences, unlock the full potential of your web application today.</p>",
    }
        ,
    {
        title: "settings",
        text: "default",
    }
        ,
    {
        title: "contact",
        text: "default",
    }
    ],
    themesList: ["Spacelab", "United", "Slate", "Cerulean", "Darkly", "Litera", "Materia", "Sandstone", "Superhero", "Cosmo", "Flatly", "Lumen", "Minty", "Simplex", "Solar", "Cyborg", "Journal", "Lux", "Pulse", "Sketchy", "Yeti", "Morph", "Quartz", "Vapor", "Zephyr"]


}];

//ADD BRAND
[].forEach.call(document.querySelectorAll(".companyLogo"), (e) => {
    e.setAttribute("src", profile[0].companyLogo);
});

[].forEach.call(document.querySelectorAll(".companyName"), (e) => {
    e.innerHTML = profile[0].companyName;
});

[].forEach.call(document.querySelectorAll(".companyWebsite"), (e) => {
    e.innerHTML = profile[0].companyName;
    e.setAttribute("href", profile[0].companyWebsite);
})
