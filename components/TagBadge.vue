<template>
  <div class="badge badge-outline h-6">
    <span v-if="tag">
    {{ tag.name }} • {{ tag.cnt }}
    </span>
    <span v-else>Add Tag +</span>
  </div>
</template>

<script setup lang="ts">
import {Tag} from "@/models";

const {tag} = defineProps<{ tag?: Tag }>()
</script>

<style scoped>

</style>