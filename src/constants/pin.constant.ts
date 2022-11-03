export const NUMPAD = {
  BIO: 'bio',
  DELETE: 'delete',
  NUMBER: 'number',
} as const;

export const PIN_MODE = {
  SETUP: 'setup',
  CONFIRM: 'confirm',
  RESET: 'reset',
  SUCCESS: 'success',
  FAIL: 'fail',
} as const;

export const PIN_SETUP_STAGE = {
  FIRST: 1,
  SECOND: 2,
} as const;

export const PIN_REQUIRE_LENGTH: number = 6;
