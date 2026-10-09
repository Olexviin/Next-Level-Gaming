# NGL & Esports Arena Mobile App

A modern, high-tech mobile application built for **Next Level Gaming (NGL)**. This app serves as the digital hub for the esports arena, allowing users to explore gaming packages, calculate fees (including VAT), book sessions, register for tournaments, and track their leaderboard rankings.

## 🚀 Tech Stack

- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **Navigation:** Expo Router (File-based routing)
- **Icons:** React Native Vector Icons (Ionicons)
- **State Management:** React Hooks (`useState`, `useEffect`)

## 🎨 Design & Theme

The app follows a "Modern, High-Tech and Vibrant/Dark" theme as per the client's requirements (Mr. Naidoo). The color palette is centralized in `src/constants/theme.ts`:

- **Primary Background:** Deep Space (`#0B0C10`) - Reduces eye strain in dark environments.
- **Primary Brand:** Electric Purple (`#8A2BE2`) - Used for primary call-to-action buttons.
- **Secondary Accent:** Cyan Blue (`#00FFFF`) - Used for headings and secondary highlights.
- **Text:** Pure White (`#FFFFFF`) and Soft Grey (`#A0A0A0`) - Ensures maximum readability.

## ✨ Key Features Implemented

1.  **Dual-Platform Compatibility:** Designed to work seamlessly as a mobile application (and adaptable for web).
2.  **Service Showcase:** Clear separation between "Gaming Packages" (Ultimate Gamer Pass, VIP, Esports Training) and "Individual Experiences" (VR, Sim Racing).
3.  **Fee Calculator with VAT:**
    - Users can enter their details (Name, Phone, Email).
    - Users can select multiple services from a checklist.
    - The app calculates the subtotal, applies a 15% VAT, and displays a quoted total (not a formal invoice).
4.  **Booking System:** Interface to request a gaming session, choose date/time, and specify party size.
5.  **Tournaments & Events:** Browse featured and upcoming tournaments, view prize pools, and register.
6.  **Community & Leaderboard:** Features to "Find a Squad" to fill empty roster slots and a global leaderboard to track player rankings.
7.  **Form Validation:** Robust error handling for user inputs (e.g., 10-digit phone number validation, email format validation).

## ⚠️ Important Architectural Change: Expo Router vs. React Navigation

During development, the project transitioned from a standard React Navigation setup (`App.tsx` + `src/navigation` folder) to **Expo Router**.

### What changed?

- **Deleted:** `src/navigation/AppNavigator.tsx` and `src/navigation/TabNavigator.tsx`.
- **Added:** The `src/app/` directory. This directory now handles all routing.
- **Wrapper Pattern:** Your actual UI code remains in `src/screens/`. The files inside `src/app/` are tiny "wrapper" files that simply import and export the screens from `src/screens/`. This keeps UI logic separate from routing logic.
