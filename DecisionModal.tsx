import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MessageSquare, Zap, CheckCircle, ArrowRight, Sparkles, Lightbulb } from "lucide-react";
import { analyzeDecision, AIResponse } from "@/lib/aiReasoningEngine";
import { FutureYouPanel } from "./FutureYouPanel";
import { RegretMeter } from "./RegretMeter";

interface DecisionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (decision: DecisionData, aiResult: AIResponse) => void;
}

export interface DecisionData {
  trigger: string;
  emotion: string;
  urgency: number;
}

const triggers = [
  { id: "message", label: "Message to Send", icon: MessageSquare },
  { id: "decision", label: "Major Decision", icon: Zap },
  { id: "action", label: "Action to Take", icon: CheckCircle },
];

const emotions = [
  { emoji: "😌", label: "Calm", value: "calm" },
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "😰", label: "Anxious", value: "anxious" },
  { emoji: "😤", label: "Angry", value: "angry" },
  { emoji: "😢", label: "Sad", value: "sad" },
  { emoji: "🤩", label: "Excited", value: "excited" },
];

export function DecisionModal({ open, onOpenChange, onSubmit }: DecisionModalProps) {
  const [step, setStep] = useState<"input" | "result">("input");
  const [trigger, setTrigger] = useState("");
  const [emotion, setEmotion] = useState("");
  const [urgency, setUrgency] = useState([50]);
  const [result, setResult] = useState<AIResponse | null>(null);

  const handleSubmit = () => {
    // Use the AI reasoning engine
    const aiResult = analyzeDecision({
      emotion,
      urgency: urgency[0],
      trigger,
    });
    
    setResult(aiResult);
    setStep("result");
  };

  const handleClose = () => {
    if (step === "result" && result) {
      onSubmit({ trigger, emotion, urgency: urgency[0] }, result);
    }
    setStep("input");
    setTrigger("");
    setEmotion("");
    setUrgency([50]);
    setResult(null);
    onOpenChange(false);
  };

  // Calculate live regret preview
  const liveRegretPreview = emotion && trigger 
    ? analyzeDecision({ emotion, urgency: urgency[0], trigger }).regretProbability
    : null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        {step === "input" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="w-5 h-5 text-primary" />
                Reflect Before Acting
              </DialogTitle>
              <DialogDescription>
                Let's pause and consider this decision together
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Trigger Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">What are you deciding on?</label>
                <div className="grid grid-cols-3 gap-3">
                  {triggers.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTrigger(t.id)}
                      className={`p-4 rounded-xl border transition-all duration-200 flex flex-col items-center gap-2 ${
                        trigger === t.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-glass-border bg-secondary/30 text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <t.icon className="w-5 h-5" />
                      <span className="text-xs font-medium text-center">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Emotion Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">How are you feeling right now?</label>
                <div className="flex flex-wrap gap-2">
                  {emotions.map((e) => (
                    <button
                      key={e.value}
                      onClick={() => setEmotion(e.value)}
                      className={`px-4 py-2 rounded-xl border transition-all duration-200 flex items-center gap-2 ${
                        emotion === e.value
                          ? "border-primary bg-primary/10"
                          : "border-glass-border bg-secondary/30 hover:border-primary/50"
                      }`}
                    >
                      <span className="text-xl">{e.emoji}</span>
                      <span className="text-sm">{e.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-foreground">How urgent does this feel?</label>
                  <span className="text-sm text-muted-foreground">{urgency[0]}%</span>
                </div>
                <Slider
                  value={urgency}
                  onValueChange={setUrgency}
                  max={100}
                  step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Can wait</span>
                  <span>Somewhat urgent</span>
                  <span>Very urgent</span>
                </div>
              </div>

              {/* Live Regret Preview */}
              {liveRegretPreview !== null && (
                <div className="p-4 rounded-xl bg-secondary/20 border border-glass-border animate-fade-in">
                  <RegretMeter 
                    probability={liveRegretPreview} 
                    size="sm" 
                    showExplanation={false}
                    animate={false}
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Adjust urgency to see how it affects regret probability
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!trigger || !emotion}
              >
                Analyze Decision
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </>
        ) : result && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                Your Reflection Results
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Today's Recommendation */}
              <div className="glass-subtle p-5 space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Lightbulb className="w-4 h-4" />
                  <h4 className="font-semibold">Thoughtful Pause</h4>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {result.recommendation}
                </p>
              </div>

              {/* AI Insights */}
              {result.insights.length > 0 && (
                <div className="space-y-2">
                  {result.insights.map((insight, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Future You Panels */}
              <FutureYouPanel simulations={result.futureSimulations} />

              {/* Regret Probability */}
              <div className="p-4 rounded-xl bg-secondary/20 border border-glass-border">
                <RegretMeter probability={result.regretProbability} size="md" />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handleClose}>
                Save & Continue
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
