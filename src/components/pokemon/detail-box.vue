<script lang="ts" setup>
defineProps<{ title: string }>();
</script>

<template>
  <div>
    <p class="mb-2 text-sm font-bold uppercase text-white">{{ title }}</p>
    <div class="rounded-lg bg-white p-5 shadow-lg">
      <slot></slot>
    </div>
  </div>
</template>
