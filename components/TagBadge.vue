<template>
  <div class="badge badge-outline h-6">
    {{ tag.name }}
    <span v-if="$attrs.cnt !== undefined">
     • {{ tag.cnt }}
    </span>
  </div>
</template>

<script setup lang="ts">
import {Tag} from "@/models";

const {tag} = defineProps<{ tag: Tag }>()
</script>

<style scoped>

</style>