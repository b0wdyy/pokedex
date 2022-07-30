<script lang="ts" setup>
defineProps<{ loading: boolean }>();
</script>

<template>
  <transition name="fade">
    <div
      v-if="loading"
      class="absolute left-1/2 mt-4 flex flex-col items-center justify-center"
    >
      <div class="relative grid place-items-center">
        <div
          class="ani absolute h-6 w-6 animate-ping rounded-full border-2 border-slate-800"
        ></div>
        <div
          class="animation-delay-150 h-3 w-3 animate-ping rounded-full border-2 border-slate-800"
        ></div>
      </div>
    </div>
  </transition>
</template>
