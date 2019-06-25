export interface ErrorLog {
  type: string,
  asOfDate: Date,
  error?: string | Error
}
