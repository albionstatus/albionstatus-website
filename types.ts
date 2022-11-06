export interface ChartApiResponse {

  created_at: string

  current_status: string
  message?: string
}

export interface ProcessedChartDatapoint {
  offlineMinutes: number
  onlineMinutes: number
  hour: number
}

export interface FaqContent {
  question: string
  answer: string
}
