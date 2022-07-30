<script lang="ts" setup>
import { XCircleIcon } from '@heroicons/vue/solid';
import ButtonPrimary from '@/components/common/button/primary.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useDrag, useGesture } from '@vueuse/gesture';
import { useMotion } from '@vueuse/motion';

const Y_OFFSET_VALUE = 50;

onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});

const emit = defineEmits<{
  (e: 'onClose'): void;
  (e: 'onSubmitClick'): void;
}>();
defineProps<{
  title: string;
}>();

const element = ref<HTMLElement>();
const touchesY = ref(0);

const shouldNotDrag = () => {
  if (!element.value) {
    return false;
  }

  return touchesY.value !== 0 && touchesY.value > element.value?.offsetTop + 80;
};

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
  if (!element.value) {
    return;
  }

  if (dragging) {
    if (shouldNotDrag()) {
      return;
    }

    if (y < 0) return;

    element.value.style.transform = `translate3d(0, ${y}px, 0)`;
  } else {
    if (element.value) {
      if (shouldNotDrag()) {
        return;
      }
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
  }
};

useDrag(dragHandler, {
  domTarget: element,
  useTouch: true,
});
useMotion(element, {
  initial: {
    y: -400,
  },
  enter: {
    y: 0,
  },
});
useGesture(
  {
    onTouchstart: ({ event }) => {
      // @ts-ignore
      if (event.targetTouches) {
        // @ts-ignore
        const [touches] = event.targetTouches;
        touchesY.value = touches.clientY;
      }
    },
  },
  {
    domTarget: element,
  }
);
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

      <h3 class="pb-4 text-xl font-bold">{{ title }}</h3>

      <div class="flex-1 overflow-y-auto">
        <slot></slot>
      </div>

      <ButtonPrimary class="mt-4 w-full" @click="onSubmitClick"
        >Toepassen</ButtonPrimary
      >
    </div>
  </div>
</template>
