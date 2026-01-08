import { TrendingUp, Heart, ShieldCheck, Thermometer, Sparkles, Brain } from "lucide-react";
import { generateNarrativeInsight } from "@/lib/aiReasoningEngine";

interface NarrativeInsightsProps {
  totalDecisions: number;
  dominantEmotion: string;
  regretAvoided: number;
  emotionalTemp: number;
  emotionTrend: 'improving' | 'stable' | 'declining';
}

export function NarrativeInsights({ 
  totalDecisions, 
  dominantEmotion, 
  regretAvoided, 
  emotionalTemp,
  emotionTrend 
}: NarrativeInsightsProps) {
  const getEmotionEmoji = (emotion: string) => {
    const emotions: Record<string, string> = {
      calm: "😌",
      happy: "😊",
      anxious: "😰",
      angry: "😤",
      sad: "😢",
      excited: "🤩",
    };
    return emotions[emotion] || "🤔";
  };

  const getTempColor = (temp: number) => {
    if (temp < 33) return "text-emotional-calm";
    if (temp < 66) return "text-emotional-moderate";
    return "text-emotional-impulsive";
  };

  const getTempLabel = (temp: number) => {
    if (temp < 33) return "Calm";
    if (temp < 66) return "Moderate";
    return "Elevated";
  };

  // Generate narrative for temperature
  const getTempNarrative = (temp: number) => {
    if (temp < 33) return "Your emotional temperature is cooling over time";
    if (temp < 66) return "You're navigating moderate emotional intensity";
    return "High intensity moments call for extra reflection";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Decisions - Narrative Style */}
      <div className="glass p-5 animate-fade-in" style={{ animationDelay: "0ms" }}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">Reflections Made</p>
            <p className="text-3xl font-bold text-foreground">{totalDecisions}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          {totalDecisions === 0 
            ? "Your journey of mindful reflection begins now"
            : totalDecisions === 1
            ? "Every pause creates space for clarity"
            : `Each of these ${totalDecisions} moments shaped better outcomes`}
        </p>
      </div>

      {/* Dominant Emotion - Narrative Style */}
      <div className="glass p-5 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Emotional Theme</p>
            <div className="flex items-center gap-2">
              <span className="text-3xl">{getEmotionEmoji(dominantEmotion)}</span>
              <span className="text-xl font-semibold capitalize text-foreground">{dominantEmotion}</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-glow-amber/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-glow-amber" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          {dominantEmotion === 'calm' 
            ? "You approach decisions from a centered place"
            : dominantEmotion === 'anxious'
            ? "You reflect most when navigating uncertainty"
            : dominantEmotion === 'angry'
            ? "Strong feelings drive your desire for clarity"
            : "Your emotions guide you toward reflection"}
        </p>
      </div>

      {/* Regret Avoided - Narrative Style */}
      <div className="glass p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Regret Prevented</p>
            <p className="text-3xl font-bold text-primary">{regretAvoided}%</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
            style={{ width: `${regretAvoided}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {regretAvoided > 70 
            ? "Your patience is creating lasting peace of mind"
            : regretAvoided > 50
            ? "Building a pattern of thoughtful choices"
            : "Every reflection strengthens this habit"}
        </p>
      </div>

      {/* Emotional Temperature - Narrative Style */}
      <div className="glass p-5 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Emotional Intensity</p>
            <p className={`text-2xl font-bold ${getTempColor(emotionalTemp)}`}>
              {getTempLabel(emotionalTemp)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            <Thermometer className={`w-5 h-5 ${getTempColor(emotionalTemp)}`} />
          </div>
        </div>
        <div className="mt-3 h-2 rounded-full overflow-hidden bg-gradient-to-r from-emotional-calm via-emotional-moderate to-emotional-impulsive">
          <div 
            className="h-full bg-background/80 transition-all duration-500"
            style={{ marginLeft: `${emotionalTemp}%`, width: `${100 - emotionalTemp}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {getTempNarrative(emotionalTemp)}
        </p>
      </div>
    </div>
  );
}
