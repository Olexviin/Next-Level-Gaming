import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../constants/theme";

interface Props {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
}

export const CustomButton: React.FC<Props> = ({
  title,
  onPress,
  variant = "primary",
  loading,
}) => {
  const bgColor =
    variant === "primary"
      ? COLORS.primary
      : variant === "secondary"
        ? COLORS.secondary
        : "transparent";
  const textColor = variant === "outline" ? COLORS.primary : COLORS.text;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: bgColor,
          borderWidth: variant === "outline" ? 1 : 0,
          borderColor: COLORS.primary,
        },
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: SIZES.padding,
    borderRadius: SIZES.borderRadius,
    alignItems: "center",
    marginVertical: 8,
  },
  text: { fontWeight: "bold", fontSize: SIZES.body },
});
