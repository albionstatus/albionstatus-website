import { computed, ref, readonly, watch, onMounted } from "vue";
import { useIntervalFn, useWebNotification } from "@vueuse/core";
import { format } from "date-fns";
import type { StatusApiResponse } from "../_data/types.js";

const STATUS_CLASS_LOOKUP: Record<string, string> = {
  online: "text-green-700",
  offline: "text-red-800",
  default: "text-yellow-400",
};

const NOTIFICATION = {
  TITLE: "AlbionStatus - Server status changed",
  BODY_PREFIX: "The server is now",
  TAG: "server-status-notification",
  TIMEOUT: 10000,
};

interface InitialStatus {
  type: string;
  message: string;
}

export function useStatus(server: "was" | "ams" | "sgp", initial?: InitialStatus) {
  const status = ref(initial?.type ?? "???");
  const isFirstCheck = ref(!initial);
  const statusClasses = computed(
    () => STATUS_CLASS_LOOKUP[status.value] ?? STATUS_CLASS_LOOKUP.default,
  );

  const lastCheckedAt = ref<Date | null>(null);
  const formattedLastCheckedAt = computed(() =>
    lastCheckedAt.value ? format(lastCheckedAt.value, "HH:mm:ss") : "...",
  );

  const message = ref(initial?.message ?? "");
  const showMessage = computed(() => !["online", "???"].includes(status.value));

  const { isSupported, show, close } = useWebNotification({
    title: NOTIFICATION.TITLE,
    body: computed(() => `${NOTIFICATION.BODY_PREFIX} ${status.value}!`).value,
    tag: NOTIFICATION.TAG,
  });

  watch(status, () => {
    if (isFirstCheck.value) {
      isFirstCheck.value = false;
      return;
    }
    if (isSupported.value) {
      void show();
      setTimeout(() => close(), NOTIFICATION.TIMEOUT);
    }
  });

  async function fetchStatus() {
    try {
      const res = await fetch(`/api/${server}`);
      const data: StatusApiResponse = await res.json();
      status.value = data.type;
      lastCheckedAt.value = new Date();
      message.value = data.message ?? "";
    } catch {
      // Silently fail, will retry on next interval
    }
  }

  onMounted(() => {
    if (initial) {
      // Set the timestamp client-side to avoid server/client timezone mismatch
      lastCheckedAt.value = new Date();
    } else {
      void fetchStatus();
    }
  });

  useIntervalFn(fetchStatus, 30 * 1000);

  return {
    status: readonly(status),
    statusClasses: readonly(statusClasses),
    formattedLastCheckedAt: readonly(formattedLastCheckedAt),
    message: readonly(message),
    showMessage,
  };
}
