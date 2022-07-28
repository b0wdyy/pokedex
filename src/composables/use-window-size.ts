import { onBeforeUnmount, onMounted, ref } from 'vue';

interface useWindowSizeOptions {
  initialWidth?: number;
  initialHeight?: number;
}

export function useWindowSize(options: useWindowSizeOptions = {}) {
  const { initialWidth = Infinity, initialHeight = Infinity } = options;

  const width = ref(initialWidth);
  const height = ref(initialHeight);

  const update = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => {
    // run update to get widht and height on initial render
    if (window) {
      update();
      window.addEventListener('resize', update);
    }
  });

  onBeforeUnmount(() => {
    if (window) {
      window.removeEventListener('resize', update);
    }
  });

  return {
    width,
    height,
  };
}
