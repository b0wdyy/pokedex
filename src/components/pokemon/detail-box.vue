<script lang="ts" setup>
defineProps<{ title: string }>();
</script>

<template>
  <div>
    <p class="text-sm font-bold uppercase text-white">{{ title }}</p>
    <div class="rounded-lg bg-white p-4 p-4">
      <slot></slot>
    </div>
  </div>
</template>
