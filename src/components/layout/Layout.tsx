import { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/hooks/hooks";
import {
  getShowNavbar,
  getHasError,
  SET_SHOW_NAVBAR,
  RESET_ERROR,
  getHasNotification,
  RESET_NOTIFICATION,
} from "../../store/slicers/appStatusSlice";
import { getModalId, RESET_MODAL } from "../../store/slicers/modalSlice";
import { getActualTheme, SET_THEME } from "../../store/slicers/themeSlice";
import { TheModal } from "../UI/TheModal";
import { TheNavbar } from "../UI/TheNavbar";

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  const hasError = useSelector(getHasError);
  const hasNotification = useSelector(getHasNotification);
  const showNavbar = useSelector(getShowNavbar);
  const modalId = useSelector(getModalId);

  const dispatch = useAppDispatch();
  interface localStoredTheme {
    theme: string;
  }

  // set Theme and navbar
  useEffect(() => {
    let theme = "dark";
    const getStoredTheme: localStoredTheme = JSON.parse(
      localStorage.getItem("todo-theme") as string
    );

    if (getStoredTheme && typeof getStoredTheme === "object") {
      theme = getStoredTheme.theme;
    }

    dispatch(SET_THEME(theme));
    document.body.setAttribute("data-theme", theme);
  }, [dispatch]);

  useEffect(() => {
    const handleResetOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && modalId) {
        dispatch(RESET_MODAL());
      }
    };
    document.addEventListener("keydown", handleResetOnEscape);

    return () => {
      document.removeEventListener("keydown", handleResetOnEscape);
    };
  }, [dispatch, modalId]);

  // reset error and notifications timer
  useEffect(() => {
    if (hasError) {
      setTimeout(() => {
        dispatch(RESET_ERROR());
      }, 3000);
    }

    if (hasNotification) {
      setTimeout(() => {
        dispatch(RESET_NOTIFICATION());
      }, 3000);
    }
  }, [hasError, hasNotification, dispatch]);

  return (
    <Fragment>
      {showNavbar && <TheNavbar />}
      <main className="min-h-screen bg-base-100">{children}</main>
      {modalId &&
        ReactDOM.createPortal(
          <TheModal />,
          document.querySelector<Element>("#portal") as Element
        )}
    </Fragment>
  );
};
