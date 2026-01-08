import { Calendar, Clock } from "lucide-react";

export interface Decision {
  id: string;
  date: string;
  trigger: string;
  emotion: string;
  urgency: number;
  outcome: string;
  regretProbability?: number;
}

interface DecisionHistoryProps {
  decisions: Decision[];
}

const getEmoji = (emotion: string) => {
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

const getRiskLevel = (urgency: number, regretProbability?: number) => {
  const value = regretProbability ?? urgency;
  if (value < 35) return { label: "Low", color: "text-emotional-calm", bg: "bg-emotional-calm/10" };
  if (value < 65) return { label: "Medium", color: "text-emotional-moderate", bg: "bg-emotional-moderate/10" };
  return { label: "High", color: "text-emotional-impulsive", bg: "bg-emotional-impulsive/10" };
};

const getTriggerIcon = (trigger: string) => {
  switch (trigger) {
    case "message": return "💬";
    case "decision": return "⚡";
    case "action": return "✅";
    default: return "📝";
  }
};

export function DecisionHistory({ decisions }: DecisionHistoryProps) {
  if (decisions.length === 0) {
    return (
      <div className="glass p-8 text-center animate-fade-in h-full flex flex-col items-center justify-center" style={{ animationDelay: "500ms" }}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary/50 flex items-center justify-center">
          <Clock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Decisions Yet</h3>
        <p className="text-sm text-muted-foreground">
          Start reflecting on your decisions to build your history
        </p>
      </div>
    );
  }

  return (
    <div className="glass p-5 animate-fade-in h-full" style={{ animationDelay: "500ms" }}>
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        Decision Timeline
      </h3>
      
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {decisions.map((decision, index) => {
          const risk = getRiskLevel(decision.urgency, decision.regretProbability);
          return (
            <div 
              key={decision.id} 
              className="p-4 rounded-xl bg-secondary/30 border border-glass-border hover:border-primary/30 transition-all duration-200 group"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg">{getTriggerIcon(decision.trigger)}</span>
                    <span className="text-xs text-muted-foreground">{decision.date}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${risk.bg} ${risk.color}`}>
                      {risk.label} Risk
                    </span>
                  </div>
                  <p className="text-sm text-foreground mb-2 line-clamp-2">{decision.outcome}</p>
                  {decision.regretProbability !== undefined && (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            decision.regretProbability < 35 ? 'bg-emotional-calm' :
                            decision.regretProbability < 65 ? 'bg-emotional-moderate' :
                            'bg-emotional-impulsive'
                          }`}
                          style={{ width: `${decision.regretProbability}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{decision.regretProbability}%</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{getEmoji(decision.emotion)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
