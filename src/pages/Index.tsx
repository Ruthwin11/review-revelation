
import { useState } from "react";
import { BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { SentimentResult as SentimentResultType } from "@/types/sentiment";
import { ReviewInputForm } from "@/components/sentiment/ReviewInputForm";
import { SentimentResult } from "@/components/sentiment/SentimentResult";
import { HistorySection } from "@/components/sentiment/HistorySection";
import { getSentimentDetails } from "@/utils/sentimentAnalysis";

const Index = () => {
  const [productName, setProductName] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SentimentResultType | null>(null);
  const [history, setHistory] = useState<SentimentResultType[]>([]);

  const analyzeSentiment = async () => {
    if (!review.trim()) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const sentimentResult = getSentimentDetails(review, productName);
    setResult(sentimentResult);
    setHistory(prev => [sentimentResult, ...prev].slice(0, 5)); // Keep last 5 analyses
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center space-x-2 text-2xl font-bold">
            <BarChart2 className="w-8 h-8 text-purple-500" />
            <span>Product Review Sentiment Analysis</span>
          </div>
          <p className="text-gray-400">
            Analyze customer sentiment for any product reviews
          </p>
        </motion.div>

        <ReviewInputForm
          productName={productName}
          setProductName={setProductName}
          review={review}
          setReview={setReview}
          loading={loading}
          onAnalyze={analyzeSentiment}
        />

        {result && !loading && <SentimentResult result={result} />}
        
        <HistorySection history={history} />
      </div>
    </div>
  );
};

export default Index;
