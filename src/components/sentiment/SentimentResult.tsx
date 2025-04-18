
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { getSentimentIcon } from "./SentimentIcon";
import { SentimentResult as SentimentResultType } from "@/types/sentiment";

interface SentimentResultProps {
  result: SentimentResultType;
}

export const SentimentResult = ({ result }: SentimentResultProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-8 bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
        <div className="text-center space-y-6">
          {getSentimentIcon(result.sentiment)}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">
              {result.sentiment.split("_").map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(" ")} Sentiment
            </h3>
            <p className="text-gray-400">{result.message}</p>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.score}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
            />
          </div>
          <p className="text-lg font-semibold">
            Confidence Score: {result.score}%
          </p>
        </div>
      </Card>
    </motion.div>
  );
};
