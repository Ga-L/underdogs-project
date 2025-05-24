const playlist = [
    { title: "Track 1", src: "./music/master_of_puppets_metallica.mp3" },
    { title: "Track 2", src: "./music/Not Like Us.mp3" },
    { title: "Track 3", src: "./music/Bombtrack.mp3" },
  ];
  
  let currentTrack = 0;
  const audio = new Audio();
  
  const playBtn = document.getElementById("play");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const trackTitle = document.getElementById("track-title");
  
  function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
    trackTitle.textContent = `🎵 ${track.title}`;
    audio.load();
  }
  
  function playTrack() {
    audio.play();
    playBtn.textContent = "⏸️";
  }
  
  function pauseTrack() {
    audio.pause();
    playBtn.textContent = "▶️";
  }
  
  function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    playTrack();
  }
  
  function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    playTrack();
  }
  
  // Handle play/pause toggle
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      playTrack();
    } else {
      pauseTrack();
    }
  });
  
  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);
  
  // Update track title on audio events
  audio.addEventListener("play", () => {
    trackTitle.textContent = `🎵 Now playing: ${playlist[currentTrack].title}`;
  });
  
  audio.addEventListener("pause", () => {
    trackTitle.textContent = `⏸️ Paused: ${playlist[currentTrack].title}`;
  });
  
  // Load the first track when DOM is ready
  window.addEventListener("DOMContentLoaded", () => {
    loadTrack(currentTrack);
  });
