import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  error?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}

export const CustomInput: React.FC<Props> = ({
  placeholder,
  value,
  onChangeText,
  label,
  error,
  keyboardType = "default",
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && { borderColor: COLORS.error }]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { color: COLORS.text, marginBottom: 4, fontSize: 14 },
  input: {
    backgroundColor: COLORS.cardBg,
    color: COLORS.text,
    padding: 12,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  errorText: { color: COLORS.error, fontSize: 12, marginTop: 4 },
});
