import { onBeforeUnmount, onMounted, ref } from 'vue';

export function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  const update = (event: MouseEvent) => {
    x.value = event.clientX;
    y.value = event.clientY;
    console.log(x.value, y.value);
  };

  onMounted(() => {
    window.addEventListener('mousemove', update);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', update);
  });

  return {
    x,
    y,
  };
}
