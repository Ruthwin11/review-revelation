
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MoveRight, ThumbsUp, ThumbsDown, Meh, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    sentiment: "positive" | "negative" | "neutral";
    score: number;
  } | null>(null);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-500";
      case "negative":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="w-12 h-12" />;
      case "negative":
        return <ThumbsDown className="w-12 h-12" />;
      default:
        return <Meh className="w-12 h-12" />;
    }
  };

  const analyzeSentiment = async () => {
    if (!review.trim()) return;
    
    setLoading(true);
    // Temporary mock analysis - you'll need to connect to a real API later
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple mock sentiment analysis
    const words = review.toLowerCase();
    const positive = ['good', 'great', 'excellent', 'amazing', 'love'].some(word => words.includes(word));
    const negative = ['bad', 'poor', 'terrible', 'hate', 'awful'].some(word => words.includes(word));
    
    setResult({
      sentiment: positive ? "positive" : negative ? "negative" : "neutral",
      score: Math.random() * 100
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-block p-2 mb-4 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Sentiment Analysis
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Share your product review and let our AI analyze the sentiment
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-8 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
            <div className="space-y-6">
              <Textarea
                placeholder="Enter your product review here..."
                className="min-h-[150px] text-lg bg-transparent backdrop-blur-sm border-2 transition-all focus:border-purple-400 dark:focus:border-purple-500"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              
              <Button
                className="w-full gap-3 text-lg h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={analyzeSentiment}
                disabled={!review.trim() || loading}
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Analyze Sentiment
                    <MoveRight className="w-6 h-6" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>

        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          >
            <Card className="p-8 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <motion.div 
                className="text-center space-y-6"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`${getSentimentColor(result.sentiment)} transform transition-all duration-300 hover:scale-110`}>
                  {getSentimentIcon(result.sentiment)}
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                    {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)} Sentiment
                  </h2>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-2 w-48 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.score}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                      />
                    </div>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      {result.score.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
