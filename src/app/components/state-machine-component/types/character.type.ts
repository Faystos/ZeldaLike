export const CHARACTER_TYPE = {
  IDLE_STATE: 'IDLE_STATE',
  MOVE_STATE: 'MOVE_STATE',
} as const;
export type CHARACTER_TYPE = (typeof CHARACTER_TYPE)[keyof typeof CHARACTER_TYPE];
