
export type SentimentResult = {
  sentiment: "extremely_positive" | "positive" | "neutral" | "negative" | "extremely_negative";
  score: number;
  message: string;
  productName: string;
  review: string;
  timestamp: string;
};
