<template>
  <details class="dropdown w-full" ref="details">
    <summary class="btn w-full">
      <AuthorCard v-if="modelValue && modelValue.id" :author="toRaw(modelValue)"></AuthorCard>
      <span v-else> Select Author </span>
    </summary>
    <ul class="w-full shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
      <li v-for="author in authors" @click="selectAuthor(author)" class="items-center">
        <AuthorCard :author="author"></AuthorCard>
      </li>
      <li v-show="false">
        <!--suppress JSUnresolvedReference -->
        <button class="btn" onclick="author_input.showModal()">Add Author</button>
      </li>
    </ul>
  </details>
  <dialog id="author_input" class="modal">
    <form method="dialog" class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <h3 class="font-bold text-lg">Hello!</h3>
      <p class="py-4">Press ESC key or click the button below to close</p>
      <div class="modal-action">
        <button class="btn">Close</button>
      </div>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import {Author} from "@/models";

const emit = defineEmits(["update:modelValue"])
const {modelValue} = defineProps({
  modelValue: {
    type: Author,
    required: true,
  }
});

const authors = await $myFetch<Author[]>("/authors");

const details = ref<HTMLDetailsElement | null>(null)
const selectAuthor = (author: Author) => {
  emit("update:modelValue", author)
  details.value?.removeAttribute("open")
}
</script>

<style scoped>

</style>