<script lang="ts" setup>
import { getPokemonStatTranslation } from '@/utils/helpers';

defineProps<{
  valueKey: string;
  stat: number;
}>();
</script>

<template>
  <div class="grid grid-cols-7 items-center">
    <p class="col-span-2 text-gray-400">
      {{ getPokemonStatTranslation(valueKey) }}
    </p>

    <div class="col-span-1">
      <span>{{ stat }}</span>
    </div>

    <div class="relative col-span-4 w-full">
      <div class="absolute h-1 w-full rounded-full bg-gray-200"></div>
      <div
        :class="{ 'bg-[#DF6563]': stat < 50, 'bg-[#70C18F]': stat >= 50 }"
        :style="{ width: `${stat}%` }"
        class="absolute h-1 rounded-full"
      ></div>
    </div>
  </div>
</template>
