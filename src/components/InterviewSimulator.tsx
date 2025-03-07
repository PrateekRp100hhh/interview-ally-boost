
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MicIcon, PauseIcon, PlayIcon, StopIcon, ThumbsUpIcon, ThumbsDownIcon, RotateCwIcon } from 'lucide-react';

type Question = {
  id: number;
  text: string;
};

type InterviewType = 'behavioral' | 'technical' | 'leadership';

const mockQuestions: Record<InterviewType, Question[]> = {
  behavioral: [
    { id: 1, text: "Tell me about a time when you had to adapt to a significant change at work." },
    { id: 2, text: "Describe a situation where you had to resolve a conflict within your team." },
    { id: 3, text: "Tell me about a time when you failed at something. How did you handle it?" },
  ],
  technical: [
    { id: 1, text: "Explain how you would approach debugging a complex issue in a large codebase." },
    { id: 2, text: "Describe a technically challenging project you worked on and how you solved the problems you encountered." },
    { id: 3, text: "How do you stay updated with the latest technologies and methodologies in your field?" },
  ],
  leadership: [
    { id: 1, text: "Tell me about a time when you had to lead a team through a difficult situation." },
    { id: 2, text: "How do you motivate team members who are struggling with their tasks?" },
    { id: 3, text: "Describe a situation where you had to make an unpopular decision." },
  ],
};

const roles = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "Marketing Manager",
  "Sales Representative",
  "Project Manager",
  "HR Specialist",
];

const InterviewSimulator = () => {
  const [selectedRole, setSelectedRole] = useState<string>("Software Engineer");
  const [interviewType, setInterviewType] = useState<InterviewType>("behavioral");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    // Set initial question when interview type changes
    const randomIndex = Math.floor(Math.random() * mockQuestions[interviewType].length);
    setCurrentQuestion(mockQuestions[interviewType][randomIndex]);
    setFeedback(null);
  }, [interviewType]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    setFeedback(null);
  };

  const pauseRecording = () => {
    setIsPaused(true);
  };

  const resumeRecording = () => {
    setIsPaused(false);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    
    // Simulate generating feedback (would be AI-generated in a real app)
    setTimeout(() => {
      setFeedback(
        "Your answer was well-structured and covered key points effectively. Consider providing more specific examples to strengthen your response. Your pacing was good, and you maintained a confident tone throughout your answer."
      );
    }, 1500);
  };

  const nextQuestion = () => {
    const availableQuestions = mockQuestions[interviewType].filter(
      q => q.id !== currentQuestion?.id
    );
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    setCurrentQuestion(availableQuestions[randomIndex]);
    setRecordingTime(0);
    setFeedback(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="glass-card border-0 overflow-hidden">
        <Tabs defaultValue="interview" className="w-full">
          <TabsList className="grid grid-cols-2 mb-0">
            <TabsTrigger value="interview">Interview</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>
          
          <TabsContent value="interview" className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Role</label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Interview Type</label>
                  <Select value={interviewType} onValueChange={(value: InterviewType) => setInterviewType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <h3 className="text-lg font-medium mb-2">Current Question:</h3>
                <p className="text-xl">{currentQuestion?.text}</p>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="text-4xl font-mono">
                  {formatTime(recordingTime)}
                </div>
                
                <div className="flex space-x-4">
                  {!isRecording ? (
                    <Button 
                      size="lg" 
                      onClick={startRecording}
                      className="rounded-full h-16 w-16 flex items-center justify-center"
                    >
                      <MicIcon className="h-6 w-6" />
                    </Button>
                  ) : (
                    <>
                      {isPaused ? (
                        <Button 
                          variant="outline" 
                          size="lg" 
                          onClick={resumeRecording}
                          className="rounded-full h-14 w-14 flex items-center justify-center"
                        >
                          <PlayIcon className="h-6 w-6" />
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="lg" 
                          onClick={pauseRecording}
                          className="rounded-full h-14 w-14 flex items-center justify-center"
                        >
                          <PauseIcon className="h-6 w-6" />
                        </Button>
                      )}
                      
                      <Button 
                        variant="destructive" 
                        size="lg" 
                        onClick={stopRecording}
                        className="rounded-full h-16 w-16 flex items-center justify-center"
                      >
                        <StopIcon className="h-6 w-6" />
                      </Button>
                    </>
                  )}
                </div>
                
                <Button 
                  variant="ghost" 
                  onClick={nextQuestion}
                  disabled={isRecording}
                  className="flex items-center gap-2"
                >
                  <RotateCwIcon className="h-4 w-4" />
                  Skip to Next Question
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="feedback" className="p-6">
            {feedback ? (
              <div className="space-y-6">
                <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                  <h3 className="text-lg font-medium mb-4">AI Feedback:</h3>
                  <p className="text-lg leading-relaxed">{feedback}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border border-border bg-background/50">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                      <div className="mb-2 rounded-full bg-green-100 w-10 h-10 flex items-center justify-center">
                        <ThumbsUpIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium mb-1">Strengths</h4>
                      <p className="text-sm text-muted-foreground">Well-structured response with good pacing</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-border bg-background/50">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                      <div className="mb-2 rounded-full bg-red-100 w-10 h-10 flex items-center justify-center">
                        <ThumbsDownIcon className="h-5 w-5 text-red-600" />
                      </div>
                      <h4 className="text-sm font-medium mb-1">Areas to Improve</h4>
                      <p className="text-sm text-muted-foreground">Need more specific examples</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-border bg-background/50">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                      <div className="mb-2 rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">78%</span>
                      </div>
                      <h4 className="text-sm font-medium mb-1">Overall Score</h4>
                      <p className="text-sm text-muted-foreground">Above average performance</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button onClick={nextQuestion} className="flex items-center gap-2">
                    Try Another Question
                    <RotateCwIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="rounded-full bg-muted w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <MicIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Feedback Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Record your answer to receive AI-powered feedback on your interview performance.
                </p>
                <Button onClick={() => document.querySelector('[data-value="interview"]')?.click()}>
                  Go to Interview
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default InterviewSimulator;
