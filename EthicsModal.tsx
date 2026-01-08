import { useState } from "react";
import { Shield, Eye, Brain, Heart, Lock, CheckCircle, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EthicsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const principles = [
  {
    icon: Brain,
    title: "Reflective, Not Directive",
    description: "This system does not make decisions for you. It offers perspectives to support your own judgment.",
    detail: "We believe the best decisions come from within. Our role is to help you pause and consider — never to prescribe or command.",
  },
  {
    icon: Lock,
    title: "Your Data Stays Private",
    description: "All reflections are stored locally on your device. No personal data leaves your browser.",
    detail: "We use no external servers, no cloud storage, no analytics on your personal thoughts. Your mind is yours alone.",
  },
  {
    icon: Eye,
    title: "Transparent Processing",
    description: "Our simulations use rule-based logic, not black-box AI. You can understand how we work.",
    detail: "The 'Future You' scenarios are generated from patterns in emotional and urgency data — not from mysterious neural networks.",
  },
  {
    icon: Heart,
    title: "Human-Centered Design",
    description: "Every feature prioritizes your wellbeing over engagement or retention.",
    detail: "We don't use dark patterns, manipulation, or addictive mechanics. If you leave, we've succeeded in helping you move forward.",
  },
];

const commitments = [
  "We will never sell or share your data",
  "We will always explain how our features work",
  "We will never use manipulative design patterns",
  "We will prioritize your autonomy over our metrics",
  "We will remain honest about our limitations",
];

export function EthicsModal({ open, onOpenChange }: EthicsModalProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="w-6 h-6 text-primary" />
            AI Ethics & Trust
          </DialogTitle>
          <DialogDescription>
            Our commitment to responsible, human-centered AI
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Hero Statement */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20">
            <p className="text-foreground leading-relaxed">
              Think Twice AI is designed to <strong>augment your judgment</strong>, not replace it. 
              We believe technology should help humans think more clearly — not think for them.
            </p>
          </div>

          {/* Core Principles */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Core Principles
            </h3>
            <div className="space-y-2">
              {principles.map((principle, index) => (
                <div 
                  key={index}
                  className="rounded-xl border border-glass-border overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full p-4 flex items-start gap-4 text-left hover:bg-secondary/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <principle.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{principle.title}</h4>
                      <p className="text-sm text-muted-foreground">{principle.description}</p>
                    </div>
                    <div className={`transform transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {expandedIndex === index && (
                    <div className="px-4 pb-4 pl-18 animate-fade-in">
                      <div className="ml-14 p-3 rounded-lg bg-secondary/20">
                        <p className="text-sm text-muted-foreground leading-relaxed">{principle.detail}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Commitments */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Our Commitments
            </h3>
            <div className="p-4 rounded-xl bg-secondary/20 border border-glass-border">
              <ul className="space-y-3">
                {commitments.map((commitment, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emotional-calm flex-shrink-0" />
                    <span className="text-sm text-foreground">{commitment}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Limitations Disclosure */}
          <div className="p-4 rounded-xl bg-emotional-moderate/5 border border-emotional-moderate/20">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="text-emotional-moderate">⚠️</span>
              Honest Limitations
            </h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• This tool is not a substitute for professional mental health support</li>
              <li>• Our "Future You" simulations are illustrative patterns, not predictions</li>
              <li>• Regret probability is based on general patterns, not your specific situation</li>
              <li>• We encourage seeking human connection for important decisions</li>
            </ul>
          </div>

          {/* Research Foundation */}
          <div className="p-4 rounded-xl bg-secondary/10 border border-glass-border">
            <h4 className="font-semibold text-foreground mb-2">Research Foundation</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Think Twice AI draws from behavioral science research on temporal discounting, 
              emotional regulation, and reflective decision-making.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Behavioral Economics', 'Cognitive Psychology', 'Mindfulness Research'].map((tag) => (
                <span key={tag} className="px-2 py-1 rounded-full bg-secondary/30 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={() => onOpenChange(false)}>
            I Understand
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
