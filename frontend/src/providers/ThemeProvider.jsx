import { ThemeContext } from "../App";
import { ThemeProvider } from "styled-components";

const COLORS = {
  background: "#edf756",
  disabledBtnColor: "#bdbdbd",
  cardHeader: "#e5eaf5",
  cardBackground: "#F8F8F8",
  cardBodyBg: "rgb(230,241,255,1)",
  modalHeader: "red",
  lighterTheme: "#fcf6f5ff",
  darkerTheme: "#89abe3ff",
  transactionComplete: "green",
};

export default function ColorProvider({ children }) {
  // const value = {
  //   colors: COLORS,
  //   theme: {
  //     main: COLORS.darkerTheme,
  //     secondary: COLORS.lighterTheme,
  //   },
  // };

  const theme = {
    main: COLORS.darkerTheme,
    secondary: COLORS.lighterTheme,
  };

  console.log("theme", theme);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export function CProvider({ children }) {
  const value = {
    colors: COLORS,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
