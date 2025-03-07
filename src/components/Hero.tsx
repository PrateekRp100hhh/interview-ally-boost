
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-2xl animate-spin-slow"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div ref={heroRef} className="appear-animation max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
            <span>AI-Powered Interview Preparation</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight text-balance">
            Ace Your Next Interview with
            <span className="relative text-primary ml-3">
              Confidence
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/20 rounded-full"></span>
            </span>
          </h1>
          
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto text-balance">
            Practice with our AI-powered interview simulator, receive personalized feedback, and track your improvement over time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild>
              <Link to="/interview" className="flex items-center gap-2">
                Start Practicing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
          
          <div className="pt-10">
            <p className="text-sm text-foreground/60 mb-4">Trusted by professionals from</p>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
              <div className="text-foreground/40 font-semibold">GOOGLE</div>
              <div className="text-foreground/40 font-semibold">MICROSOFT</div>
              <div className="text-foreground/40 font-semibold">AMAZON</div>
              <div className="text-foreground/40 font-semibold">META</div>
              <div className="text-foreground/40 font-semibold">APPLE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
