<template>
  <div>
    <button @click="handleRecorder">录音</button>
    <ul ref="audioList">

    </ul>
  </div>
</template>
<script setup>
import {ref} from 'vue'
const RecordRTC = require('recordrtc')
const audioList = ref(null)
const handleRecorder = () => {
  navigator.mediaDevices.getUserMedia({
    audio: true
  }).then(async function(stream){
    let recorder = RecordRTC(stream,{
      type:'audio/wav'
    });
    recorder.startRecording();
    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);
    recorder.stopRecording(function(){
      let blob = recorder.toURL();
      invokeSaveAsDialog(blob);
    });
  });
}
const invokeSaveAsDialog = (blob) => {
  const audio = document.createElement('audio');
  audio.setAttribute('controls', true);
  const source = document.createElement('source');
  source.src = blob;
  source.type = 'audio/wav'
  audio.appendChild(source);
  audioList.value.appendChild(audio)
  console.log(blob)
}
</script>