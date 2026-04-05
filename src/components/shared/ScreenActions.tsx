import type { ReactNode } from 'react';

interface ScreenActionsProps {
  children: ReactNode;
}

/** Bottom-pinned action area for screen buttons */
export default function ScreenActions({ children }: ScreenActionsProps) {
  return <div className="screen-actions">{children}</div>;
}
