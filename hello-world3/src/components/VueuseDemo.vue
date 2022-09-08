<template>
  <div>
    {{x}}
  </div>
</template>
<script>
import { ref } from 'vue'
import { useMouse, useCounter } from '@vueuse/core'
export default {
  setup() {
    const { x, y } = useMouse()
    const { count, inc, dec } = useCounter()
    return {
      x, 
      y,
      count,
      inc,
      dec,
    }
  }
}
</script>