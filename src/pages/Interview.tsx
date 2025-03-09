
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InterviewSimulator from '@/components/InterviewSimulator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, HelpCircle, Lightbulb, Video, MicIcon } from 'lucide-react';

const interviewTips = [
  {
    title: "Research the company",
    content: "Take time to understand the company's mission, values, products, and recent news before your interview.",
    icon: BookOpen
  },
  {
    title: "Practice the STAR method",
    content: "Use the Situation, Task, Action, Result framework to structure your answers to behavioral questions.",
    icon: Lightbulb
  },
  {
    title: "Prepare questions",
    content: "Have thoughtful questions ready for your interviewer to demonstrate your interest and engagement.",
    icon: HelpCircle
  },
  {
    title: "Check your tech",
    content: "For virtual interviews, test your camera, microphone, and internet connection beforehand.",
    icon: Video
  }
];

const Interview = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">AI Mock Interview</h1>
          
          {showWelcome ? (
            <Card className="glass-card border-0 mb-8 animate-fade-up">
              <CardContent className="p-8">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MicIcon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h2 className="text-2xl font-semibold">Welcome to your AI Mock Interview</h2>
                  
                  <p className="text-foreground/80">
                    You're about to begin a simulated interview with our AI interviewer. 
                    This experience is designed to help you practice and improve your interview skills 
                    in a realistic setting.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    <div className="bg-background rounded-lg p-4 text-left">
                      <h3 className="font-medium mb-2">How it works:</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="mr-2 font-medium">1.</span>
                          <span>Select your job role and interview type</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-medium">2.</span>
                          <span>Record your responses to interview questions</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-medium">3.</span>
                          <span>Receive AI-generated feedback and analysis</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-background rounded-lg p-4 text-left">
                      <h3 className="font-medium mb-2">Tips for best results:</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="mr-2 font-medium">•</span>
                          <span>Find a quiet environment with good lighting</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-medium">•</span>
                          <span>Speak clearly and at a moderate pace</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-medium">•</span>
                          <span>Treat this like a real interview</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <Button size="lg" onClick={() => setShowWelcome(false)}>
                    Start My Interview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              <Tabs defaultValue="simulator">
                <TabsList className="mb-4">
                  <TabsTrigger value="simulator">Interview Simulator</TabsTrigger>
                  <TabsTrigger value="tips">Interview Tips</TabsTrigger>
                </TabsList>
                
                <TabsContent value="simulator">
                  <InterviewSimulator />
                </TabsContent>
                
                <TabsContent value="tips">
                  <Card className="glass-card border-0">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-semibold mb-6">Expert Tips for Interview Success</h2>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {interviewTips.map((tip, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="mt-1 rounded-lg bg-primary/10 w-10 h-10 flex-shrink-0 flex items-center justify-center">
                              <tip.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium mb-2">{tip.title}</h3>
                              <p className="text-foreground/70">{tip.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
                        <h3 className="text-lg font-medium mb-3">Common Questions to Prepare For</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <span className="mr-2 text-primary font-medium">•</span>
                            <span>Tell me about yourself and your background.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 text-primary font-medium">•</span>
                            <span>What are your greatest strengths and weaknesses?</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 text-primary font-medium">•</span>
                            <span>Why do you want to work for this company?</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 text-primary font-medium">•</span>
                            <span>Where do you see yourself in five years?</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 text-primary font-medium">•</span>
                            <span>Describe a challenge you faced at work and how you handled it.</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="mt-6 text-center">
                        <Button onClick={() => {
                          const simulatorTab = document.querySelector('[data-value="simulator"]');
                          if (simulatorTab && simulatorTab instanceof HTMLElement) {
                            simulatorTab.click();
                          }
                        }}>
                          Return to Simulator
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Interview;
