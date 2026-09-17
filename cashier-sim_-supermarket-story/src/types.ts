export interface AvatarConfig {
  name: string;
  genderOrBody: 'type_a' | 'type_b';
  skinColor: string;
  hairStyle: string;
  hairColor: string;
  outfit: string;
  outfitColor: string;
  accessory: string;
  weapon: string;
  expression: 'neutral' | 'determined' | 'inquisitive' | 'smirk' | 'gentle' | 'calm';
}

export interface WeaponDetail {
  id: string;
  name: string;
  type: string;
  playstyle: string;
  mobilityTag: string;
  puzzleUtility: string;
  rationale: string;
  baseDamageDesc: string;
}

export interface BiomeLevel {
  id: number;
  name: string;
  subtitle: string;
  biomeType: string;
  duration: string;
  difficultyRating: number; // 1 to 5
  colorPalette: {
    hex: string;
    name: string;
    role: string;
  }[];
  colorPsychology: string;
  atmosphere: string;
  newEnemies: {
    name: string;
    behavior: string;
    weakness: string;
  }[];
  environmentalHazards: string[];
  puzzleComplexity: string;
  pageHidingTechniques: string[];
  boss: {
    name: string;
    title: string;
    phases: string[];
    telegraphedMechanic: string;
  };
  skillTaught: {
    name: string;
    description: string;
    gatingNext: string;
  };
}

export interface GddChapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  directorNotes: string;
  keyTakeaways: string[];
}

export interface QuestItem {
  id: string;
  title: string;
  type: 'main' | 'side' | 'secret';
  location: string;
  status: 'active' | 'completed' | 'locked';
  pageReward: number;
  loreSnippet: string;
  task: string;
}
