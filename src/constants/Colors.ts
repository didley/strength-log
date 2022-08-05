const tintColorLight = "#fc7303";
const tintColorDark = "#ECFF00";

const Colors = {
  light: {
    text: "#000",
    background: "#eee",
    off: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    off: "#303030",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};

export type ThemeColorName = keyof typeof Colors.light &
  keyof typeof Colors.dark;

export default Colors;
