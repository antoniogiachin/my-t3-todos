import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/hooks/hooks";
import { getActualTheme, SET_THEME } from "../../store/slicers/themeSlice";

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  const actualTheme = useSelector(getActualTheme);
  const dispatch = useAppDispatch();
  interface localStoredTheme {
    theme: string;
  }

  useEffect(() => {
    let theme = "dark";
    const getStoredTheme: localStoredTheme | string = JSON.parse(
      localStorage.getItem("todo-theme") || theme
    );

    if (typeof getStoredTheme === "object") {
      theme = getStoredTheme.theme;
    }
    console.log(theme);

    dispatch(SET_THEME(theme));
    document.body.setAttribute("data-theme", theme);
  }, [dispatch]);

  return <main>{children}</main>;
};
