export interface CurrencyInfo {
  timestamp: number,
  success: boolean,
  error: string,
  ticker: Ticker
}

export interface Ticker {
  base: string,
  target: string,
  price: string,
  volume: string, 
  change: string
}