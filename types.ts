export interface StatusApiResponse {
  created_at: string
  type: string
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
