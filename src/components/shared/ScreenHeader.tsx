import { ArrowLeftIcon } from './Icons';
import { useTranslation } from 'react-i18next'

interface ScreenHeaderProps {
  title: string;
  onBack: () => void;
}

/** Reusable header bar with back button and screen title */
export default function ScreenHeader({ title, onBack }: ScreenHeaderProps) {
  const { t } = useTranslation()
  return (
    <div className="screen-header">
      <button className="btn btn-ghost btn-icon" onClick={onBack} aria-label={t('goBack', 'Go back')}>
        <ArrowLeftIcon size={24} />
      </button>
      <h2 className="screen-title">{title}</h2>
    </div>
  );
}