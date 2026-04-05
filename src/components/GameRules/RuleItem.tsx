interface RuleItemProps {
  stepNumber: number;
  /** HTML string with <strong> tags for emphasis */
  text: string;
}

/** Single rule step with numbered badge */
export default function RuleItem({ stepNumber, text }: RuleItemProps) {
  return (
    <div className="rule-item">
      <div className="rule-number">{stepNumber}</div>
      <p className="rule-text" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}
