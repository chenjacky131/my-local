<template>
  <div>我是一个弹窗</div>
</template>
<script lang="ts" setup>
const open = () => {
  console.log("打开弹窗");
};
defineExpose({
  open,
});
</script>
