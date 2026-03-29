<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useIntervalFn } from "@vueuse/core";
import { Bar } from "vue-chartjs";
import type { ChartOptions } from "chart.js";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import type { ProcessedChartDatapoint, StatusApiResponse } from "../_data/types.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{
  initialData?: StatusApiResponse[];
}>();

const rotateArray = <T>(arr: T[], n: number): T[] => arr.slice(n).concat(arr.slice(0, n));

const data = ref<StatusApiResponse[]>(props.initialData ? props.initialData.slice().reverse() : []);

async function fetchData() {
  try {
    const res = await fetch("/api/ams/past/day");
    const json: StatusApiResponse[] = await res.json();
    data.value = json.slice().reverse();
  } catch {
    // Will retry on next interval
  }
}

onMounted(() => {
  // If we have initial SSR data, skip first fetch
  if (!props.initialData?.length) {
    void fetchData();
  }
});
useIntervalFn(fetchData, 30 * 1000);

const formattedHour = (d: number) =>
  d < 12 ? `${d === 0 ? 12 : d}am` : `${d === 12 ? 12 : d - 12}pm`;

const shiftedHourData = computed((): ProcessedChartDatapoint[] => {
  const multiDimensionalHourArray: boolean[][] = Array.from({ length: 24 }, () => []);

  data.value.forEach((currentData) => {
    const hourFromCreatedAtDate = new Date(currentData.createdAt as string | Date).getUTCHours();
    const hourArray = multiDimensionalHourArray[hourFromCreatedAtDate];
    hourArray.push(currentData.type === "online");
  });

  const mappedHourData = multiDimensionalHourArray.map((hourArray, index) => {
    const offlineMinutes = hourArray.filter((d) => !d).length;
    return {
      onlineMinutes: hourArray.length - offlineMinutes,
      offlineMinutes,
      hour: index,
    };
  });

  return rotateArray(mappedHourData, new Date().getUTCHours());
});

const labels = computed(() => shiftedHourData.value.map((d) => formattedHour(d.hour)));
const datasets = computed(() => [
  {
    label: "not tracked",
    data: shiftedHourData.value.map((d) => Math.max(0, 60 - d.offlineMinutes - d.onlineMinutes)),
    backgroundColor: "#868686",
  },
  {
    label: "offline",
    data: shiftedHourData.value.map((d) => Math.min(60, d.offlineMinutes)),
    backgroundColor: "#b13c28",
  },
  {
    label: "online",
    data: shiftedHourData.value.map((d) => Math.min(60, d.onlineMinutes)),
    backgroundColor: "#008F68",
  },
]);

const chartData = computed(() => ({
  labels: labels.value,
  datasets: datasets.value,
}));

const isForToday = (hourIn12Format: string) => {
  const isPm = hourIn12Format.endsWith("pm");
  const [hourNumberString] = hourIn12Format.match(/^(\d+)/) ?? [];
  const hour = Number(hourNumberString) + (isPm && hourNumberString !== "12" ? 12 : 0);
  return hour < new Date().getUTCHours();
};

const formattedDateHour = (hourString: string) => {
  const day = isForToday(hourString) ? "Today" : "Yesterday";
  return `${day} ${hourString} UTC`;
};

const chartOptions: ChartOptions<"bar"> = {
  plugins: {
    title: {
      display: true,
      text: "Server uptime of the last 24 hours",
    },
    tooltip: {
      mode: "index",
      callbacks: {
        title: ([tooltipItem]) => formattedDateHour(tooltipItem.label),
      },
      filter: (ctx) => ctx.formattedValue !== "0",
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { stacked: true },
    y: { stacked: true },
  },
};
</script>

<template>
  <div class="h-[500px]">
    <Bar css-classes="max-w-full" :options="chartOptions" :data="chartData" />
  </div>
</template>
