import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SECRET_PASSCODE,
  PASSCODE_HINTS,
  SONGS,
  MI_PHOTOS,
  LOVE_LETTER_PARAGRAPHS,
  appendDigit,
  removeDigit,
  validatePasscode,
  getNextHintIndex,
  getNextTrackIndex,
  getPrevTrackIndex,
  formatTime,
} from './giftData';

test('passcode is 1111 and validates accurately', () => {
  assert.equal(SECRET_PASSCODE, '1111');
  assert.equal(validatePasscode('1111'), true);
  assert.equal(validatePasscode('2902'), false);
  assert.equal(validatePasscode('111'), false);
});

test('appendDigit and removeDigit manage 4-digit passcode input safely', () => {
  let code = '';
  code = appendDigit(code, '1');
  code = appendDigit(code, '1');
  code = appendDigit(code, 'a'); // ignored
  assert.equal(code, '11');

  code = appendDigit(code, '1');
  code = appendDigit(code, '1');
  code = appendDigit(code, '9'); // ignored past length 4
  assert.equal(code, '1111');

  code = removeDigit(code);
  assert.equal(code, '111');
});

test('hints, songs, and Mi photos are populated and cycle properly', () => {
  assert.ok(PASSCODE_HINTS.length >= 3);
  assert.ok(PASSCODE_HINTS.every((h) => h.codeDisplay.includes('1')));
  assert.equal(getNextHintIndex(0, 3), 1);
  assert.equal(getNextHintIndex(2, 3), 0);

  assert.equal(SONGS.length, 4);
  assert.equal(getNextTrackIndex(3, 4), 0);
  assert.equal(getPrevTrackIndex(0, 4), 3);

  assert.equal(MI_PHOTOS.length, 9);
  assert.ok(LOVE_LETTER_PARAGRAPHS.length >= 4);
});

test('formatTime formats audio seconds into MM:SS', () => {
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(65), '01:05');
  assert.equal(formatTime(-5), '00:00');
  assert.equal(formatTime(Number.NaN), '00:00');
});
