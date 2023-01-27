export const NUMPAD = {
  BIO: 'bio',
  DELETE: 'delete',
  NUMBER: 'number',
} as const;

export const PIN_MODE = {
  SETUP: 'setup',
  CONFIRM: 'confirm',
  RESET: 'reset',
  LEGACY_AUTH_MIGRATION: 'legacy_auth_migration',
} as const;

export type TPinMode = (typeof PIN_MODE)[keyof typeof PIN_MODE];

export const PIN_STEP = {
  ENTER: 1,
  REENTER: 2,
  FINISH: 3,
} as const;

export const PIN_REQUIRE_LENGTH: number = 6;

export const PIN_LAYOUT = {
  FULLSCREEN: 'fullscreen',
  MODAL: 'modal',
} as const;
