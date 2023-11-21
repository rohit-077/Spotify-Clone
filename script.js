let songIndex = 0;
let audioElement = new Audio("songs/s1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("progressBar");
let myTimeStamp = document.getElementById("timeStamp1");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById('masterSongName')
let masterArtistName = document.getElementById('masterArtistName')
let volumeBar = document.getElementById("volumeBar");
let heartIcon = document.getElementById("heartIcon");


let songs = [
  {
    songName: "Sherane aka Master Splinter's Daughter",
    artistName:"Kendrick Lamar",
    filePath: "s1.mp3" 
  },
  {
    songName: "Bitch, Don't Kill My Vibe",
    artistName:"Kendrick Lamar",
    filePath: "s2.mp3" 
  },
  {
    songName: "Backstreet Freestyle",
    artistName:"Kendrick Lamar",
    filePath: "s3.mp3" 
  },
  {
    songName: "The Art of Peer Pressure",
    artistName:"Kendrick Lamar",
    filePath: "s4.mp3" 
  },
  {
    songName: "Money Trees",
    artistName:"Kendrick Lamar, Jay Rock",
    filePath: "s5.mp3" 
  },
  {
    songName: "Poetic Justice",
    artistName:"Kendrick Lamar, Drake",
    filePath: "s6.mp3" 
  },
  {
    songName: "good kid",
    artistName:"Kendrick Lamar",
    filePath: "s7.mp3" 
  },
  {
    songName: "m.A.A.d city",
    artistName:"Kendrick Lamar, MC Eiht",
    filePath: "s8.mp3" 
  },
  {
    songName: "Swimming Pools(Drank)-Extended Version",
    artistName:"Kendrick Lamar",
    filePath: "s9.mp3" 
  },
  {
    songName: "Sing About Me, I'm Dying of Thirst",
    artistName:"Kendrick Lamar",
    filePath: "s10.mp3" 
  },
  {
    songName: "Real",
    artistName:"Kendrick Lamar, Anna Wise",
    filePath: "s11.mp3" 
  },
  {
    songName: "Compton",
    artistName:"Kendrick Lamar, Dr.Dre",
    filePath: "s12.mp3" 
  },
];


// Event Listening
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
  }
});

audioElement.addEventListener("timeupdate", () => {
  console.log("PB");
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;

  if (!audioElement.paused) {
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  } else {
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
  }

  myTimeStamp.innerText = formatTime(audioElement.currentTime);

});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

audioElement.addEventListener("timeupdate", () => {
  myTimeStamp.innerText = formatTime(audioElement.currentTime);
});

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  remainingSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  return minutes + ":" + remainingSeconds;
}

Array.from(document.getElementsByClassName('trackNo')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(!audioElement.paused){
            masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        }
        else{
            masterPlay.classList.remove("fa-paused-circle");
        masterPlay.classList.add("fa-play-circle");
        }
        console.log(e.target);
        songIndex = (e.target.id)-1;
        
        
        
        audioElement.src = `songs/s${songIndex+1}.mp3`;
        masterSongName.innerText= songs[songIndex].songName;
        masterArtistName.innerText=songs[songIndex].artistName;
        console.log(songIndex,songs[songIndex].songName)
        audioElement.currentTime=0;
        audioElement.play();
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if (songIndex < songs.length - 1) {
        songIndex += 1;
    } else {
        songIndex = 0;
    }
    
    audioElement.src = `songs/s${songIndex+1}.mp3`;
    masterSongName.innerText= songs[songIndex].songName;
    masterArtistName.innerText=songs[songIndex].artistName;

    audioElement.currentTime=0;
    audioElement.play();
    if(!audioElement.paused){
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    }
})

document.getElementById('prev').addEventListener('click',()=>{
    if (songIndex <= 0) {
        songIndex = songs.length - 1; 
    } else {
        songIndex -= 1;
    }
    
    audioElement.src = `songs/s${songIndex+1}.mp3`;
    masterSongName.innerText= songs[songIndex].songName;
    masterArtistName.innerText=songs[songIndex].artistName;

    audioElement.currentTime=0;
    audioElement.play();
    if(!audioElement.paused){
        masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    }
})


volumeBar.addEventListener("input", () => {
    let volume = volumeBar.value / 100; 
    audioElement.volume = volume;
});


heartIcon.addEventListener("click", () => {
    if (heartIcon.style.color === 'rgb(255, 255, 255)' || !heartIcon.style.color) {
        heartIcon.style.color = '#1ad471'; 
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid');
    } else {
        heartIcon.style.color = '#ffffff'; 
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
    }
});
