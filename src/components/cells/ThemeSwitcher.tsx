"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [isDarkThemeActive, setIsDarkThemeActive] = useState<boolean>(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkThemeActive(isDark);
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setIsDarkThemeActive(isDark);
  };

  return (
    <>
      {isDarkThemeActive === null ? null : (
        <div onClick={toggleTheme}>
          {isDarkThemeActive ? <Sun /> : <Moon />}
        </div>
      )}
    </>
  );
}
