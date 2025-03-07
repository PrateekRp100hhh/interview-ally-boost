
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockData = [
  {
    name: 'Communication',
    score: 78,
    avg: 65,
  },
  {
    name: 'Content',
    score: 85,
    avg: 70,
  },
  {
    name: 'Confidence',
    score: 65,
    avg: 60,
  },
  {
    name: 'Clarity',
    score: 82,
    avg: 68,
  },
  {
    name: 'Structure',
    score: 90,
    avg: 72,
  },
];

const mockDetailedFeedback = {
  strengths: [
    "Clear articulation of past experiences",
    "Strong problem-solving approach",
    "Well-structured responses",
    "Confident delivery of technical explanations",
  ],
  improvements: [
    "Provide more quantitative results",
    "Elaborating on team contributions",
    "Prepare more varied examples",
    "Reduce usage of filler words",
  ],
};

type ProgressCardProps = {
  title: string;
  value: number;
  subtitle: string;
  color: string;
};

const ProgressCard = ({ title, value, subtitle, color }: ProgressCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium">{title}</p>
          <div className="flex items-center">
            <div 
              className="relative h-16 w-16 flex items-center justify-center rounded-full mr-4"
              style={{ 
                background: `conic-gradient(${color} ${value}%, transparent ${value}%)`,
              }}
            >
              <div className="absolute inset-[3px] bg-card rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold">{value}%</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FeedbackAnalysis = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Your Performance Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <ProgressCard 
            title="Overall Score" 
            value={82} 
            subtitle="Excellent performance" 
            color="rgb(var(--primary) / 1)" 
          />
          <ProgressCard 
            title="Communication" 
            value={78} 
            subtitle="Above average" 
            color="#4CAF50" 
          />
          <ProgressCard 
            title="Content Quality" 
            value={85} 
            subtitle="Excellent" 
            color="#2196F3" 
          />
          <ProgressCard 
            title="Interview Readiness" 
            value={80} 
            subtitle="Well prepared" 
            color="#FF9800" 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        border: 'none'
                      }} 
                    />
                    <Bar dataKey="score" fill="hsl(var(--primary))" name="Your Score" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="avg" fill="hsl(var(--muted))" name="Average" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Detailed Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="strengths">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="strengths">Strengths</TabsTrigger>
                  <TabsTrigger value="improvements">Improvements</TabsTrigger>
                </TabsList>
                <TabsContent value="strengths" className="space-y-4 mt-4">
                  <ul className="space-y-2">
                    {mockDetailedFeedback.strengths.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-green-500"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="improvements" className="space-y-4 mt-4">
                  <ul className="space-y-2">
                    {mockDetailedFeedback.improvements.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-amber-500"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-foreground/80">
              <p>
                Based on your performance across multiple mock interviews, here are some personalized recommendations:
              </p>
              <ol className="space-y-4 pl-5 list-decimal">
                <li>
                  <strong>Strengthen your STAR examples</strong> - Your responses show good structure, but could benefit from more specific metrics and outcomes to demonstrate impact.
                </li>
                <li>
                  <strong>Practice technical explanations</strong> - Continue refining your ability to explain complex concepts in simple terms. Consider recording yourself and reviewing for clarity.
                </li>
                <li>
                  <strong>Enhance your storytelling</strong> - Your answers could be more engaging with a clearer narrative arc. Practice connecting your experiences to the specific requirements of the role.
                </li>
                <li>
                  <strong>Prepare for follow-up questions</strong> - Anticipate deeper dives into your examples and prepare additional details to support your main points.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeedbackAnalysis;
