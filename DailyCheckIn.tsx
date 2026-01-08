import { useState, useEffect } from "react";
import { Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckInEntry {
  date: string;
  emoji: string;
}

interface DailyCheckInProps {
  onCheckIn?: (emoji: string) => void;
}

const moodEmojis = [
  { emoji: "😌", label: "Calm" },
  { emoji: "😊", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "😢", label: "Sad" },
];

const getStorageKey = () => `thinktwice_checkins`;

export function DailyCheckIn({ onCheckIn }: DailyCheckInProps) {
  const [todayCheckedIn, setTodayCheckedIn] = useState(false);
  const [todayEmoji, setTodayEmoji] = useState<string | null>(null);
  const [recentCheckIns, setRecentCheckIns] = useState<CheckInEntry[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Load check-ins from localStorage
    const stored = localStorage.getItem(getStorageKey());
    if (stored) {
      try {
        const checkIns: CheckInEntry[] = JSON.parse(stored);
        setRecentCheckIns(checkIns.slice(-7)); // Last 7 days
        
        const todayEntry = checkIns.find(c => c.date === today);
        if (todayEntry) {
          setTodayCheckedIn(true);
          setTodayEmoji(todayEntry.emoji);
        }
      } catch (e) {
        console.error('Failed to parse check-ins', e);
      }
    }
  }, [today]);

  const handleCheckIn = (emoji: string) => {
    const newEntry: CheckInEntry = { date: today, emoji };
    
    // Update localStorage
    const stored = localStorage.getItem(getStorageKey());
    let checkIns: CheckInEntry[] = stored ? JSON.parse(stored) : [];
    
    // Remove today's entry if exists, then add new one
    checkIns = checkIns.filter(c => c.date !== today);
    checkIns.push(newEntry);
    
    // Keep only last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    checkIns = checkIns.filter(c => new Date(c.date) >= thirtyDaysAgo);
    
    localStorage.setItem(getStorageKey(), JSON.stringify(checkIns));
    
    setTodayCheckedIn(true);
    setTodayEmoji(emoji);
    setRecentCheckIns(checkIns.slice(-7));
    setIsExpanded(false);
    
    onCheckIn?.(emoji);
  };

  return (
    <div className="glass p-5 animate-fade-in" style={{ animationDelay: "100ms" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Daily Check-In</h3>
        </div>
        {todayCheckedIn && (
          <div className="flex items-center gap-1 text-xs text-emotional-calm">
            <Check className="w-3 h-3" />
            <span>Done today</span>
          </div>
        )}
      </div>

      {todayCheckedIn && !isExpanded ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
            <span className="text-3xl">{todayEmoji}</span>
            <div>
              <p className="text-sm text-foreground">Today's mood recorded</p>
              <p className="text-xs text-muted-foreground">
                {moodEmojis.find(m => m.emoji === todayEmoji)?.label || 'Unknown'}
              </p>
            </div>
          </div>
          
          {/* Week overview */}
          {recentCheckIns.length > 1 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Your week</p>
              <div className="flex gap-1">
                {recentCheckIns.map((entry, i) => (
                  <div 
                    key={entry.date}
                    className="flex-1 flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary/20"
                    title={entry.date}
                  >
                    <span className="text-lg">{entry.emoji}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-xs"
            onClick={() => setIsExpanded(true)}
          >
            Update today's mood
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            How are you feeling right now?
          </p>
          <div className="grid grid-cols-3 gap-2">
            {moodEmojis.map((mood) => (
              <button
                key={mood.emoji}
                onClick={() => handleCheckIn(mood.emoji)}
                className={`p-3 rounded-xl border transition-all duration-200 flex flex-col items-center gap-1 hover:scale-105 ${
                  todayEmoji === mood.emoji
                    ? "border-primary bg-primary/10"
                    : "border-glass-border bg-secondary/30 hover:border-primary/50"
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs text-muted-foreground">{mood.label}</span>
              </button>
            ))}
          </div>
          
          {isExpanded && todayCheckedIn && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => setIsExpanded(false)}
            >
              Cancel
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Hook to get check-in data for personalization
export function useCheckInData() {
  const [checkIns, setCheckIns] = useState<CheckInEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(getStorageKey());
    if (stored) {
      try {
        setCheckIns(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse check-ins', e);
      }
    }
  }, []);

  const getDominantMood = () => {
    if (checkIns.length === 0) return null;
    
    const counts: Record<string, number> = {};
    checkIns.forEach(c => {
      counts[c.emoji] = (counts[c.emoji] || 0) + 1;
    });
    
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  };

  const getMoodTrend = (): 'improving' | 'stable' | 'declining' => {
    if (checkIns.length < 3) return 'stable';
    
    const positiveEmojis = ['😌', '😊'];
    const negativeEmojis = ['😰', '😤', '😢'];
    
    const recent = checkIns.slice(-3);
    const older = checkIns.slice(-7, -3);
    
    const recentPositive = recent.filter(c => positiveEmojis.includes(c.emoji)).length;
    const olderPositive = older.filter(c => positiveEmojis.includes(c.emoji)).length;
    
    if (recentPositive > olderPositive) return 'improving';
    if (recentPositive < olderPositive) return 'declining';
    return 'stable';
  };

  return { checkIns, getDominantMood, getMoodTrend };
}
