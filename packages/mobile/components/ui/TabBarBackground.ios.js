"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlurTabBarBackground;
exports.useBottomTabOverflow = useBottomTabOverflow;
const bottom_tabs_1 = require("@react-navigation/bottom-tabs");
const expo_blur_1 = require("expo-blur");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
function BlurTabBarBackground() {
    return (<expo_blur_1.BlurView 
    // System chrome material automatically adapts to the system's theme
    // and matches the native tab bar appearance on iOS.
    tint="systemChromeMaterial" intensity={100} style={react_native_1.StyleSheet.absoluteFill}/>);
}
function useBottomTabOverflow() {
    const tabHeight = (0, bottom_tabs_1.useBottomTabBarHeight)();
    const { bottom } = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    return tabHeight - bottom;
}
//# sourceMappingURL=TabBarBackground.ios.js.map