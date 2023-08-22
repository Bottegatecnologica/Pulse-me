// NON MODIFICARE E NON CANCELLARE (di BELLUSCIO ANTONIO)

function apriChiudiInfo() {
  var info = document.getElementById("pannello-info");
  if (info.classList.contains("aperto")) {
    info.classList.remove("aperto")
  } else {
    info.classList.add("aperto")
  }
}

function attivaDisattivaAudio() {
  if (getAudioContext().state == 'suspended') {
    getAudioContext().resume();
  } else {
    if (getMasterVolume() > 0) {
      masterVolume(0);
    } else {
      masterVolume(1);
    }
  }
}