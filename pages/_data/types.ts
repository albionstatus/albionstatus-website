export interface StatusApiResponse {
  type: string;
  message: string;
  comment?: string;
  createdAt?: string | Date;
}

export interface ProcessedChartDatapoint {
  offlineMinutes: number;
  onlineMinutes: number;
  hour: number;
}

export interface FaqContent {
  question: string;
  answer: string;
}
