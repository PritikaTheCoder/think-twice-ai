import { useState, useEffect } from "react";
import { Plus, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/NavBar";
import { NarrativeInsights } from "@/components/NarrativeInsights";
import { EmotionalGauge } from "@/components/EmotionalGauge";
import { DecisionModal, DecisionData } from "@/components/DecisionModal";
import { DecisionHistory, Decision } from "@/components/DecisionHistory";
import { DecisionJournal, JournalEntry } from "@/components/DecisionJournal";
import { DailyCheckIn, useCheckInData } from "@/components/DailyCheckIn";
import { PersonalizationPanel } from "@/components/PersonalizationPanel";
import { EthicsModal } from "@/components/EthicsModal";
import { Footer } from "@/components/Footer";
import { AIResponse } from "@/lib/aiReasoningEngine";

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

const STORAGE_KEY_DECISIONS = 'thinktwice_decisions';
const STORAGE_KEY_JOURNAL = 'thinktwice_journal';

export function Dashboard({ username, onLogout }: DashboardProps) {
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [ethicsModalOpen, setEthicsModalOpen] = useState(false);
  const { getMoodTrend } = useCheckInData();
  
  // Load decisions from localStorage
  const [decisions, setDecisions] = useState<Decision[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_DECISIONS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [
      {
        id: "1",
        date: "Jan 3, 2026",
        trigger: "message",
        emotion: "angry",
        urgency: 78,
        outcome: "Waited before responding to a frustrating email. Avoided escalation.",
        regretProbability: 68,
      },
      {
        id: "2",
        date: "Jan 2, 2026",
        trigger: "decision",
        emotion: "anxious",
        urgency: 45,
        outcome: "Took time to research before making a purchase decision.",
        regretProbability: 42,
      },
      {
        id: "3",
        date: "Jan 1, 2026",
        trigger: "action",
        emotion: "excited",
        urgency: 82,
        outcome: "Paused on an impulsive investment. Grateful for reflection.",
        regretProbability: 71,
      },
    ];
  });

  // Load journal entries from localStorage
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_JOURNAL);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [
      {
        id: "j1",
        date: "Jan 3, 2026",
        note: "I noticed I tend to react quickly when frustrated. Taking time helped me see the email differently.",
        emotion: "calm",
        regretLevel: "low",
      },
    ];
  });

  // Persist decisions
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DECISIONS, JSON.stringify(decisions));
  }, [decisions]);

  // Persist journal
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(journalEntries));
  }, [journalEntries]);

  // Calculate stats
  const totalDecisions = decisions.length;
  const dominantEmotion = decisions.length > 0 
    ? Object.entries(decisions.reduce((acc, d) => {
        acc[d.emotion] = (acc[d.emotion] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)).sort((a, b) => b[1] - a[1])[0]?.[0] || "calm"
    : "calm";
  
  const avgUrgency = decisions.length > 0 
    ? Math.round(decisions.reduce((sum, d) => sum + d.urgency, 0) / decisions.length)
    : 30;
  
  // Improved regret avoided calculation based on actual decisions
  const highRiskDecisions = decisions.filter(d => (d.regretProbability || d.urgency) > 60).length;
  const regretAvoided = decisions.length > 0
    ? Math.min(95, Math.round(((decisions.length - highRiskDecisions * 0.5) / decisions.length) * 100))
    : 60;

  const handleDecisionSubmit = (data: DecisionData, aiResult: AIResponse) => {
    const newDecision: Decision = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      trigger: data.trigger,
      emotion: data.emotion,
      urgency: data.urgency,
      outcome: aiResult.futureSimulations[0]?.narrative || "Reflected carefully before acting.",
      regretProbability: aiResult.regretProbability,
    };
    
    setDecisions([newDecision, ...decisions]);
  };

  const handleJournalEntry = (entry: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setJournalEntries([newEntry, ...journalEntries]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar username={username} onLogout={onLogout} />
      
      <main className="flex-1 pt-24 pb-8">
        <div className="container mx-auto px-4 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Welcome back, {username}
              </h1>
              <p className="text-muted-foreground mt-1">
                Your reflection dashboard for mindful decisions
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setEthicsModalOpen(true)}
                className="hidden sm:flex"
              >
                <Shield className="w-4 h-4 mr-2" />
                AI Ethics
              </Button>
              <Button variant="hero" size="lg" onClick={() => setDecisionModalOpen(true)}>
                <Plus className="w-5 h-5" />
                Add New Decision
              </Button>
            </div>
          </div>

          {/* Narrative Insight Cards */}
          <NarrativeInsights 
            totalDecisions={totalDecisions}
            dominantEmotion={dominantEmotion}
            regretAvoided={regretAvoided}
            emotionalTemp={avgUrgency}
            emotionTrend={getMoodTrend()}
          />

          {/* Main Content Grid - 3 columns on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Gauge + History */}
            <div className="space-y-6">
              <EmotionalGauge value={avgUrgency} />
              <DailyCheckIn />
            </div>

            {/* Middle Column - Decision History */}
            <div className="lg:col-span-1">
              <DecisionHistory decisions={decisions} />
            </div>

            {/* Right Column - Journal + Personalization */}
            <div className="space-y-6">
              <DecisionJournal 
                entries={journalEntries} 
                onAddEntry={handleJournalEntry}
              />
              <PersonalizationPanel 
                decisions={decisions}
                totalDecisions={totalDecisions}
                avgUrgency={avgUrgency}
                dominantEmotion={dominantEmotion}
                regretAvoided={regretAvoided}
              />
            </div>
          </div>

          {/* Mobile Ethics Button */}
          <div className="sm:hidden">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setEthicsModalOpen(true)}
            >
              <Shield className="w-4 h-4 mr-2" />
              View AI Ethics & Trust
            </Button>
          </div>
        </div>
      </main>

      <Footer onOpenEthics={() => setEthicsModalOpen(true)} />

      <DecisionModal 
        open={decisionModalOpen}
        onOpenChange={setDecisionModalOpen}
        onSubmit={handleDecisionSubmit}
      />

      <EthicsModal 
        open={ethicsModalOpen}
        onOpenChange={setEthicsModalOpen}
      />
    </div>
  );
}
