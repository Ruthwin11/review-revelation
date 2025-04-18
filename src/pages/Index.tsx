
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart2, 
  ThumbsUp, 
  ThumbsDown, 
  Meh,
  Star,
  XCircle,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";

type SentimentResult = {
  sentiment: "extremely_positive" | "positive" | "neutral" | "negative" | "extremely_negative";
  score: number;
  message: string;
};

const Index = () => {
  const [productName, setProductName] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SentimentResult | null>(null);

  const getSentimentDetails = (text: string): SentimentResult => {
    const lowercaseText = text.toLowerCase();
    
    if (lowercaseText.includes("amazing") || lowercaseText.includes("excellent") || lowercaseText.includes("outstanding")) {
      return {
        sentiment: "extremely_positive",
        score: 95,
        message: "Extremely positive sentiment detected! The review shows exceptional satisfaction."
      };
    } else if (lowercaseText.includes("good") || lowercaseText.includes("nice") || lowercaseText.includes("great")) {
      return {
        sentiment: "positive",
        score: 75,
        message: "Positive sentiment detected. The customer appears satisfied."
      };
    } else if (lowercaseText.includes("okay") || lowercaseText.includes("average") || lowercaseText.includes("decent")) {
      return {
        sentiment: "neutral",
        score: 50,
        message: "Neutral sentiment detected. The review is balanced."
      };
    } else if (lowercaseText.includes("bad") || lowercaseText.includes("poor") || lowercaseText.includes("disappointed")) {
      return {
        sentiment: "negative",
        score: 25,
        message: "Negative sentiment detected. The customer appears unsatisfied."
      };
    } else if (lowercaseText.includes("terrible") || lowercaseText.includes("horrible") || lowercaseText.includes("worst")) {
      return {
        sentiment: "extremely_negative",
        score: 5,
        message: "Extremely negative sentiment detected! The review shows strong dissatisfaction."
      };
    }
    
    return {
      sentiment: "neutral",
      score: 50,
      message: "Neutral sentiment detected. The review appears balanced."
    };
  };

  const getSentimentIcon = (sentiment: string) => {
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

  const analyzeSentiment = async () => {
    if (!review.trim()) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = getSentimentDetails(review);
    setResult(result);
    setLoading(false);
  };

  const ExampleButton = ({ text }: { text: string }) => (
    <Button 
      variant="outline" 
      className="text-sm"
      onClick={() => setReview(text)}
    >
      {text}
    </Button>
  );

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

        <Tabs defaultValue="single" className="w-full">
          <TabsList className="w-full bg-gray-900/50 border border-gray-800">
            <TabsTrigger value="single" className="w-1/2">Single Review</TabsTrigger>
            <TabsTrigger value="batch" className="w-1/2">CSV Batch</TabsTrigger>
          </TabsList>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-8 bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Product Name</h3>
                <Input
                  placeholder="e.g. iPhone 15, Samsung Galaxy S24"
                  className="bg-black/50 border-gray-700"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <p className="text-sm text-gray-400 mt-1">
                  Enter the name of the product being reviewed
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Review Text</h3>
                <Textarea
                  placeholder="Enter product review text here..."
                  className="min-h-[150px] bg-black/50 border-gray-700"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-gray-400">Or try an example review:</p>
                  <div className="flex flex-wrap gap-2">
                    <ExampleButton text="This product is absolutely amazing!" />
                    <ExampleButton text="Good product, works as expected." />
                    <ExampleButton text="It's okay, nothing special." />
                    <ExampleButton text="Poor quality, wouldn't recommend." />
                    <ExampleButton text="This is the worst product ever!" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setReview("");
                    setResult(null);
                  }}
                >
                  Clear
                </Button>
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={analyzeSentiment}
                  disabled={!review.trim() || loading}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Analyze Review
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {result && !loading && (
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
        )}
      </div>
    </div>
  );
};

export default Index;
