import React, { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import {
  getActualTheme,
  getAvThemes,
  SET_THEME,
} from "../../store/slicers/themeSlice";

interface HeroProps {
  handleAppStart: () => Promise<void> | void;
}

export const Hero = ({ handleAppStart }: HeroProps) => {
  const avThemes = useAppSelector(getAvThemes);
  const actualTheme = useAppSelector(getActualTheme);
  const dispatch = useAppDispatch();

  const setTheme = (theme: string) => {
    localStorage.setItem("todo-theme", JSON.stringify({ theme }));
    dispatch(SET_THEME(theme));
    document.body.setAttribute("data-theme", theme);
  };

  let themeList: JSX.Element[] | JSX.Element;
  if (avThemes) {
    themeList = avThemes.map((theme, index) => (
      <li
        onClick={() => {
          setTheme(theme);
        }}
        key={index}
      >
        <a>{theme.toUpperCase()}</a>{" "}
      </li>
    ));
  } else {
    themeList = (
      <li>
        <a>{actualTheme}</a>
      </li>
    );
  }

  return (
    <article className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="mb-2 text-5xl font-bold">THINK NOW...</h1>
          <h1 className="text-5xl font-bold">...DO THEN!</h1>
          <p className="py-6">
            TODO-AG is your new favourite web-application for keeping track of
            your todo&apos;s
          </p>
          <div className="space-x-4">
            <button onClick={handleAppStart} className="btn-primary btn">
              Get Started
            </button>
            <div className="dropdown">
              <label tabIndex={0} className="btn-secondary btn m-1">
                Change Theme
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
              >
                {themeList}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
