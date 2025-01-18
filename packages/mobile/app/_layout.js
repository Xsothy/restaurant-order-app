"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
const native_1 = require("@react-navigation/native");
const expo_font_1 = require("expo-font");
const expo_router_1 = require("expo-router");
const SplashScreen = __importStar(require("expo-splash-screen"));
const expo_status_bar_1 = require("expo-status-bar");
const react_1 = require("react");
require("react-native-reanimated");
const useColorScheme_1 = require("@/hooks/useColorScheme");
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
function RootLayout() {
    const colorScheme = (0, useColorScheme_1.useColorScheme)();
    const [loaded] = (0, expo_font_1.useFonts)({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
    });
    (0, react_1.useEffect)(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);
    if (!loaded) {
        return null;
    }
    return (<native_1.ThemeProvider value={colorScheme === "dark" ? native_1.DarkTheme : native_1.DefaultTheme}>
      <expo_router_1.Stack>
        <expo_router_1.Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <expo_router_1.Stack.Screen name="+not-found"/>
      </expo_router_1.Stack>
      <expo_status_bar_1.StatusBar style="auto"/>
    </native_1.ThemeProvider>);
}
//# sourceMappingURL=_layout.js.map