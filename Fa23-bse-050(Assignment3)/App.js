import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// --- 1. SCREEN COMPONENTS ---

const ContentCard = ({ title, navigation }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate("Details", { itemTitle: title })}
  >
    <View style={styles.cardImagePlaceholder} />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>
        Tap to view details and test back button
      </Text>
    </View>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => (
  <ScrollView style={styles.scrollView}>
    <View style={styles.screenPadding}>
      <Text style={styles.header}>Recommended for You</Text>
      <ContentCard title="Trending Modern UI" navigation={navigation} />
      <ContentCard title="React Native Secrets" navigation={navigation} />
      <ContentCard title="Mobile Design 2026" navigation={navigation} />
    </View>
  </ScrollView>
);

const DetailScreen = ({ route, navigation }) => {
  const { itemTitle } = route.params || { itemTitle: "Detail Page" };
  return (
    <View style={styles.container}>
      <View style={styles.detailHero} />
      <Text style={styles.title}>{itemTitle}</Text>
      <Text style={styles.description}>
        This screen demonstrates the "Stack" functionality. You moved forward to
        get here, and now you can move back.
      </Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

// NEW SETTINGS SCREEN (Replaces Search)
const SettingsScreen = () => (
  <View style={styles.containerTop}>
    <Text style={styles.header}>Settings</Text>
    <View style={styles.settingsList}>
      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingText}>Account Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingText}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingText}>Privacy & Security</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingText}>Dark Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.settingRow, { borderBottomWidth: 0 }]}>
        <Text style={[styles.settingText, { color: "red" }]}>Log Out</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.container}>
    <View style={styles.profileCircle} />
    <Text style={styles.title}>Bilal Developer</Text>
    <Text style={styles.cardSubtitle}>Mobile App Specialist</Text>
    <View style={styles.statsRow}>
      <View style={styles.statBox}>
        <Text style={styles.statNum}>12</Text>
        <Text>Apps</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statNum}>450</Text>
        <Text>Followers</Text>
      </View>
    </View>
  </View>
);

// --- 2. NAVIGATORS ---
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{ title: "Discovery" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailScreen}
        options={{ title: "View Item" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#2196F3",
          // UPDATED: Increased height and paddingBottom to lift above system buttons
          tabBarStyle: {
            height: 75,
            paddingBottom: 25,
            paddingTop: 10,
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        {/* Changed from Search to Settings */}
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// --- 3. STYLES (Modern App Look) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
  },
  containerTop: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
    paddingTop: 40,
  },
  scrollView: { flex: 1, backgroundColor: "#F8F9FA" },
  screenPadding: { padding: 20 },
  header: {
    fontSize: 28,
    fontWeight: "bold", // Changed to bold to prevent Android casting errors
    marginBottom: 20,
    color: "#1A1A1A",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#1A1A1A", marginTop: 15 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    overflow: "hidden",
  },
  cardImagePlaceholder: { height: 120, backgroundColor: "#2196F3" },
  cardTextContainer: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardSubtitle: { color: "#666", marginTop: 5 },
  backButton: {
    backgroundColor: "#1A1A1A",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 25,
  },
  buttonText: { color: "#FFF", fontWeight: "bold" },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#DDD",
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 30,
    width: "80%",
    justifyContent: "space-around",
  },
  statBox: { alignItems: "center" },
  statNum: { fontWeight: "bold", fontSize: 18 },
  detailHero: { width: "100%", height: 200, backgroundColor: "#2196F3" },
  description: {
    textAlign: "center",
    paddingHorizontal: 40,
    marginTop: 10,
    color: "#444",
  },
  // NEW STYLES FOR SETTINGS
  settingsList: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    elevation: 2,
    paddingHorizontal: 15,
  },
  settingRow: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  settingText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
