// Tag names
export const TAGS = {
  // Main categories
  BASICS: 'Basics',
  DATAFRAME: 'DataFrame',
  KANDY: 'Kandy',
  API: 'API',
  KTOR: 'Ktor',
  SPRING_AI: 'Spring AI',

  // Section tags
  SPRING_AI_TUTORIALS: 'Spring AI Tutorials',
  KOTLIN_LANGUAGE: 'Kotlin Language',
  CHARTS: 'Charts',
  DATAFRAME_EXAMPLES: 'DataFrame Examples',

  // Other tags
  AI: 'AI',
  LLM: 'LLM',
  AGENTS: 'Agents',
} as const;

// Tag colors
export const TAG_COLORS = {
  [TAGS.BASICS]: '#22c55e',
  [TAGS.DATAFRAME]: '#3b82f6',
  [TAGS.KANDY]: '#f093fb',
  [TAGS.API]: '#06b6d4',
  [TAGS.KTOR]: '#ef4444',
  [TAGS.SPRING_AI]: '#43e97b',
  [TAGS.SPRING_AI_TUTORIALS]: '#11998e',
  [TAGS.KOTLIN_LANGUAGE]: '#7f52ff',
  [TAGS.CHARTS]: '#f093fb',
  [TAGS.DATAFRAME_EXAMPLES]: '#667eea',
  [TAGS.AI]: '#8b5cf6',
  [TAGS.LLM]: '#ec4899',
  [TAGS.AGENTS]: '#f59e0b',
} as const;

// Helper to create a tag object
export const createTag = (name: keyof typeof TAG_COLORS) => ({
  name,
  color: TAG_COLORS[name],
});
