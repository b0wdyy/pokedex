<script lang="ts" setup>
defineProps<{ valueKey: string }>();
</script>

<template>
  <div class="grid grid-cols-5 items-center">
    <p class="col-span-2 text-gray-400">{{ valueKey }}</p>
    <div class="col-span-3">
      <slot></slot>
    </div>
  </div>
</template>
