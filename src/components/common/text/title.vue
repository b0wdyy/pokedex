<script lang="ts" setup>
defineProps<{ type: 'h1' | 'h2' | 'h3'; color: string }>();
</script>

<template>
  <component :is="type" class="text-3xl font-bold" :class="color">
    <slot></slot>
  </component>
</template>
