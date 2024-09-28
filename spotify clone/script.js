let previous = document.querySelector(".previous-btn");
let next = document.querySelector(".next-btn");
let play_btn = document.querySelector(".play-btn");
let song_range = document.querySelector("#song-range");
let currentDuration = document.querySelector(".current-duration");
let totalDuration = document.querySelector(".total-duration");
let songDisplayName = document.querySelector(".currentSongName");
let currentSongImage = document.querySelector(".currentImage");
let songName = document.querySelectorAll(".song-name");
let volume_range = document.getElementById("volume-range");
let currentGifImage = document.querySelector(".current-gif-image");
let playlistBtn = document.querySelector(".playlist-btn");
let playListContainer = document.querySelector(".playlist-container");
let crossBtn = document.querySelector(".cross-btn");
let currentImage2 = document.querySelector(".current-image-2");
let currentSongName2 = document.querySelector(".current-playing-song");
let faAutoIcon = document.querySelector(".fa-redo");
let repeatBtn = document.querySelector(".repeat-btn");
let faRepeatIcon = document.querySelector(".fa-arrows-rotate");
const songDuration = document.querySelectorAll(".song-duration");
const pause_btn = document.querySelectorAll(".pause-btn");
const gifImage = document.querySelectorAll(".gif-image");
const playListSongName = document.querySelectorAll(".play-list-song");
const playListSongDuration = document.querySelectorAll(".playlist-song-duration");
const gitImage2 = document.querySelectorAll(".gif-image-2");
const pauseBtn2 = document.querySelectorAll(".pause-btn-2");

let autoPlayBtn = document.querySelector(".autoplay-btn");

let currentSong = 0;

let songArray = [
      { song_name: "Arabian Night", song_url: "songs/1.mp3", song_image_url: "images/1.jpeg" },
      { song_name: "Fiha Remix", song_url: "songs/2.mp3", song_image_url: "images/2.jpeg" },
      { song_name: "Don Omar", song_url: "songs/3.mp3", song_image_url: "images/3.jpeg" },
      { song_name: "JVLA", song_url: "songs/4.mp3", song_image_url: "images/4.jpeg" },
      { song_name: "Khalouni N3ich", song_url: "songs/5.mp3", song_image_url: "images/5.jpeg" },
      { song_name: "London View", song_url: "songs/6.mp3", song_image_url: "images/6.jpeg" },
      { song_name: "Romanialyrics", song_url: "songs/7.mp3", song_image_url: "images/7.jpeg" },
      { song_name: "Indila", song_url: "songs/8.mp3", song_image_url: "images/8.jpeg" },
      { song_name: "CLANDESTINA", song_url: "songs/9.mp3", song_image_url: "images/9.jpeg" },
      { song_name: "CJ Whoopty", song_url: "songs/10.mp3", song_image_url: "images/10.jpeg" },
];

playlistBtn.addEventListener("click", () => {
      if (!playListContainer.classList.contains("show")) {
            playListContainer.classList.add("show");
      }
})
crossBtn.addEventListener("click", () => {
      playListContainer.classList.remove("show");
})

songName.forEach((elem, ind) => elem.textContent = songArray[ind].song_name);
playListSongName.forEach((elem, ind) => elem.textContent = songArray[ind].song_name);

let secondsMinutesDuration = () => {
      
}

songDuration.forEach((elem, ind) => {
      let audio = new Audio(songArray[ind].song_url);
      audio.addEventListener("loadedmetadata", () => {
            let minutes = Math.floor(audio.duration / 60);
            let seconds = Math.floor(audio.duration % 60);
            elem.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      });
});

playListSongDuration.forEach((elem, ind) => {
      let audio = new Audio(songArray[ind].song_url);
      audio.addEventListener("loadedmetadata", () => {
            let minutes = Math.floor(audio.duration / 60);
            let seconds = Math.floor(audio.duration % 60);
            elem.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      });
});
let audioElem = new Audio(songArray[currentSong].song_url);

audioElem.addEventListener("loadedmetadata", () => {
      let minutes = Math.floor(audioElem.duration / 60);
      let seconds = Math.floor(audioElem.duration % 60);
      totalDuration.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
});

let updateSong = () => {
      audioElem.src = songArray[currentSong].song_url;
      audioElem.play();
      songDisplayName.textContent = songArray[currentSong].song_name;
      currentSongName2.textContent = songArray[currentSong].song_name;
      currentSongImage.src = songArray[currentSong].song_image_url;
      currentImage2.src = songArray[currentSong].song_image_url;
      play_btn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
      pause_btn[currentSong].innerHTML = `<i class="fa-solid fa-pause"></i>`;
      pauseBtn2[currentSong].innerHTML = `<i class="fa-solid fa-pause"></i>`;
      gifImage[currentSong].style.display = "inline-block";
      currentGifImage.style.display = "inline-block";
      gitImage2[currentSong].style.display = "inline-block";
};

let buttonsImagesStyle = () => {
      gifImage[currentSong].style.display = "none";
      gitImage2[currentSong].style.display = "none";
      pause_btn[currentSong].innerHTML = `<i class="fa-solid fa-play"></i>`;
      pauseBtn2[currentSong].innerHTML = `<i class="fa-solid fa-play"></i>`;
}

let autoPlay = () => {
      if (audioElem.currentTime === audioElem.duration) {
            buttonsImagesStyle();
            currentSong++;
            if (currentSong >= songArray.length) {
                  currentSong = 0;
            }
            updateSong();
      }
}

audioElem.addEventListener("timeupdate", () => {
      song_range.value = audioElem.currentTime / audioElem.duration * 100;
      let minutes = Math.floor(audioElem.currentTime / 60);
      let seconds = Math.floor(audioElem.currentTime % 60);
      currentDuration.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      if (audioElem.currentTime === audioElem.duration) {
            play_btn.innerHTML = `<i class="fa-solid fa-play"></i>`;
            currentGifImage.style.display = "none";
            buttonsImagesStyle();
      }
});

autoPlayBtn.addEventListener("click", () => {
      if (autoPlayBtn.classList.contains("active")) {
            autoPlayBtn.classList.remove("active");
            clearInterval(autoPlayInterval);
            faAutoIcon.style.backgroundColor = "transparent";
      }
      else {
            autoPlayBtn.classList.add("active");
            audioElem.loop = false;
            autoPlayInterval = setInterval(autoPlay, 3000);
            faAutoIcon.style.backgroundColor = "#23d45f";
            faRepeatIcon.style.backgroundColor = "transparent";
            currentGifImage.style.display = "none";
            buttonsImagesStyle();
      }
})

repeatBtn.addEventListener("click", () => {
      if (repeatBtn.classList.contains("active")) {
            repeatBtn.classList.remove("active");
            audioElem.loop = false;
            faRepeatIcon.style.backgroundColor = "transparent";
      }
      else {
            repeatBtn.classList.add("active");
            audioElem.loop = true;
            faRepeatIcon.style.backgroundColor = "#23d45f";
            faAutoIcon.style.backgroundColor = "transparent";
            clearInterval(autoPlayInterval);
      }
})

song_range.addEventListener("change", () => {
      audioElem.currentTime = (song_range.value * audioElem.duration) / 100;
});

play_btn.addEventListener("click", () => {
      if (audioElem.paused) {
            audioElem.play();
            play_btn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
            pause_btn[currentSong].innerHTML = `<i class="fa-solid fa-pause"></i>`;
            pauseBtn2[currentSong].innerHTML = `<i class="fa-solid fa-pause"></i>`;
            gifImage[currentSong].style.display = "inline-block";
            gitImage2[currentSong].style.display = "inline-block";
            currentGifImage.style.display = "inline-block";
      }
      else {
            audioElem.pause();
            play_btn.innerHTML = `<i class="fa-solid fa-play"></i>`;
            currentGifImage.style.display = "none";
            buttonsImagesStyle();
      }
});

previous.addEventListener("click", () => {
      buttonsImagesStyle();
      currentSong--;
      if (currentSong < 0) {
            currentSong = songArray.length - 1;
      }
      updateSong();
});

next.addEventListener("click", () => {
      buttonsImagesStyle();
      currentSong++;
      if (currentSong >= songArray.length) {
            currentSong = 0;
      }
      updateSong();
});

let clickChangeSong = (index) => {
      buttonsImagesStyle();
      currentSong = index;
      play_btn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
      updateSong();
}

const pausePlay = (ind) => {
      if (audioElem.src !== songArray[ind].song_url) {
            clickChangeSong(ind);
      }
      else if (audioElem.paused) {
            audioElem.play();
      }
      else {
            audioElem.pause();
      }
};

pause_btn.forEach((elem, ind) => {
      elem.addEventListener("click", (e) => {
            pausePlay(ind);
      });
});
pauseBtn2.forEach((elem, ind) => {
      elem.addEventListener("click", (e) => {
            pausePlay(ind);
      })
})
volume_range.addEventListener("change", () => {
      audioElem.volume = volume_range.value / 100;
});