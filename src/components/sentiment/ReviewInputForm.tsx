
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ReviewInputFormProps {
  productName: string;
  setProductName: (name: string) => void;
  review: string;
  setReview: (review: string) => void;
  loading: boolean;
  onAnalyze: () => void;
}

const ExampleButton = ({ text, onClick }: { text: string; onClick: () => void }) => (
  <Button 
    variant="outline" 
    className="text-sm"
    onClick={onClick}
  >
    {text}
  </Button>
);

export const ReviewInputForm = ({
  productName,
  setProductName,
  review,
  setReview,
  loading,
  onAnalyze
}: ReviewInputFormProps) => {
  return (
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
                <ExampleButton text="This product is absolutely amazing!" onClick={() => setReview("This product is absolutely amazing!")} />
                <ExampleButton text="Good product, works as expected." onClick={() => setReview("Good product, works as expected.")} />
                <ExampleButton text="It's okay, nothing special." onClick={() => setReview("It's okay, nothing special.")} />
                <ExampleButton text="Poor quality, wouldn't recommend." onClick={() => setReview("Poor quality, wouldn't recommend.")} />
                <ExampleButton text="This is the worst product ever!" onClick={() => setReview("This is the worst product ever!")} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setReview("");
              }}
            >
              Clear
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={onAnalyze}
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
  );
};
