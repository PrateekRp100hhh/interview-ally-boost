
import { useEffect, useRef } from 'react';
import { MicIcon, MessageCircleIcon, BarChartIcon, BriefcaseIcon } from 'lucide-react';

const features = [
  {
    title: "AI-Powered Mock Interviews",
    description: "Engage in realistic interview scenarios with our advanced AI interviewer. Practice answering questions tailored to your industry and role.",
    icon: MicIcon
  },
  {
    title: "Personalized Feedback",
    description: "Receive detailed analysis of your responses, covering content quality, delivery, and areas for improvement.",
    icon: MessageCircleIcon
  },
  {
    title: "Progress Tracking",
    description: "Monitor your improvement over time with comprehensive analytics and performance metrics.",
    icon: BarChartIcon
  },
  {
    title: "Role-Specific Questions",
    description: "Practice with questions customized for your target position, from software engineering to marketing and beyond.",
    icon: BriefcaseIcon
  }
];

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={featuresRef} className="appear-animation space-y-8 text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-secondary border border-border text-sm font-medium">
            <span>Our Features</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything you need to nail your interviews
          </h2>
          
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools necessary to prepare effectively and build your interview confidence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-5 rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-foreground/70 flex-grow">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
