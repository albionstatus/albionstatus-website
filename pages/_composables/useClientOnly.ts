import { ref, onMounted } from "vue";

export function useClientOnly() {
  const mounted = ref(false);
  onMounted(() => {
    mounted.value = true;
  });
  return mounted;
}
