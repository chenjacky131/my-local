<script setup lang="ts">
import { ref, reactive, computed, inject, onMounted, nextTick } from "vue";
import { key } from "@/assets/js/injectionKey";
import TestComponent from "@/components/TestComponent.vue";
const modal = ref<InstanceType<typeof TestComponent> | null>(null); //  为模板引用标注类型
interface Props {
  msg: string;
}
interface Book {
  title: string;
  year?: number;
}
const { msg = "World" } = defineProps<Props>(); //  泛型加接口标注props类型，并设置默认值
const emit = defineEmits<{
  (e: "update", id: string): void;
}>(); //  类型声明标注emit的类型
const sayHello = (event: Event) => {
  //  为事件处理函数标注类型
  modal.value?.open();
  console.log(event.target as HTMLDivElement);
  emit("update", "Cao");
};
const year = ref<string | number>(2000); //  为ref类型标注
year.value = "2022";
const book: Book = reactive({
  title: "哈利波特",
}); // 用接口显示标注reactive类型
const computedBook = computed<string>(() => {
  return `书名: ${book.title}`;
}); //  用泛型参数显示指定computed类型
const foo = inject(key);
const el = ref<HTMLDivElement | null>(null); //  为模板引用标注
onMounted(() => {
  console.log(el.value?.innerHTML);
});
</script>

<template>
  <div ref="el" @click="sayHello">Hello {{ msg }}</div>
  <div>year: {{ year }}</div>
  <div>book: {{ book.title }}</div>
  <div>computed book name: {{ computedBook }}</div>
  <div>injected: {{ foo }}</div>
  <TestComponent ref="modal" />
</template>

<style scoped></style>
