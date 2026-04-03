let wasMutedByExtension = false;
let previousVolume = 1;

function getVideo() {
  return document.querySelector('video');
}

function isAdPlaying() {
  return document.querySelector('.ad-showing') !== null;
}

function handleAdState() {
  const video = getVideo();
  if (!video) return;

  if (isAdPlaying()) {
    if (!video.muted) {
      previousVolume = video.volume;
      video.muted = true;
      wasMutedByExtension = true;
      console.log("🔇 Ad detected: muting");
    }
  } else {
    if (wasMutedByExtension) {
      video.muted = false;
      video.volume = previousVolume;
      wasMutedByExtension = false;
      console.log("🔊 Ad ended: restoring sound");
    }
  }
}

const observer = new MutationObserver(() => {
  handleAdState();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

setInterval(handleAdState, 1000);