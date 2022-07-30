/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */
import {
  Pressable as DefaultPressable,
  PressableProps as DefaultPressableProps,
  ScrollView as DefaultScrollView,
  Text as DefaultText,
  TextInput as DefaultTextInput,
  View as DefaultView,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ScrollViewProps = ThemeProps & DefaultScrollView["props"];
export type PressableProps = ViewProps & DefaultPressableProps;
export type ButtonProps = {
  text: string;
  onPress: DefaultPressableProps["onPress"];
  bold?: boolean;
  btnProps?: DefaultPressableProps;
  textProps?: TextProps;
};

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultTextInput style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Pressable(props: PressableProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "off"
  );

  return (
    <DefaultPressable style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function Button(props: ButtonProps) {
  const { onPress, text, bold = false, btnProps, textProps } = props;
  const tintColor = useThemeColor(
    { light: textProps?.lightColor, dark: textProps?.darkColor },
    "tint"
  );

  return (
    <DefaultPressable onPress={onPress} {...btnProps}>
      <DefaultText
        style={{
          color: tintColor,
          fontWeight: bold ? "bold" : "400",
          margin: 8,
          fontSize: 18,
          textAlign: "center",
        }}
        {...textProps}
      >
        {text}
      </DefaultText>
    </DefaultPressable>
  );
}
