
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Software Engineer at Google",
    content: "Interview Prep Pro helped me nail my technical interviews. The AI feedback was spot-on and helped me refine my responses.",
    rating: 5
  },
  {
    name: "Sarah Mitchell",
    role: "Marketing Manager at Adobe",
    content: "After practicing with this app for two weeks, I felt so much more confident. I got offers from three companies!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    content: "The role-specific questions were exactly what I needed. This tool was instrumental in helping me prepare effectively.",
    rating: 4
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* How It Works Section */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Our simple three-step process will help you prepare for your interviews effectively.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="relative">
                <div className="glass-card rounded-lg p-6 h-full flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Select Your Role</h3>
                  <p className="text-foreground/70">
                    Choose from a wide range of industry roles and specializations to get tailored interview questions.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-8 w-8 text-primary/30" />
                </div>
              </div>
              
              <div className="relative">
                <div className="glass-card rounded-lg p-6 h-full flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Practice Interviews</h3>
                  <p className="text-foreground/70">
                    Engage with our AI interviewer in realistic mock interviews designed to simulate actual interview experiences.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-8 w-8 text-primary/30" />
                </div>
              </div>
              
              <div>
                <div className="glass-card rounded-lg p-6 h-full flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Get Feedback</h3>
                  <p className="text-foreground/70">
                    Receive detailed analysis and actionable feedback to improve your interview performance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <Link to="/interview">
                  Start Practicing Now
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Join thousands of professionals who have improved their interview skills with our platform.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="glass-card rounded-lg p-6 h-full flex flex-col">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-foreground/80 italic mb-6 flex-grow">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:max-w-lg">
                <h2 className="text-3xl font-bold mb-4">Ready to ace your next interview?</h2>
                <p className="text-foreground/70 mb-6">
                  Join thousands of professionals who have transformed their interview performance with Interview Prep Pro.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Unlimited mock interviews</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>AI-powered personalized feedback</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Role-specific questions and guidance</span>
                  </li>
                </ul>
                <Button size="lg" asChild>
                  <Link to="/interview" className="flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl transform rotate-3"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                    alt="Person in interview" 
                    className="relative z-10 rounded-xl shadow-xl object-cover max-w-sm" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
