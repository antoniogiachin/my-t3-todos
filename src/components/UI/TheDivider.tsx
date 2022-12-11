import React from "react";

interface TheDividerProps {
  children?: React.ReactNode;
}

export const TheDivider = ({ children }: TheDividerProps) => {
  return <div className="divider">{children}</div>;
};
