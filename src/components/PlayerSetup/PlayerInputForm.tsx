import { useState, type FormEvent } from 'react';
import { PLAYERS } from '../../copies';

interface PlayerInputFormProps {
  onAddPlayer: (name: string) => boolean;
}

/** Form with text input and add button for entering new players */
export default function PlayerInputForm({ onAddPlayer }: PlayerInputFormProps) {
  const [inputValue, setInputValue] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const success = onAddPlayer(inputValue);
    if (success) setInputValue('');
  }

  return (
    <form className="player-input-row" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder={PLAYERS.INPUT_PLACEHOLDER}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoFocus
      />
      <button
        className="btn btn-primary"
        type="submit"
        disabled={!inputValue.trim()}
      >
        {PLAYERS.ADD_BUTTON}
      </button>
    </form>
  );
}
