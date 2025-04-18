
import { SentimentResult } from "@/types/sentiment";

export const getSentimentDetails = (text: string, productName: string): SentimentResult => {
  const lowercaseText = text.toLowerCase();
  const timestamp = new Date().toLocaleString();
  
  if (lowercaseText.includes("amazing") || lowercaseText.includes("excellent") || lowercaseText.includes("outstanding")) {
    return {
      sentiment: "extremely_positive",
      score: 95,
      message: "Extremely positive sentiment detected! The review shows exceptional satisfaction.",
      productName,
      review: text,
      timestamp
    };
  } else if (lowercaseText.includes("good") || lowercaseText.includes("nice") || lowercaseText.includes("great")) {
    return {
      sentiment: "positive",
      score: 75,
      message: "Positive sentiment detected. The customer appears satisfied.",
      productName,
      review: text,
      timestamp
    };
  } else if (lowercaseText.includes("okay") || lowercaseText.includes("average") || lowercaseText.includes("decent")) {
    return {
      sentiment: "neutral",
      score: 50,
      message: "Neutral sentiment detected. The review is balanced.",
      productName,
      review: text,
      timestamp
    };
  } else if (lowercaseText.includes("bad") || lowercaseText.includes("poor") || lowercaseText.includes("disappointed")) {
    return {
      sentiment: "negative",
      score: 25,
      message: "Negative sentiment detected. The customer appears unsatisfied.",
      productName,
      review: text,
      timestamp
    };
  } else if (lowercaseText.includes("terrible") || lowercaseText.includes("horrible") || lowercaseText.includes("worst")) {
    return {
      sentiment: "extremely_negative",
      score: 5,
      message: "Extremely negative sentiment detected! The review shows strong dissatisfaction.",
      productName,
      review: text,
      timestamp
    };
  }
  
  return {
    sentiment: "neutral",
    score: 50,
    message: "Neutral sentiment detected. The review appears balanced.",
    productName,
    review: text,
    timestamp
  };
};
