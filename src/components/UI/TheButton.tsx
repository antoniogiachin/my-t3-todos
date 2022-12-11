import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faSync,
  faPlus,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getModalId, SET_MODAL } from "../../store/slicers/modalSlice";

interface TheButtonProps {
  label?: string;
  severity?:
    | "primary"
    | "secondary"
    | "accent"
    | "ghost"
    | "link"
    | "error"
    | "warning";
  icon?: IconProp;
  isLoading?: boolean;
  isModalHanlder?: boolean;
  funcToExecute?: () => unknown | Promise<unknown>;
}

export const TheButton = ({
  label = "provide a button label",
  icon = faPlus,
  severity,
  isLoading,
  funcToExecute,
  isModalHanlder,
}: TheButtonProps) => {
  const dispatch = useAppDispatch();
  const modalId = useAppSelector(getModalId);

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
      case "error":
        return "btn btn-error";
      case "warning":
        return "btn btn-warning";
      default:
        return "btn";
    }
  }, [severity]);

  let toBeRenderd: React.ReactNode;

  if (!isModalHanlder) {
    toBeRenderd = (
      <button
        type={funcToExecute ? "button" : "submit"}
        onClick={funcToExecute}
        className={buttonTypeClass}
        disabled={isLoading}
      >
        {isLoading && (
          <FontAwesomeIcon icon={faSync} className="fa-spin me-2" />
        )}
        {!isLoading && (
          <FontAwesomeIcon icon={icon} className={`${label && "mr-2"}`} />
        )}
        <span>{label}</span>
      </button>
    );
  } else {
    toBeRenderd = (
      <label htmlFor={modalId} className="btn" onClick={funcToExecute}>
        {isLoading && (
          <FontAwesomeIcon icon={faSync} className="fa-spin me-2" />
        )}
        {!isLoading && <FontAwesomeIcon icon={icon} className="mr-2" />}
        <span>{label}</span>
      </label>
    );
  }

  return <>{toBeRenderd}</>;
};
