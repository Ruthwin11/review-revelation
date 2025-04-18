
import { Card } from "@/components/ui/card";
import { History } from "lucide-react";
import { motion } from "framer-motion";
import { SentimentResult } from "@/types/sentiment";
import { getSentimentIcon } from "./SentimentIcon";

interface HistorySectionProps {
  history: SentimentResult[];
}

export const HistorySection = ({ history }: HistorySectionProps) => {
  if (history.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-8 bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-purple-500" />
            <h3 className="text-xl font-semibold">Analysis History</h3>
          </div>
          <div className="space-y-4">
            {history.map((item, index) => (
              <div 
                key={index}
                className="p-4 bg-black/30 rounded-lg border border-gray-800"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold">{item.productName}</h4>
                    <p className="text-sm text-gray-400">{item.review}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{item.timestamp}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                        {item.sentiment.split("_").map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(" ")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getSentimentIcon(item.sentiment)}
                    <span className="text-sm font-semibold">{item.score}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
