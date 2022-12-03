import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/hooks/hooks";
import {
  getShowNavbar,
  SET_SHOW_NAVBAR,
} from "../../store/slicers/appStatusSlice";
import { getActualTheme, SET_THEME } from "../../store/slicers/themeSlice";
import { TheNavbar } from "../UI/TheNavbar";

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  const actualTheme = useSelector(getActualTheme);
  const showNavbar = useSelector(getShowNavbar);

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

  return (
    <Fragment>
      {showNavbar && <TheNavbar />}
      <main className="min-h-screen">{children}</main>
    </Fragment>
  );
};
