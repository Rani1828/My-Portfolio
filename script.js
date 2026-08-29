// ..............................about tabs...................................

function opentab(tabname, element) {

    var tabcontents = document.getElementsByClassName("tab-contents");

    for (var i = 0; i < tabcontents.length; i++) {
        tabcontents[i].classList.remove("active-tab");
    }

    var tablinks = document.getElementsByClassName("tab-links");

    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active-link");
    }

    document.getElementById(tabname).classList.add("active-tab");

    element.classList.add("active-link");
}

// ........................mobile menubar visible.............................

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}


// .............................contact form..................................
const scriptURL =
    "https://script.google.com/macros/s/AKfycbyFe3xLmvdDFL1L-DKYD47go8gMu7N8HJ3tJytNS4trQGan_TVjFQCUiqu4FHqQP4Xi/exec";

const form = document.forms["YOUR_FORM_NAME"];

const submitButton =
    document.getElementById("submitButton");

const formMessage =
    document.getElementById("formMessage");


form.addEventListener("submit", function (e) {

    e.preventDefault();

    // Show sending message
    submitButton.disabled = true;

    submitButton.innerHTML = "Sending...";

    formMessage.innerHTML = "Sending your message...";
    formMessage.style.color = "white";


    // Send form to Google Apps Script
    fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
        mode: "no-cors"
    })

    .then(function () {

        // Clear form
        form.reset();

        // Restore button
        submitButton.disabled = false;

        submitButton.innerHTML =
            'Submit <i class="fa-solid fa-upload"></i>';

        // Success message
        formMessage.innerHTML =
            "Message sent successfully!";

        formMessage.style.color = "#00ff88";

    })

    .catch(function (error) {

        console.error("Error:", error);

        // Restore button
        submitButton.disabled = false;

        submitButton.innerHTML =
            'Submit <i class="fa-solid fa-upload"></i>';

        // Error message
        formMessage.innerHTML =
            "Message failed. Please try again.";

        formMessage.style.color = "#ff004f";

    });

});