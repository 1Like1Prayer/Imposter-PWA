import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface PlayerInputFormProps {
  onAddPlayer: (name: string) => boolean;
}

/** Form with text input and add button for entering new players */
export default function PlayerInputForm({ onAddPlayer }: PlayerInputFormProps) {
  const { t } = useTranslation();
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
        placeholder={t('players.placeholder')}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        enterKeyHint="done"
      />
      <button
        className="btn btn-primary"
        type="submit"
        disabled={!inputValue.trim()}
      >
        {t('players.add')}
      </button>
    </form>
  );
}
