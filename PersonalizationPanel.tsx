import { TrendingUp, TrendingDown, Minus, Sparkles, Target, Clock } from "lucide-react";
import { generateNarrativeInsight } from "@/lib/aiReasoningEngine";
import { useCheckInData } from "./DailyCheckIn";
import { Decision } from "./DecisionHistory";

interface PersonalizationPanelProps {
  decisions: Decision[];
  totalDecisions: number;
  avgUrgency: number;
  dominantEmotion: string;
  regretAvoided: number;
}

export function PersonalizationPanel({
  decisions,
  totalDecisions,
  avgUrgency,
  dominantEmotion,
  regretAvoided,
}: PersonalizationPanelProps) {
  const { getMoodTrend, getDominantMood } = useCheckInData();
  const moodTrend = getMoodTrend();
  const dailyMood = getDominantMood();

  // Calculate trigger patterns
  const triggerCounts = decisions.reduce((acc, d) => {
    acc[d.trigger] = (acc[d.trigger] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topTrigger = Object.entries(triggerCounts)
    .sort((a, b) => b[1] - a[1])[0];

  // Generate narrative insights
  const narratives = generateNarrativeInsight({
    totalDecisions,
    avgUrgency,
    dominantEmotion,
    regretAvoided,
    emotionTrend: moodTrend,
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-emotional-calm" />;
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-emotional-impulsive" />;
      default:
        return <Minus className="w-4 h-4 text-emotional-moderate" />;
    }
  };

  const getTriggerLabel = (trigger: string) => {
    const labels: Record<string, string> = {
      message: 'sending messages',
      decision: 'major decisions',
      action: 'taking actions',
    };
    return labels[trigger] || trigger;
  };

  if (totalDecisions < 2) {
    return (
      <div className="glass p-5 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Your Patterns</h3>
        </div>
        <div className="text-center py-6">
          <Target className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            Add more decisions to unlock personalized insights
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            {2 - totalDecisions} more needed
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass p-5 animate-fade-in" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Your Patterns</h3>
        </div>
        {getTrendIcon(moodTrend)}
      </div>

      <div className="space-y-4">
        {/* Narrative Insights */}
        <div className="space-y-3">
          {narratives.slice(0, 3).map((narrative, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border border-glass-border/50"
            >
              <span className="text-primary mt-0.5">•</span>
              <p className="text-sm text-foreground leading-relaxed">{narrative}</p>
            </div>
          ))}
        </div>

        {/* Pattern Cards */}
        <div className="grid grid-cols-2 gap-3">
          {topTrigger && (
            <div className="p-3 rounded-lg bg-secondary/30">
              <p className="text-xs text-muted-foreground mb-1">Most common</p>
              <p className="text-sm font-medium text-foreground capitalize">
                {getTriggerLabel(topTrigger[0])}
              </p>
              <p className="text-xs text-primary">{topTrigger[1]} times</p>
            </div>
          )}
          
          <div className="p-3 rounded-lg bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-1">Urgency trend</p>
            <p className="text-sm font-medium text-foreground">
              {avgUrgency < 40 ? 'Low pressure' : avgUrgency < 65 ? 'Moderate' : 'High intensity'}
            </p>
            <p className="text-xs text-primary">Avg {avgUrgency}%</p>
          </div>
        </div>

        {/* Time-based insight */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
          <Clock className="w-5 h-5 text-primary" />
          <p className="text-xs text-muted-foreground">
            {moodTrend === 'improving' 
              ? "Your emotional patterns show positive growth over time."
              : moodTrend === 'declining'
              ? "Consider extra care in your reflections right now."
              : "You're maintaining consistent emotional awareness."}
          </p>
        </div>
      </div>
    </div>
  );
}
