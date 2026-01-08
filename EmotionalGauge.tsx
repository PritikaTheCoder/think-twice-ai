interface EmotionalGaugeProps {
  value: number; // 0-100
}

export function EmotionalGauge({ value }: EmotionalGaugeProps) {
  const getLabel = () => {
    if (value < 20) return "Very Calm";
    if (value < 40) return "Calm";
    if (value < 60) return "Moderate";
    if (value < 80) return "Elevated";
    return "Impulsive";
  };

  const getColor = () => {
    if (value < 33) return "text-emotional-calm";
    if (value < 66) return "text-emotional-moderate";
    return "text-emotional-impulsive";
  };

  // Calculate the rotation angle (-90 to 90 degrees)
  const angle = (value / 100) * 180 - 90;

  return (
    <div className="glass p-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Emotional State Gauge</h3>
      
      <div className="relative flex flex-col items-center">
        {/* Gauge Arc */}
        <div className="relative w-48 h-24 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-48 rounded-full bg-gradient-to-r from-emotional-calm via-emotional-moderate to-emotional-impulsive opacity-20" />
          <div className="absolute bottom-0 left-0 right-0 h-48 rounded-full border-4 border-glass-border" style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }} />
          
          {/* Needle */}
          <div 
            className="absolute bottom-0 left-1/2 w-1 h-20 origin-bottom transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
          >
            <div className="w-1 h-full bg-gradient-to-t from-foreground to-foreground/50 rounded-full" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-foreground shadow-lg" />
          </div>
        </div>
        
        {/* Labels */}
        <div className="flex justify-between w-full mt-2 px-2">
          <span className="text-xs text-emotional-calm">Calm</span>
          <span className="text-xs text-emotional-moderate">Moderate</span>
          <span className="text-xs text-emotional-impulsive">Impulsive</span>
        </div>
        
        {/* Current State */}
        <div className="mt-4 text-center">
          <p className={`text-2xl font-bold ${getColor()}`}>{getLabel()}</p>
          <p className="text-sm text-muted-foreground mt-1">Current emotional state</p>
        </div>
      </div>
    </div>
  );
}
