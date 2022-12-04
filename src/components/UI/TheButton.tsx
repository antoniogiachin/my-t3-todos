import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSync, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";

interface TheButtonProps {
  label?: string;
  severity?: string;
  icon?: IconProp;
  isLoading: boolean;
  funcToExecute?: () => unknown | Promise<unknown>;
}

export const TheButton = ({
  label = "provide a button label",
  icon = faPlus,
  severity = "",
  isLoading,
  funcToExecute,
}: TheButtonProps) => {
  const buttonTypeClass = useMemo(() => {
    switch (severity) {
      case "primary":
        return "btn btn-primary";
      case "secondary":
        return "btn btn-secondary";
      case "accent":
        return "btn btn-accent";
      case "ghost":
        return "btn btn-ghost";
      case "link":
        return "btn btn-link";
      default:
        return "btn";
    }
  }, [severity]);

  return (
    <button
      type={funcToExecute ? "button" : "submit"}
      onClick={funcToExecute}
      className={`flex content-between ${buttonTypeClass}`}
      disabled={isLoading}
    >
      {isLoading && <FontAwesomeIcon icon={faSync} className="fa-spin" />}
      {!isLoading && <FontAwesomeIcon icon={icon} className="fa-spin" />}
      <span>{label}</span>
    </button>
  );
};
