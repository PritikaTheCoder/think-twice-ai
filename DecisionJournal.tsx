import { useState, useEffect } from "react";
import { Book, Filter, Plus, X, Calendar, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export interface JournalEntry {
  id: string;
  date: string;
  decisionId?: string;
  note: string;
  emotion: string;
  regretLevel: 'low' | 'medium' | 'high';
}

interface DecisionJournalProps {
  entries: JournalEntry[];
  onAddEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
}

const emotionEmojis: Record<string, string> = {
  calm: '😌',
  happy: '😊',
  anxious: '😰',
  angry: '😤',
  sad: '😢',
  excited: '🤩',
  neutral: '😐',
};

const regretColors = {
  low: { bg: 'bg-emotional-calm/10', text: 'text-emotional-calm', label: 'Low Regret' },
  medium: { bg: 'bg-emotional-moderate/10', text: 'text-emotional-moderate', label: 'Medium Regret' },
  high: { bg: 'bg-emotional-impulsive/10', text: 'text-emotional-impulsive', label: 'High Regret' },
};

export function DecisionJournal({ entries, onAddEntry }: DecisionJournalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [newNote, setNewNote] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('calm');
  const [selectedRegret, setSelectedRegret] = useState<'low' | 'medium' | 'high'>('low');
  const [isAdding, setIsAdding] = useState(false);

  const filteredEntries = entries.filter(e => 
    filter === 'all' ? true : e.regretLevel === filter
  );

  const handleAdd = () => {
    if (!newNote.trim()) return;
    
    onAddEntry({
      note: newNote,
      emotion: selectedEmotion,
      regretLevel: selectedRegret,
    });
    
    setNewNote('');
    setSelectedEmotion('calm');
    setSelectedRegret('low');
    setIsAdding(false);
  };

  return (
    <>
      <div className="glass p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Book className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Decision Journal</h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Lock className="w-3 h-3" />
            <span>Private</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Record your reflections. Only you can see these.
        </p>

        <div className="space-y-3">
          {entries.slice(0, 3).map((entry) => (
            <div 
              key={entry.id}
              className="p-3 rounded-lg bg-secondary/30 border border-glass-border"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{emotionEmojis[entry.emotion] || '🤔'}</span>
                  <span className="text-xs text-muted-foreground">{entry.date}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${regretColors[entry.regretLevel].bg} ${regretColors[entry.regretLevel].text}`}>
                  {entry.regretLevel}
                </span>
              </div>
              <p className="text-sm text-foreground line-clamp-2">{entry.note}</p>
            </div>
          ))}
          
          {entries.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <Book className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No journal entries yet</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => setIsOpen(true)}
          >
            View All
          </Button>
          <Button 
            variant="glass" 
            size="sm" 
            className="flex-1"
            onClick={() => { setIsOpen(true); setIsAdding(true); }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Note
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Book className="w-5 h-5 text-primary" />
              Decision Journal
            </DialogTitle>
            <DialogDescription className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Your private reflections — never shared
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Add new entry */}
            {isAdding ? (
              <div className="space-y-4 p-4 rounded-xl bg-secondary/30 border border-glass-border">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">New Reflection</h4>
                  <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="What's on your mind? How did this decision feel?"
                  className="w-full p-3 rounded-lg bg-background border border-glass-border text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                  rows={3}
                />

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">How do you feel?</label>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(emotionEmojis).map(([key, emoji]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedEmotion(key)}
                        className={`p-2 rounded-lg transition-all ${
                          selectedEmotion === key
                            ? 'bg-primary/20 border border-primary'
                            : 'bg-secondary/30 border border-transparent hover:border-primary/50'
                        }`}
                      >
                        <span className="text-lg">{emoji}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Regret level</label>
                  <div className="flex gap-2">
                    {(['low', 'medium', 'high'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedRegret(level)}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                          selectedRegret === level
                            ? `${regretColors[level].bg} ${regretColors[level].text} border border-current`
                            : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/50'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <Button onClick={handleAdd} disabled={!newNote.trim()} className="w-full">
                  Save Reflection
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsAdding(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Reflection
              </Button>
            )}

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-1">
                {(['all', 'low', 'medium', 'high'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded-full text-xs transition-all ${
                      filter === f
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/50'
                    }`}
                  >
                    {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Entries list */}
            <div className="space-y-3">
              {filteredEntries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Book className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No entries match this filter</p>
                </div>
              ) : (
                filteredEntries.map((entry) => (
                  <div 
                    key={entry.id}
                    className="p-4 rounded-xl bg-secondary/20 border border-glass-border"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{emotionEmojis[entry.emotion] || '🤔'}</span>
                        <div>
                          <span className="text-sm text-foreground font-medium block">{entry.date}</span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${regretColors[entry.regretLevel].bg} ${regretColors[entry.regretLevel].text}`}>
                        {regretColors[entry.regretLevel].label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{entry.note}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
