<script lang="ts" setup>
defineProps<{
  type: string;
  value: string;
  placeholder: string;
  iconLeft?: string;
  iconRight?: string;
}>();
defineEmits(['onInputChange']);
</script>

<template>
  <div
    class="flex items-center rounded-lg bg-[#EFF0F1] px-2 ring-blue-700 focus-within:ring-2"
  >
    <div v-if="iconLeft" v-html="iconLeft" />

    <input
      :value="value"
      :type="type"
      class="flex-1 border-none bg-transparent px-2 outline-none focus:outline-0 focus:ring-0"
      :placeholder="placeholder"
      @input="$emit('onInputChange', $event.target.value)"
    />

    <div v-if="iconRight" v-html="iconRight" />
  </div>
</template>
