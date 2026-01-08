import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RegretMeterProps {
  probability: number;
  showExplanation?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export function RegretMeter({ 
  probability, 
  showExplanation = true, 
  size = 'md',
  animate = true 
}: RegretMeterProps) {
  const getRiskLevel = (prob: number) => {
    if (prob < 35) return { 
      label: 'Low', 
      color: 'text-emotional-calm', 
      bgColor: 'bg-emotional-calm',
      Icon: CheckCircle,
      explanation: "Low chance of regret — proceed with confidence"
    };
    if (prob < 65) return { 
      label: 'Medium', 
      color: 'text-emotional-moderate', 
      bgColor: 'bg-emotional-moderate',
      Icon: AlertCircle,
      explanation: "Moderate risk — consider waiting a bit longer"
    };
    return { 
      label: 'High', 
      color: 'text-emotional-impulsive', 
      bgColor: 'bg-emotional-impulsive',
      Icon: AlertTriangle,
      explanation: "High risk — strongly recommend pausing"
    };
  };

  const risk = getRiskLevel(probability);
  const Icon = risk.Icon;

  const sizeClasses = {
    sm: {
      container: 'space-y-2',
      text: 'text-sm',
      number: 'text-lg font-bold',
      progress: 'h-1.5',
      icon: 'w-4 h-4',
    },
    md: {
      container: 'space-y-3',
      text: 'text-sm',
      number: 'text-xl font-bold',
      progress: 'h-2',
      icon: 'w-5 h-5',
    },
    lg: {
      container: 'space-y-4',
      text: 'text-base',
      number: 'text-3xl font-bold',
      progress: 'h-3',
      icon: 'w-6 h-6',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={classes.container}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`${classes.icon} ${risk.color}`} />
          <h4 className={`font-semibold text-foreground ${classes.text}`}>
            Regret Probability
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${risk.bgColor}/10 ${risk.color}`}>
            {risk.label}
          </span>
          <span className={`${classes.number} ${risk.color}`}>
            {probability}%
          </span>
        </div>
      </div>
      
      <div className="relative">
        <Progress 
          value={animate ? probability : 0}
          indicatorClassName={`${risk.bgColor} transition-all duration-1000`}
          className={classes.progress}
        />
        {/* Gradient overlay for visual appeal */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/20 pointer-events-none rounded-full" />
      </div>

      {showExplanation && (
        <p className="text-xs text-muted-foreground">
          {risk.explanation}
        </p>
      )}
    </div>
  );
}
