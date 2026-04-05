/** Word reveal screen strings */
export const REVEAL = {
  PROGRESS: (current: number, total: number) =>
    `Player ${current} of ${total}`,
  TAP_HINT: 'Tap to see your word',
  PRIVACY_WARNING: (name: string) =>
    `Make sure only ${name} is looking!`,
  ROLE_IMPOSTER: 'You are the Imposter!',
  ROLE_SAFE: 'You are safe',
  HINT_LABEL: 'Your hint',
  PASS_TO_NEXT: 'Pass to next player',
  ALL_SEEN: 'Everyone has seen their word',

  /** Shown after all players have revealed */
  READY_TITLE: "Everyone's Ready!",
  READY_SUBTITLE:
    'Start giving one-word clues. After 2–3 rounds, vote on who the imposter is!',
  LETS_PLAY: "Let's Play!",
} as const;