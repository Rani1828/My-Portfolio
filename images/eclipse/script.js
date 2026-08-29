
// .................................... ABOUT TABS ....................................

function opentab(tabname, element) {

    // Get all tab contents
    var tabcontents =
        document.getElementsByClassName("tab-contents");

    // Remove active-tab from all contents
    for (var i = 0; i < tabcontents.length; i++) {

        tabcontents[i].classList.remove("active-tab");

    }


    // Get all tab links
    var tablinks =
        document.getElementsByClassName("tab-links");

    // Remove active-link from all links
    for (var i = 0; i < tablinks.length; i++) {

        tablinks[i].classList.remove("active-link");

    }


    // Show selected tab
    document.getElementById(tabname)
        .classList.add("active-tab");


    // Highlight selected tab
    element.classList.add("active-link");
}



// ............................ MOBILE MENU ....................................

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}



// ............................ CONTACT FORM ....................................

const scriptURL =
    "https://script.google.com/macros/s/AKfycbxJwXGbR6CrowdssnSrEgEg_gT5__seI8WBeAYwtKDKyf4BxMzraMU1sJ8rej7w-Q9RiA/exec";


const form =
    document.forms["YOUR_FORM_NAME"];


const submitButton =
    document.getElementById("submitButton");


const formMessage =
    document.getElementById("formMessage");



// Check that the form exists before adding the event

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();


        // Disable button
        submitButton.disabled = true;


        // Change button text
        submitButton.innerHTML = "Sending...";


        // Show sending message
        formMessage.innerHTML =
            "Sending your message...";


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


            // Enable button
            submitButton.disabled = false;


            // Restore button
            submitButton.innerHTML =
                'Submit <i class="fa-solid fa-upload"></i>';


            // Success message
            formMessage.innerHTML =
                "Message sent successfully!";


            formMessage.style.color =
                "#00ff88";

        })


        .catch(function (error) {

            console.error("Error:", error);


            // Enable button
            submitButton.disabled = false;


            // Restore button
            submitButton.innerHTML =
                'Submit <i class="fa-solid fa-upload"></i>';


            // Error message
            formMessage.innerHTML =
                "Message failed. Please try again.";


            formMessage.style.color =
                "#ff004f";

        });

    });

}

// ================= MUSIC PLAYER =================

const songs = [

    {
        title: "Finding Her",
        artist: "Kushagra _ Vanshika _ Bharath _ Karan Maini",
        audio: "songs/song1.mp3",
        image: "images/song1.png"
    },

    {
        title: "Haareya",
        artist: "Ayushmann_ Parineeti _ Arijit Singh",
        audio: "songs/song2.mp3",
        image: "images/song2.png"
    },

    {
        title: "Boyfriend",
        artist: "Karan Aujla_ Sunanda _ Ikky",
        audio: "songs/song3.mp3",
        image: "images/song3.png"
    },

    {
        title: "Inaam",
        artist: "Jasleen Royal",
        audio: "songs/song4.mp3",
        image: "images/song4.png"
    },

    {
        title: "Fell For You",
        artist: "Shubh",
        audio: "songs/song5.mp3",
        image: "images/song5.png"
    },

    {
        title: "Musafir",
        artist: "Atif Aslam",
        audio: "songs/song6.mp3",
        image: "images/song6.png"
    }

];


let currentSongIndex = 0;


// Get HTML elements

const audioPlayer =
    document.getElementById("audio-player");

const songImage =
    document.getElementById("song-image");

const songTitle =
    document.getElementById("song-title");

const songArtist =
    document.getElementById("song-artist");

const playButton =
    document.getElementById("play-button");

const previousButton =
    document.getElementById("previous-button");

const nextButton =
    document.getElementById("next-button");

const progressBar =
    document.getElementById("progress-bar");

const currentTime =
    document.getElementById("current-time");

const duration =
    document.getElementById("duration");


// ================= LOAD SONG =================

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    songArtist.textContent = song.artist;

    songImage.src = song.image;

    audioPlayer.src = song.audio;

    progressBar.value = 0;

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";

}


// ================= PLAY / PAUSE =================

function playSong() {

    audioPlayer.play();

    playButton.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

}


function pauseSong() {

    audioPlayer.pause();

    playButton.innerHTML =
        '<i class="fa-solid fa-play"></i>';

}


playButton.addEventListener("click", function () {

    if (audioPlayer.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// ================= NEXT SONG =================

nextButton.addEventListener("click", function () {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {

        currentSongIndex = 0;

    }

    loadSong(currentSongIndex);

    playSong();

});


// ================= PREVIOUS SONG =================

previousButton.addEventListener("click", function () {

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex = songs.length - 1;

    }

    loadSong(currentSongIndex);

    playSong();

});


// ================= PROGRESS BAR =================

audioPlayer.addEventListener("timeupdate", function () {

    if (audioPlayer.duration) {

        progressBar.value =
            (audioPlayer.currentTime /
             audioPlayer.duration) * 100;

    }

    currentTime.textContent =
        formatTime(audioPlayer.currentTime);

});


// ================= SONG DURATION =================

audioPlayer.addEventListener("loadedmetadata", function () {

    duration.textContent =
        formatTime(audioPlayer.duration);

});


// ================= SEEK SONG =================

progressBar.addEventListener("input", function () {

    if (audioPlayer.duration) {

        audioPlayer.currentTime =
            (progressBar.value / 100) *
            audioPlayer.duration;

    }

});


// ================= AUTOMATIC NEXT SONG =================

audioPlayer.addEventListener("ended", function () {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {

        currentSongIndex = 0;

    }

    loadSong(currentSongIndex);

    playSong();

});


// ================= TIME FORMAT =================

function formatTime(time) {

    if (isNaN(time)) {

        return "0:00";

    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60);

    return minutes + ":" +
        (seconds < 10 ? "0" : "") +
        seconds;

}


// ================= FIRST SONG =================

loadSong(currentSongIndex);
