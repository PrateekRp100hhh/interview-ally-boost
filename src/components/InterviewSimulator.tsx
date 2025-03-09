import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { MicIcon, PauseIcon, PlayIcon, Square, ThumbsUpIcon, ThumbsDownIcon, RotateCwIcon, Save, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { generateQuestions, generateFeedback, InterviewType } from '@/utils/aiService';

type Question = {
  id: number;
  text: string;
};

const InterviewSimulator = () => {
  const [selectedRole, setSelectedRole] = useState<string>("Software Engineer");
  const [customRole, setCustomRole] = useState<string>("");
  const [showCustomRole, setShowCustomRole] = useState<boolean>(false);
  const [interviewType, setInterviewType] = useState<InterviewType>("behavioral");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState<boolean>(false);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, [selectedRole, customRole, showCustomRole, interviewType]);
  
  const fetchQuestions = async () => {
    setIsLoadingQuestion(true);
    try {
      // Use custom role if selected, otherwise use the predefined role
      const roleToUse = showCustomRole ? customRole : selectedRole;
      
      if (!roleToUse || roleToUse.trim() === '') {
        toast({
          title: "Error",
          description: "Please enter a valid profession or select one from the list.",
          variant: "destructive",
        });
        setIsLoadingQuestion(false);
        return;
      }
      
      const fetchedQuestions = await generateQuestions(roleToUse, interviewType);
      setQuestions(fetchedQuestions);
      
      if (fetchedQuestions?.length > 0) {
        const randomIndex = Math.floor(Math.random() * fetchedQuestions.length);
        setCurrentQuestion(fetchedQuestions[randomIndex]);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast({
        title: "Error",
        description: "Failed to load interview questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingQuestion(false);
    }
  };

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
    setCurrentAnswer("");
    
    toast({
      title: "Recording started",
      description: "Your answer is being recorded. Click the stop button when finished.",
    });
  };

  const pauseRecording = () => {
    setIsPaused(true);
  };

  const resumeRecording = () => {
    setIsPaused(false);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsPaused(false);
    
    if (currentQuestion) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    }
    
    toast({
      title: "Processing your answer",
      description: "Our AI is analyzing your response...",
    });
    
    const simulatedAnswer = "I believe my experience with cross-functional teams has prepared me well for this role. In my previous position, I had to coordinate between engineering, design, and product teams to deliver features on time. I implemented agile methodologies that improved our delivery time by 30%";
    setCurrentAnswer(simulatedAnswer);
    
    try {
      if (currentQuestion) {
        const feedbackData = await generateFeedback(currentQuestion.text, simulatedAnswer, showCustomRole ? customRole : selectedRole);
        setFeedback(feedbackData.feedbackText || "Your answer demonstrated good knowledge and structure, but could use more specific examples.");
        
        goToFeedbackTab();
      }
    } catch (error) {
      console.error('Error generating feedback:', error);
      setFeedback("Your answer was well-structured and covered key points effectively. Consider providing more specific examples to strengthen your response.");
      goToFeedbackTab();
    }
  };

  const saveInterview = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please sign in to save your interview progress.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    try {
      const interviewData = {
        user_id: user.id,
        role: selectedRole,
        interview_type: interviewType,
        questions: answeredQuestions,
        answers: { [currentQuestion?.id || 0]: currentAnswer },
        feedback: feedback ? { text: feedback } : null,
        score: 78
      };

      const { error } = await supabase
        .from('interviews')
        .insert(interviewData);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Your interview has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving interview:', error);
      toast({
        title: "Error",
        description: "Failed to save interview. Please try again.",
        variant: "destructive",
      });
    }
  };

  const nextQuestion = async () => {
    setIsLoadingQuestion(true);
    
    try {
      const availableQuestions = questions.filter(
        q => !answeredQuestions.some(aq => aq.id === q.id) && q.id !== currentQuestion?.id
      );
      
      if (availableQuestions.length === 0) {
        await fetchQuestions();
      } else {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        setCurrentQuestion(availableQuestions[randomIndex]);
      }
      
      setRecordingTime(0);
      setFeedback(null);
    } catch (error) {
      console.error('Error getting next question:', error);
      toast({
        title: "Error",
        description: "Failed to load the next question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  const goToFeedbackTab = () => {
    const feedbackTab = document.querySelector('[data-value="feedback"]');
    if (feedbackTab && feedbackTab instanceof HTMLElement) {
      feedbackTab.click();
    }
  };

  const handleRoleChange = (value: string) => {
    if (value === "custom") {
      setShowCustomRole(true);
      setSelectedRole("");
    } else {
      setShowCustomRole(false);
      setSelectedRole(value);
    }
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
                  <Select value={showCustomRole ? "custom" : selectedRole} onValueChange={handleRoleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Software Engineer", "Product Manager", "Data Scientist", "UX Designer", 
                      "Marketing Manager", "Sales Representative", "Project Manager", "HR Specialist"].map((role) => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                      <SelectItem value="custom">Enter Custom Profession</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {showCustomRole && (
                    <div className="mt-2">
                      <Input
                        placeholder="Enter your profession"
                        value={customRole}
                        onChange={(e) => setCustomRole(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  )}
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
              
              <div className="bg-muted/50 rounded-lg p-6 border border-border min-h-[120px] flex items-center justify-center">
                {isLoadingQuestion ? (
                  <div className="flex flex-col items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Loading question...</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-medium mb-2">Current Question:</h3>
                    <p className="text-xl">{currentQuestion?.text || "Loading question..."}</p>
                  </>
                )}
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
                      disabled={isLoadingQuestion || !currentQuestion}
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
                        <Square className="h-6 w-6" />
                      </Button>
                    </>
                  )}
                </div>
                
                <Button 
                  variant="ghost" 
                  onClick={nextQuestion}
                  disabled={isRecording || isLoadingQuestion}
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
                
                <div className="flex justify-center mt-6 space-x-4">
                  <Button onClick={nextQuestion} className="flex items-center gap-2">
                    Try Another Question
                    <RotateCwIcon className="h-4 w-4" />
                  </Button>
                  
                  {user && (
                    <Button 
                      variant="outline" 
                      onClick={saveInterview} 
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save Interview
                    </Button>
                  )}
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
                <Button onClick={() => {
                  const interviewTab = document.querySelector('[data-value="interview"]');
                  if (interviewTab && interviewTab instanceof HTMLElement) {
                    interviewTab.click();
                  }
                }}>
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
