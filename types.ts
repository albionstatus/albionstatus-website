export type ChartApiResponse = {
  // eslint-disable-next-line camelcase
  created_at: string,
  // eslint-disable-next-line camelcase
  current_status: string
  message?: string
}

export type ProcessedChartDatapoint = {
  offlineMinutes: number,
  onlineMinutes: number,
  hour: number
}

export type FaqContent = {
  question: string,
  answer: string
}
