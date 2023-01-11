<template>
  <div>
    <input ref="inputNumberRef" type="number" :disabled="disableMark" v-model="inputNumber">
    <button :disabled="disableMark" @click="handleGuess">猜</button>
    <div>
      <div>已输入的结果:</div>
      <span v-for="item in inputResult">
        {{`${item} `}}
      </span>
    </div>
    <div :style="{color: rightOrWrong === '正确' ? 'green':'red'}">{{rightOrWrong}}</div>
    <button v-if="disableMark" @click="restart">重新开始</button>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
const rightNumber = ref(Math.floor(Math.random()*100 + 1));
const rightOrWrong = ref('');
const inputNumber = ref('');
const inputResult = ref([]);
const gameOver = ref(false);
const inputNumberRef = ref(null);
const handleGuess = () => {
  focusInput();
  if(inputNumber.value > rightNumber.value){
    rightOrWrong.value = '太大了'
  }else if(inputNumber.value < rightNumber.value){
    rightOrWrong.value = '太小了'
  }else{
    rightOrWrong.value = '正确'
  }
  inputResult.value.push(Number(inputNumber.value))
  inputNumber.value = '';
  if(inputResult.value.length === 10){
    gameOver.value = true;
  }
};
const restart = () => {
  rightNumber.value = Math.floor(Math.random()*100 + 1);
  rightOrWrong.value = '';
  inputNumber.value = '';
  inputResult.value = [];
  gameOver.value = false;  
  nextTick(() => {
    focusInput();
  })
}
const disableMark = computed(() => {
  return rightOrWrong.value === '正确' || gameOver.value
});
const focusInput = () => {  
  inputNumberRef.value.focus()
}
onMounted(() => {
  focusInput();
});
</script>
<style></style>