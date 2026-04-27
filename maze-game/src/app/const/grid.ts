export const STAGE_CONFIG = [
  { stage: 1, rows: 16, cols: 16, fruits: 8 },
  { stage: 2, rows: 20, cols: 20, fruits: 10 },
  { stage: 3, rows: 24, cols: 24, fruits: 12 },
] as const;

export const SINGLE_STEP_CONFIG = { stage: 0, rows: 16, cols: 16, fruits: 12 };
