<script setup lang="ts">
import { DateTime } from 'luxon'
import { useIntervalFn } from '@vueuse/core'
import { Bar } from 'vue-chartjs'
import type { ChartOptions } from 'chart.js'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import type { ChartApiResponse, ProcessedChartDatapoint } from '~/types'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const rotateArray = (arr: Array<any>, n: number) => arr.slice(n, arr.length).concat(arr.slice(0, n))

const { data, refresh } = useAsyncData<ChartApiResponse[]>(async () => {
  const timestamp = DateTime.utc().minus({ days: 1 }).toISO()

  const res = await $fetch<ChartApiResponse[]>(`/api/status/?timestamp=${timestamp}`)
  return res.slice().reverse()
}, {
  server: false,
})

const THIRTY_SECONDS = 30 * 1000
useIntervalFn(() => { refresh() }, THIRTY_SECONDS)

const formattedHour = (d: number) => d < 12
  ? `${d === 0 ? 12 : d}am`
  : `${d === 12 ? 12 : d - 12}pm`

const shiftedHourData = computed((): ProcessedChartDatapoint[] => {
  const multiDimensionalHourArray: boolean[][] = Array.from({ length: 24 }, () => [])

  data.value?.forEach((currentData) => {
    const hourFromCreatedAtDate = Number(currentData.created_at.slice(11, 13))
    const hourArray = multiDimensionalHourArray[hourFromCreatedAtDate]
    const serverOnlineAtTime = currentData.current_status === 'online'
    hourArray.push(serverOnlineAtTime)
  })

  const mappedHourData = multiDimensionalHourArray.map((hourArray, index) => {
    const offlineMinutes = hourArray.filter(d => !d).length
    const totalMinutesTracked = hourArray.length

    return {
      onlineMinutes: totalMinutesTracked - offlineMinutes,
      offlineMinutes,
      hour: index,
    }
  })

  return rotateArray(mappedHourData, (new Date()).getUTCHours())
})
const labels = computed(() => shiftedHourData.value.map(d => formattedHour(d.hour)))
const datasets = computed(() => [
  { label: 'not tracked', data: shiftedHourData.value.map(d => Math.max(0, 60 - d.offlineMinutes - d.onlineMinutes)), backgroundColor: '#868686' },
  { label: 'offline', data: shiftedHourData.value.map(d => Math.min(60, d.offlineMinutes)), backgroundColor: '#b13c28' },
  { label: 'online', data: shiftedHourData.value.map(d => Math.min(60, d.onlineMinutes)), backgroundColor: '#008F68' },
])

const chartData = computed(() => ({
  labels: labels.value,
  datasets: datasets.value,
}))

const isForToday = (hourIn12Format: string) => {
  const isPm = hourIn12Format.endsWith('pm')
  const [hourNumberString] = hourIn12Format.match(/^(\d+)/) ?? []
  const hour = Number(hourNumberString) + ((isPm && hourNumberString !== '12') ? 12 : 0)

  return hour < new Date().getUTCHours()
}

const formattedDateHour = (hourString: string) => {
  const day = isForToday(hourString) ? 'Today' : 'Yesterday'

  return `${day} ${hourString} UTC`
}

const chartOptions: ChartOptions<'bar'> = {
  plugins: {
    title: {
      display: true,
      text: 'Server uptime of the last 24 hours',
    },
    tooltip: {
      mode: 'index',
      callbacks: {
        title: ([tooltipItem]) => formattedDateHour(tooltipItem.label),
      },
      filter: ctx => ctx.formattedValue !== '0',
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
}
</script>

<template>
  <Bar css-classes="max-w-full xl:h-[500px]" :chart-options="chartOptions" :chart-data="chartData" />
</template>
