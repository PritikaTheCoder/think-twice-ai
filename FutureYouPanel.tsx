import { Clock, User, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { FutureSimulation } from "@/lib/aiReasoningEngine";

interface FutureYouPanelProps {
  simulations: FutureSimulation[];
}

export function FutureYouPanel({ simulations }: FutureYouPanelProps) {
  const getShiftIcon = (shift: FutureSimulation['emotionalShift']) => {
    switch (shift) {
      case 'improved':
        return <TrendingUp className="w-4 h-4 text-emotional-calm" />;
      case 'declined':
        return <TrendingDown className="w-4 h-4 text-emotional-impulsive" />;
      default:
        return <Minus className="w-4 h-4 text-emotional-moderate" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Disclaimer */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <span className="text-sm">🔮</span>
        <p className="text-xs text-muted-foreground leading-relaxed">
          You are previewing <strong className="text-foreground">possible futures</strong>, not receiving instructions. 
          These simulations reflect patterns, not predictions.
        </p>
      </div>

      {/* Timeline Panels */}
      <div className="space-y-3">
        {simulations.map((sim, index) => (
          <div 
            key={sim.timeframe}
            className="glass-subtle p-4 space-y-3 border-l-4 border-l-primary/60 animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-foreground text-sm">
                  Future You — {sim.timeframe}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{sim.emoji}</span>
                {getShiftIcon(sim.emotionalShift)}
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              "{sim.narrative}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
