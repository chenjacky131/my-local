<template>
  <button @click="handleRecord">录音</button>
  <pre id="log"></pre>
</template>
<script setup>
import Recorder from 'recorderjs'
import { reactive, onMounted } from 'vue'
const state = reactive({
  audio_context:'',
  input: '',
  recorder: ''
})
const __log = (e, data) => {
  log.innerHTML += "\n" + e + " " + (data || '');
}
const startUserMedia = (stream) => {
  state.input = state.audio_context.createMediaStreamSource(stream);
  __log('Media stream created.');

  state.input.connect(state.audio_context.destination);
  __log('Input connected to audio context destination.');

  state.recorder = new Recorder(state.input);
  __log('Recorder initialised.');
}
const init = () => {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    state.audio_context = new AudioContext;
    __log('Audio context set up.');
    __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    alert('No web audio support in this browser!');
  }

  navigator.getUserMedia({ audio: true }, startUserMedia, function (e) {
    __log('No live audio input: ' + e);
  });  
}

</script>
<style>
</style>