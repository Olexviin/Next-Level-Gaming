import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../components/CustomButton";
import { CustomInput } from "../components/CustomInput";
import { COLORS, SIZES } from "../constants/theme";

const availableServices = [
  { id: "p1", name: "Ultimate Gamer Pass", price: 150 },
  { id: "p2", name: "VIP Gaming Experience", price: 250 },
  { id: "p3", name: "E-Sports Training", price: 200 },
  { id: "e1", name: "VR Solo", price: 100 },
  { id: "e2", name: "Sim Racing", price: 120 },
];

export const CalculateFeesScreen = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
    setTotal(null); // Reset total when selection changes
  };

  const validate = () => {
    let valid = true;
    let newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Phone validation (SA format simplified)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      newErrors.phone = "Valid 10-digit phone required";
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Valid email required";
      valid = false;
    }

    if (selectedIds.length === 0) {
      Alert.alert("Selection Error", "Please select at least one service.");
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    // Calculate Subtotal
    const subtotal = selectedIds.reduce((sum, id) => {
      const service = availableServices.find((s) => s.id === id);
      return sum + (service ? service.price : 0);
    }, 0);

    // Apply 15% VAT
    const vat = subtotal * 0.15;
    const finalTotal = subtotal + vat;

    setTotal(finalTotal);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>CALCULATE FEES</Text>

        <Text style={styles.sectionTitle}>YOUR DETAILS</Text>
        <CustomInput
          label="Name"
          placeholder="John Doe"
          value={name}
          onChangeText={setName}
          error={errors.name}
        />
        <CustomInput
          label="Phone"
          placeholder="0821234567"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          error={errors.phone}
        />
        <CustomInput
          label="Email"
          placeholder="john@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={errors.email}
        />

        <Text style={styles.sectionTitle}>
          SELECT SERVICES ({selectedIds.length} selected)
        </Text>
        {availableServices.map((service) => {
          const isSelected = selectedIds.includes(service.id);
          return (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.checkboxRow,
                isSelected && styles.checkboxSelected,
              ]}
              onPress={() => toggleSelection(service.id)}
            >
              <View
                style={[styles.checkbox, isSelected && styles.checkboxChecked]}
              />
              <Text style={styles.checkboxLabel}>{service.name}</Text>
              <Text style={styles.checkboxPrice}>R {service.price}</Text>
            </TouchableOpacity>
          );
        })}

        <View style={styles.buttonRow}>
          <CustomButton
            title="Reset"
            variant="outline"
            onPress={() => {
              setSelectedIds([]);
              setTotal(null);
            }}
          />
          <CustomButton title="Calculate" onPress={handleCalculate} />
        </View>

        {total !== null && (
          <View style={styles.totalCard}>
            <Text style={styles.totalText}>Total (incl. 15% VAT):</Text>
            <Text style={styles.totalAmount}>R {total.toFixed(2)}</Text>
            <Text style={styles.disclaimer}>
              * This is a quoted fee and not a formal invoice.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
  },
  header: {
    color: COLORS.text,
    fontSize: SIZES.h1,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  checkboxSelected: { borderColor: COLORS.primary },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.textMuted,
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxLabel: { flex: 1, color: COLORS.text },
  checkboxPrice: { color: COLORS.textMuted },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  totalCard: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  totalText: { color: COLORS.text, fontSize: 16 },
  totalAmount: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 5,
  },
  disclaimer: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
  },
});
