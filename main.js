
document.addEventListener("DOMContentLoaded", function () {

    var musicNum = 0
    var musicNo = 0
    localStorage.setItem("Music Number", musicNum)
    localStorage.setItem("Music No", musicNo)

    allMusicFiles = []

    for (let i = 0; i < localStorage.length; i++) {
        let m = localStorage.getItem("Music " + musicNo)

        if (m) {
            allMusicFiles.push(m)
            musicNo = musicNo + 1
            localStorage.setItem("Music No", musicNo)
        }
    }

    var controls = document.getElementById("myAudio")
    var player = document.querySelector("#myAudio source")

    if (allMusicFiles.length > 0) {
        player.setAttribute("src", "../Music Player/Music/" + allMusicFiles[musicNum])
        controls.load()
    }

    let fileInput = document.getElementById("fileInput")
    fileInput.addEventListener('change', (event) => {
        const selectedFiles = event.target.files

        for (let i = 0; i < selectedFiles.length; i++) {
            let check = selectedFiles[i].name
            if (allMusicFiles.includes(check)) {
                break
            }
            if (check.endsWith(".mp3") || check.endsWith(".wav") || check.endsWith(".flac") || check.endsWith(".ogg") || check.endsWith(".m4a") || check.endsWith(".aac")) {
                allMusicFiles.push(check)
                localStorage.setItem("Music " + musicNo, check)
                musicNo = musicNo + 1
                localStorage.setItem("Music No", musicNo)
            }
        }

        player.setAttribute("src", "../Music Player/Music/" + allMusicFiles[musicNum])
        controls.load()

    })

    const audio = document.getElementById('myAudio')
    const rangeInput = document.getElementById('progress')

    audio.addEventListener('loadedmetadata', function () {
        rangeInput.max = audio.duration
        rangeInput.value = audio.currentTime
    })


    audio.addEventListener('timeupdate', function () {
        rangeInput.value = audio.currentTime
    })

    rangeInput.addEventListener('input', function () {
        audio.currentTime = rangeInput.value
    })

})


function changePlayButton() {

    if (allMusicFiles.length > 0) {

        let btn = document.querySelector(".mid-btn i")
        var audio = document.getElementById('myAudio')
        if (btn.className.includes("fa fa-play")) {
            btn.className = "fa fa-pause"
            audio.play()
        }
        else {
            btn.className = "fa fa-play"
            audio.pause()
        }
    }

}

function openFileChooser() {
    let fileInput = document.getElementById("fileInput")
    fileInput.click()
}

function nextMusic() {

    if (allMusicFiles.length != 0) {
        var player = document.querySelector("#myAudio source")
        var controls = document.getElementById("myAudio")
        var num = parseInt(localStorage.getItem("Music Number"))
        num = num + 1
        if (num > allMusicFiles.length - 1) {
            num = 0
        }

        player.setAttribute("src", "../Music Player/Music/" + allMusicFiles[num])
        controls.load()

        let btn = document.querySelector(".mid-btn i")
        if (btn.className.includes("fa fa-pause")) {
            controls.play()
        }
        localStorage.setItem("Music Number", num)
    }

}

function previousMusic() {
    if (allMusicFiles.length != 0) {
        var player = document.querySelector("#myAudio source")
        var controls = document.getElementById("myAudio")
        var num = parseInt(localStorage.getItem("Music Number"))
        num = num - 1
        if (num == -1) {
            num = allMusicFiles.length - 1
        }

        player.setAttribute("src", "../Music Player/Music/" + allMusicFiles[num])
        controls.load()

        let btn = document.querySelector(".mid-btn i")
        if (btn.className.includes("fa fa-pause")) {
            controls.play()
        }

        localStorage.setItem("Music Number", num)
    }
}

function showMenuBar () {

    let x = document.getElementsByClassName("menu-bar")
    x[0].style.display = "flex"
}

function hideMenuBar () {

    let x = document.getElementsByClassName("menu-bar")
    x[0].style.display = "none"
}