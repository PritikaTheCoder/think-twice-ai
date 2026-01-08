import { Brain, Sparkles, ArrowRight, Clock, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function LandingPage({ onLogin, onRegister }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="animate-fade-in">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/30 animate-float">
              <Brain className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-foreground">Think</span>{" "}
              <span className="gradient-text">Twice</span>{" "}
              <span className="text-foreground">AI</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Pause. Reflect. Decide wisely.
              <br />
              <span className="text-foreground/80">See your future self before you act.</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Button variant="hero" size="xl" onClick={onRegister}>
              <Sparkles className="w-5 h-5" />
              Start Reflecting
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="glass" size="lg" onClick={onLogin}>
              Sign In
            </Button>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="glass-subtle p-6 text-left">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Future Simulation</h3>
              <p className="text-sm text-muted-foreground">See how you'll feel about this decision in 7 days</p>
            </div>
            
            <div className="glass-subtle p-6 text-left">
              <div className="w-10 h-10 rounded-xl bg-glow-amber/10 flex items-center justify-center mb-3">
                <Heart className="w-5 h-5 text-glow-amber" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Emotional Intelligence</h3>
              <p className="text-sm text-muted-foreground">Understand what's driving your urgency</p>
            </div>
            
            <div className="glass-subtle p-6 text-left">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Regret Prevention</h3>
              <p className="text-sm text-muted-foreground">Make choices you won't regret tomorrow</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-glass-border bg-card/40 backdrop-blur-sm">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>Think Twice AI — A reflection-based AI for mindful decision-making</p>
        </div>
      </footer>
    </div>
  );
}
