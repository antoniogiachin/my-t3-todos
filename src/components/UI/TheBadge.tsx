import React, { CSSProperties, useMemo } from "react";

export enum Severity {
  PRIMARY,
  SECONDARY,
  ACCENT,
  GHOST,
}

interface TheBadgeProps {
  label?: string;
  severity?: Severity;
  style?: CSSProperties;
}

export const TheBadge = ({
  label = "provide a badge label",
  severity,
  style,
}: TheBadgeProps) => {
  const badgeTypeClass = useMemo(() => {
    switch (severity) {
      case Severity.PRIMARY:
        return "badge badge-primary";
      case Severity.SECONDARY:
        return "badge badge-secondary";
      case Severity.ACCENT:
        return "badge badge-accent";
      case Severity.GHOST:
        return "badge badge-ghost";
      default:
        return "badge";
    }
  }, [severity]);

  return (
    <div className={badgeTypeClass} style={style}>
      <span>{label}</span>
    </div>
  );
};
