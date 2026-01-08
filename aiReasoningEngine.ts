/**
 * AI Reasoning Engine - Rule-based intelligence simulation
 * Modular design to easily replace with real AI backend later
 */

export interface EmotionData {
  emotion: string;
  urgency: number;
  trigger: string;
}

export interface FutureSimulation {
  timeframe: string;
  emoji: string;
  narrative: string;
  emotionalShift: 'improved' | 'stable' | 'declined';
}

export interface AIResponse {
  recommendation: string;
  futureSimulations: FutureSimulation[];
  regretProbability: number;
  riskLevel: 'low' | 'medium' | 'high';
  insights: string[];
}

// Emotion weights for regret calculation
const emotionWeights: Record<string, number> = {
  calm: 0.1,
  happy: 0.2,
  anxious: 0.7,
  angry: 0.9,
  sad: 0.5,
  excited: 0.6,
};

// Trigger risk multipliers
const triggerMultipliers: Record<string, number> = {
  message: 1.2,
  decision: 1.0,
  action: 1.3,
};

/**
 * Calculate regret probability based on emotion and urgency
 */
export function calculateRegretProbability(data: EmotionData): number {
  const emotionWeight = emotionWeights[data.emotion] || 0.5;
  const triggerMultiplier = triggerMultipliers[data.trigger] || 1.0;
  
  // Base calculation: urgency contributes 60%, emotion 40%
  const baseRegret = (data.urgency * 0.6) + (emotionWeight * 100 * 0.4);
  
  // Apply trigger multiplier
  const adjustedRegret = baseRegret * triggerMultiplier;
  
  // Clamp between 5 and 95
  return Math.min(95, Math.max(5, Math.round(adjustedRegret)));
}

/**
 * Generate thoughtful, reflective recommendation
 */
export function generateRecommendation(data: EmotionData): string {
  const { emotion, urgency, trigger } = data;
  const isHighUrgency = urgency > 65;
  const isHighRisk = ['angry', 'anxious'].includes(emotion);
  
  const recommendations: Record<string, string[]> = {
    calm_low: [
      "Your centered state suggests clarity. Trust your process.",
      "A calm mind often sees further. Proceed with gentle awareness.",
    ],
    calm_high: [
      "Though urgency feels real, your calm foundation is a strength. Use it.",
      "Urgency and calm can coexist. Let your steady mind guide the pace.",
    ],
    angry_any: [
      "Strong emotions carry important information, but rarely good timing.",
      "A calmer response today may reduce emotional weight later.",
      "What feels urgent now may look different after rest.",
    ],
    anxious_any: [
      "Anxiety often magnifies urgency. Consider what's actually at stake.",
      "Your mind is preparing for possibilities. Not all need immediate action.",
      "What would you tell a friend feeling this way about this decision?",
    ],
    excited_high: [
      "Excitement is beautiful, but quick decisions can miss important details.",
      "Let the energy fuel your preparation, not just your speed.",
    ],
    excited_low: [
      "Positive anticipation is a good companion for thoughtful planning.",
      "Your enthusiasm can guide you well when paired with patience.",
    ],
    sad_any: [
      "Decisions made in low moments often carry that weight forward.",
      "Gentleness with yourself now may prevent regret later.",
      "This feeling will shift. Give yourself time before committing.",
    ],
    happy_any: [
      "Happiness can be a wonderful lens, but consider multiple perspectives.",
      "Joy is a gift. Let it inform, not rush, your choices.",
    ],
  };

  // Build key for lookup
  const urgencyLevel = isHighUrgency ? 'high' : 'low';
  let key = `${emotion}_${urgencyLevel}`;
  
  // Check for emotion-specific "any" fallback
  if (!recommendations[key]) {
    key = `${emotion}_any`;
  }
  
  // Final fallback
  const options = recommendations[key] || [
    "Pausing to reflect is already a wise choice.",
    "Consider what matters most before moving forward.",
  ];
  
  return options[Math.floor(Math.random() * options.length)];
}

/**
 * Generate Future Self simulations for multiple timeframes
 */
export function generateFutureSimulations(data: EmotionData): FutureSimulation[] {
  const regretProb = calculateRegretProbability(data);
  const isHighRisk = regretProb > 60;
  const isMediumRisk = regretProb > 35;
  
  const positiveOutcomes: Record<string, string[]> = {
    message: [
      "I'm relieved I waited. The message I sent was clearer and kinder.",
      "Taking time helped me say what I actually meant.",
      "The conversation went better than expected because I was ready.",
    ],
    decision: [
      "Looking back, the extra thought made all the difference.",
      "I found options I wouldn't have seen if I'd rushed.",
      "The decision feels right because I gave it proper weight.",
    ],
    action: [
      "Acting from a calmer place led to better outcomes.",
      "I'm proud of how I handled this.",
      "The pause helped me act with intention rather than reaction.",
    ],
  };

  const neutralOutcomes: Record<string, string[]> = {
    message: [
      "The message landed okay. Neither great nor problematic.",
      "I said what needed saying. Time will tell the rest.",
    ],
    decision: [
      "I made my choice. The future is still unfolding.",
      "Some uncertainty remains, but I'm at peace with my process.",
    ],
    action: [
      "I did what I felt was right in the moment.",
      "The action is done. Now I focus on what comes next.",
    ],
  };

  const negativeOutcomes: Record<string, string[]> = {
    message: [
      "I wish I had waited longer. The words landed harder than intended.",
      "Rushing that message created more to clean up.",
    ],
    decision: [
      "Hindsight shows me what I couldn't see in the moment.",
      "The urgency I felt wasn't the wisest advisor.",
    ],
    action: [
      "Acting so quickly didn't serve me as well as I'd hoped.",
      "I learned something about my patterns. That has value too.",
    ],
  };

  const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  const trigger = data.trigger || 'decision';

  // 24 hours - most influenced by urgency
  const scenario24h = isHighRisk
    ? { emoji: '😔', narrative: getRandomItem(negativeOutcomes[trigger] || negativeOutcomes.decision), emotionalShift: 'declined' as const }
    : isMediumRisk
    ? { emoji: '😐', narrative: getRandomItem(neutralOutcomes[trigger] || neutralOutcomes.decision), emotionalShift: 'stable' as const }
    : { emoji: '😌', narrative: getRandomItem(positiveOutcomes[trigger] || positiveOutcomes.decision), emotionalShift: 'improved' as const };

  // 7 days - slightly moderated
  const scenario7d = regretProb > 50
    ? { emoji: '🤔', narrative: "A week of perspective has helped me see this more clearly. I understand my patterns better now.", emotionalShift: 'stable' as const }
    : regretProb > 30
    ? { emoji: '😊', narrative: "Time has eased my concerns. What felt heavy then feels lighter now.", emotionalShift: 'improved' as const }
    : { emoji: '😌', narrative: "I'm grateful for the reflection I took. It helped me move forward with confidence.", emotionalShift: 'improved' as const };

  // 30 days - long-term perspective
  const scenario30d = regretProb > 65
    ? { emoji: '📚', narrative: "This became a lesson I carry forward. Every experience teaches something.", emotionalShift: 'improved' as const }
    : regretProb > 40
    ? { emoji: '🌱', narrative: "A month later, the details have faded but the growth remains.", emotionalShift: 'improved' as const }
    : { emoji: '✨', narrative: "Looking back, I see how this moment fit into a larger pattern of mindful choices.", emotionalShift: 'improved' as const };

  return [
    { timeframe: '24 Hours Later', ...scenario24h },
    { timeframe: '7 Days Later', ...scenario7d },
    { timeframe: '30 Days Later', ...scenario30d },
  ];
}

/**
 * Generate personalized insights based on patterns
 */
export function generateInsights(data: EmotionData): string[] {
  const insights: string[] = [];
  const { emotion, urgency, trigger } = data;
  
  if (urgency > 75) {
    insights.push("High urgency often masks fear. Consider what you're afraid might happen if you wait.");
  }
  
  if (emotion === 'angry') {
    insights.push("Anger often protects something vulnerable. What's underneath this feeling?");
  }
  
  if (emotion === 'anxious' && urgency > 50) {
    insights.push("Anxiety paired with urgency can create a false sense of emergency.");
  }
  
  if (trigger === 'message' && ['angry', 'sad'].includes(emotion)) {
    insights.push("Words sent in strong emotion often outlive the feeling that created them.");
  }
  
  if (urgency < 30 && ['calm', 'happy'].includes(emotion)) {
    insights.push("Your balanced state is ideal for thoughtful decision-making.");
  }
  
  return insights.length > 0 ? insights : ["Taking time to reflect is itself a valuable choice."];
}

/**
 * Main analysis function - entry point for AI reasoning
 */
export function analyzeDecision(data: EmotionData): AIResponse {
  const regretProbability = calculateRegretProbability(data);
  const riskLevel = regretProbability > 60 ? 'high' : regretProbability > 35 ? 'medium' : 'low';
  
  return {
    recommendation: generateRecommendation(data),
    futureSimulations: generateFutureSimulations(data),
    regretProbability,
    riskLevel,
    insights: generateInsights(data),
  };
}

/**
 * Generate narrative insight from statistics
 */
export function generateNarrativeInsight(stats: {
  totalDecisions: number;
  avgUrgency: number;
  dominantEmotion: string;
  regretAvoided: number;
  emotionTrend: 'improving' | 'stable' | 'declining';
}): string[] {
  const narratives: string[] = [];
  
  if (stats.totalDecisions >= 3) {
    narratives.push(`You've paused to reflect ${stats.totalDecisions} times. Each pause is a step toward clarity.`);
  }
  
  if (stats.regretAvoided > 70) {
    narratives.push(`You've avoided high-risk decisions ${stats.regretAvoided}% of the time. Your patience is paying off.`);
  } else if (stats.regretAvoided > 50) {
    narratives.push(`You're building a pattern of thoughtful choices. Keep nurturing this habit.`);
  }
  
  if (stats.avgUrgency < 40) {
    narratives.push("Your emotional temperature is cooling over time. This suggests growing self-awareness.");
  } else if (stats.avgUrgency > 65) {
    narratives.push("You often face high-urgency moments. Remember: urgency felt isn't always urgency real.");
  }
  
  const emotionNarratives: Record<string, string> = {
    anxious: "Anxiety has been a frequent visitor. Consider what it's trying to protect you from.",
    angry: "You tend to reflect most when feeling frustrated. This self-awareness is valuable.",
    calm: "Calm is your dominant state. You're making decisions from a centered place.",
    excited: "Excitement drives many of your reflections. Channel that energy thoughtfully.",
    happy: "Positive emotions guide much of your reflection. Joy can be a wise advisor.",
    sad: "You seek reflection during low moments. This gentleness with yourself matters.",
  };
  
  if (emotionNarratives[stats.dominantEmotion]) {
    narratives.push(emotionNarratives[stats.dominantEmotion]);
  }
  
  return narratives;
}
