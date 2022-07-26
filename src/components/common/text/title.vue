<script lang="ts" setup>
defineProps<{ type: 'h1' | 'h2' | 'h3', color: string }>();
</script>

<template>
  <component class="font-bold text-2xl" :class="color" :is="type">
    <slot></slot>
  </component>
</template>
