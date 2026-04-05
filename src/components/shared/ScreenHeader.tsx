import { ArrowLeftIcon } from './Icons';

interface ScreenHeaderProps {
  title: string;
  onBack: () => void;
}

/** Reusable header bar with back button and screen title */
export default function ScreenHeader({ title, onBack }: ScreenHeaderProps) {
  return (
    <div className="screen-header">
      <button className="btn btn-ghost btn-icon" onClick={onBack} aria-label="Go back">
        <ArrowLeftIcon size={24} />
      </button>
      <h2 className="screen-title">{title}</h2>
    </div>
  );
}