
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeedbackAnalysis from '@/components/FeedbackAnalysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart3, Clock, Play, AreaChart, Trophy, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

type InterviewSession = {
  id: number;
  date: string;
  role: string;
  score: number;
  duration: string;
  questions: number;
};

const recentSessions: InterviewSession[] = [
  {
    id: 1,
    date: '2023-10-15',
    role: 'Software Engineer',
    score: 82,
    duration: '28 min',
    questions: 8,
  },
  {
    id: 2,
    date: '2023-10-10',
    role: 'Software Engineer',
    score: 75,
    duration: '22 min',
    questions: 6,
  },
  {
    id: 3,
    date: '2023-10-05',
    role: 'Product Manager',
    score: 78,
    duration: '30 min',
    questions: 7,
  },
];

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Your Dashboard</h1>
              <p className="text-foreground/70 mt-1">Track your progress and interview performance</p>
            </div>
            
            <Button asChild className="mt-4 md:mt-0">
              <Link to="/interview" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                New Interview
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 text-primary mr-2" />
                  <span className="text-2xl font-bold">12</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Practice Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-primary mr-2" />
                  <span className="text-2xl font-bold">5.2 hrs</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 text-primary mr-2" />
                  <span className="text-2xl font-bold">78%</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="analysis" className="mb-8">
            <TabsList>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="history">Session History</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analysis" className="pt-6">
              <FeedbackAnalysis />
            </TabsContent>
            
            <TabsContent value="history" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Interview Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Date</th>
                          <th className="text-left py-3 px-4 font-medium">Role</th>
                          <th className="text-left py-3 px-4 font-medium">Duration</th>
                          <th className="text-left py-3 px-4 font-medium">Questions</th>
                          <th className="text-left py-3 px-4 font-medium">Score</th>
                          <th className="text-right py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentSessions.map((session) => (
                          <tr key={session.id} className="border-b">
                            <td className="py-3 px-4">{formatDate(session.date)}</td>
                            <td className="py-3 px-4">{session.role}</td>
                            <td className="py-3 px-4">{session.duration}</td>
                            <td className="py-3 px-4">{session.questions}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div 
                                  className="h-2 w-16 bg-gray-200 rounded-full mr-2 overflow-hidden"
                                >
                                  <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ width: `${session.score}%` }}
                                  ></div>
                                </div>
                                <span>{session.score}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">View</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="outline">View All Sessions</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="calendar" className="pt-6">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <CardTitle>Practice Calendar</CardTitle>
                  <Calendar className="ml-auto h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8">
                    <AreaChart className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">Plan Your Practice Sessions</h3>
                    <p className="text-center text-muted-foreground max-w-md mb-6">
                      Schedule regular interview practice sessions to build your confidence
                      and improve your skills consistently.
                    </p>
                    <Button>Schedule a Session</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
