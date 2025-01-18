"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabLayout;
const expo_router_1 = require("expo-router");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const HapticTab_1 = require("@/components/HapticTab");
const IconSymbol_1 = require("@/components/ui/IconSymbol");
const TabBarBackground_1 = __importDefault(require("@/components/ui/TabBarBackground"));
const Colors_1 = require("@/constants/Colors");
const useColorScheme_1 = require("@/hooks/useColorScheme");
function TabLayout() {
    const colorScheme = (0, useColorScheme_1.useColorScheme)();
    return (<expo_router_1.Tabs screenOptions={{
            tabBarActiveTintColor: Colors_1.Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarButton: HapticTab_1.HapticTab,
            tabBarBackground: TabBarBackground_1.default,
            tabBarStyle: react_native_1.Platform.select({
                ios: {
                    // Use a transparent background on iOS to show the blur effect
                    position: "absolute"
                },
                default: {}
            })
        }}>
      <expo_router_1.Tabs.Screen name="index" options={{
            title: "Home",
            tabBarIcon: ({ color }) => <IconSymbol_1.IconSymbol size={28} name="house.fill" color={color}/>
        }}/>
      <expo_router_1.Tabs.Screen name="explore" options={{
            title: "Explore",
            tabBarIcon: ({ color }) => <IconSymbol_1.IconSymbol size={28} name="paperplane.fill" color={color}/>
        }}/>
    </expo_router_1.Tabs>);
}
//# sourceMappingURL=_layout.js.map