import { TrendingUp, Heart, ShieldCheck, Thermometer } from "lucide-react";

interface InsightCardsProps {
  totalDecisions: number;
  dominantEmotion: string;
  regretAvoided: number;
  emotionalTemp: number;
}

export function InsightCards({ totalDecisions, dominantEmotion, regretAvoided, emotionalTemp }: InsightCardsProps) {
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
    return "Impulsive";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Decisions */}
      <div className="glass p-5 animate-fade-in" style={{ animationDelay: "0ms" }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Decisions</p>
            <p className="text-3xl font-bold text-foreground">{totalDecisions}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">Thoughtful choices made</p>
      </div>

      {/* Dominant Emotion */}
      <div className="glass p-5 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Dominant Emotion</p>
            <div className="flex items-center gap-2">
              <span className="text-3xl">{getEmotionEmoji(dominantEmotion)}</span>
              <span className="text-xl font-semibold capitalize text-foreground">{dominantEmotion}</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-glow-amber/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-glow-amber" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">Most frequent feeling</p>
      </div>

      {/* Regret Avoided */}
      <div className="glass p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Regret Avoided</p>
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
      </div>

      {/* Emotional Temperature */}
      <div className="glass p-5 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Emotional Temperature</p>
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
      </div>
    </div>
  );
}
