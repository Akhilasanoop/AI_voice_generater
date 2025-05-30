const voiceSelect = document.getElementById("voiceSelect");
const languageSelect = document.getElementById("language");

function loadVoices() {
  const voices = window.speechSynthesis.getVoices();
  voiceSelect.innerHTML = '';
  voices.forEach(voice => {
    if (voice.lang === languageSelect.value) {
      const option = document.createElement("option");
      option.textContent = voice.name + ' (' + voice.lang + ')';
      option.value = voice.name;
      voiceSelect.appendChild(option);
    }
  });
}

languageSelect.addEventListener("change", loadVoices);
window.speechSynthesis.onvoiceschanged = loadVoices;

function speakText() {
  const text = document.getElementById("text-input").value;
  const utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = Array.from(window.speechSynthesis.getVoices())
    .find(voice => voice.name === voiceSelect.value);
  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.lang = languageSelect.value;
  utterance.pitch = 1;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
  typeText(text);
}

function typeText(text) {
  const display = document.getElementById("typed-text");
  display.innerHTML = '';
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      display.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 50);
}
