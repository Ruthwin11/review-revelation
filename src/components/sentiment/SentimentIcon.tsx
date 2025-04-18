
import { Star, ThumbsUp, Meh, ThumbsDown, XCircle } from "lucide-react";

export const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case "extremely_positive":
      return <Star className="w-12 h-12 text-yellow-400" />;
    case "positive":
      return <ThumbsUp className="w-12 h-12 text-green-500" />;
    case "neutral":
      return <Meh className="w-12 h-12 text-yellow-500" />;
    case "negative":
      return <ThumbsDown className="w-12 h-12 text-red-500" />;
    case "extremely_negative":
      return <XCircle className="w-12 h-12 text-red-600" />;
    default:
      return <Meh className="w-12 h-12 text-yellow-500" />;
  }
};
