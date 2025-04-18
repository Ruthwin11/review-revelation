
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MoveRight, ThumbsUp, ThumbsDown, Meh, Loader2 } from "lucide-react";
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
    <div className="min-h-screen p-8 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Sentiment Analysis</h1>
          <p className="text-gray-600">Share your product review and we'll analyze the sentiment</p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your product review here..."
              className="min-h-[120px] text-lg"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            
            <Button
              className="w-full gap-2 text-lg h-12 bg-[#9b87f5] hover:bg-[#8b77e5]"
              onClick={analyzeSentiment}
              disabled={!review.trim() || loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Analyze Sentiment
                  <MoveRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </Card>

        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6">
              <div className="text-center space-y-4">
                <div className={getSentimentColor(result.sentiment)}>
                  {getSentimentIcon(result.sentiment)}
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)} Sentiment
                  </h2>
                  <p className="text-gray-600">
                    Confidence Score: {result.score.toFixed(1)}%
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
