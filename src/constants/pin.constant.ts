export const NUMPAD = {
  BIO: 'bio',
  DELETE: 'delete',
  NUMBER: 'number',
} as const;

export const PIN_MODE = {
  SETUP: 'setup',
  CONFIRM: 'confirm',
  RESET: 'reset',
} as const;

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
