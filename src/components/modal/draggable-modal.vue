<script lang="ts" setup>
import { XCircleIcon } from '@heroicons/vue/solid';
import ButtonPrimary from '@/components/common/button/primary.vue';
import { ref } from 'vue';
import { useDrag } from '@vueuse/gesture';
import { useMotion } from '@vueuse/motion';

const Y_OFFSET_VALUE = 50;

const emit = defineEmits<{
  (e: 'onClose'): void;
  (e: 'onSubmitClick'): void;
}>();
defineProps<{
  title: string;
}>();

const element = ref<HTMLElement>();

const onSubmitClick = () => {
  emit('onSubmitClick');
  emit('onClose');
};

const onClose = () => {
  emit('onClose');
};

const dragHandler = ({
  movement: [_, y],
  dragging,
}: {
  movement: number[];
  dragging: boolean;
}) => {
  if (dragging) {
    if (y < 0) {
      // prevent dragging up
      return;
    }

    if (element.value) {
      element.value.style.transform = `translate3d(0, ${y}px, 0)`;
    }
    // prevent unnecessary body scrolling
    document.body.style.overflow = 'hidden';
  } else {
    if (element.value) {
      if (y > Y_OFFSET_VALUE) {
        // add this to add a transition when closing this
        element.value?.classList.add('transition-all');
        element.value.style.transform = `translate3d(0, 100%, 0)`;
        emit('onClose');

        // removing the classlist after 300ms
        setTimeout(() => {
          element.value?.classList.remove('transition-all');
        }, 300);
      } else {
        element.value.style.transform = `translate3d(0, 0, 0)`;
      }
    }
    document.body.style.overflow = '';
  }
};

useDrag(dragHandler, {
  domTarget: element,
});

useMotion(element, {
  initial: {
    y: -400,
  },
  enter: {
    y: 0,
  },
});
</script>

<template>
  <div class="relative h-screen">
    <div class="fixed inset-0 bg-black bg-opacity-40" @click="onClose"></div>

    <div
      ref="element"
      v-drag="dragHandler"
      class="fixed inset-x-0 bottom-0 flex h-[40vh] flex-col rounded-t-3xl bg-white px-4 py-8"
    >
      <div
        class="absolute top-2 right-1/2 h-1 w-12 translate-x-1/2 rounded-full bg-gray-300"
      />

      <x-circle-icon
        class="absolute top-3 right-3 h-8 w-8 text-gray-300"
        @click="onClose"
      />

      <h3 class="text-xl font-bold">{{ title }}</h3>

      <div class="my-4 flex-1 overflow-y-auto">
        <slot></slot>
      </div>

      <ButtonPrimary class="w-full" @click="onSubmitClick"
        >Toepassen</ButtonPrimary
      >
    </div>
  </div>
</template>
