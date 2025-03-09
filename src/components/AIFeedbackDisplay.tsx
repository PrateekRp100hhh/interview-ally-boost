
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUpIcon, ThumbsDownIcon } from "lucide-react";

type AIFeedbackProps = {
  feedback: {
    feedbackText: string;
    strengths: string[];
    improvements: string[];
    score: number;
  };
};

const AIFeedbackDisplay = ({ feedback }: AIFeedbackProps) => {
  if (!feedback) return null;

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
        <h3 className="text-lg font-medium mb-4">AI Feedback:</h3>
        <p className="text-lg leading-relaxed">{feedback.feedbackText}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-border bg-background/50">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <div className="mb-2 rounded-full bg-green-100 w-10 h-10 flex items-center justify-center">
              <ThumbsUpIcon className="h-5 w-5 text-green-600" />
            </div>
            <h4 className="text-sm font-medium mb-1">Strengths</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {feedback.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-background/50">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <div className="mb-2 rounded-full bg-red-100 w-10 h-10 flex items-center justify-center">
              <ThumbsDownIcon className="h-5 w-5 text-red-600" />
            </div>
            <h4 className="text-sm font-medium mb-1">Areas to Improve</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {feedback.improvements.map((improvement, index) => (
                <li key={index}>{improvement}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-background/50">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <div className="mb-2 rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">{feedback.score}%</span>
            </div>
            <h4 className="text-sm font-medium mb-1">Overall Score</h4>
            <p className="text-sm text-muted-foreground">
              {feedback.score >= 90 ? "Excellent performance" :
               feedback.score >= 80 ? "Great performance" :
               feedback.score >= 70 ? "Good performance" :
               feedback.score >= 60 ? "Satisfactory performance" :
               "Needs improvement"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIFeedbackDisplay;
