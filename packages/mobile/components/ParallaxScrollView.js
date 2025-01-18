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
exports.default = ParallaxScrollView;
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const ThemedView_1 = require("@/components/ThemedView");
const TabBarBackground_1 = require("@/components/ui/TabBarBackground");
const useColorScheme_1 = require("@/hooks/useColorScheme");
const HEADER_HEIGHT = 250;
function ParallaxScrollView({ children, headerImage, headerBackgroundColor, }) {
    const colorScheme = (0, useColorScheme_1.useColorScheme)() ?? 'light';
    const scrollRef = (0, react_native_reanimated_1.useAnimatedRef)();
    const scrollOffset = (0, react_native_reanimated_1.useScrollViewOffset)(scrollRef);
    const bottom = (0, TabBarBackground_1.useBottomTabOverflow)();
    const headerAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        return {
            transform: [
                {
                    translateY: (0, react_native_reanimated_1.interpolate)(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]),
                },
                {
                    scale: (0, react_native_reanimated_1.interpolate)(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
                },
            ],
        };
    });
    return (<ThemedView_1.ThemedView style={styles.container}>
      <react_native_reanimated_1.default.ScrollView ref={scrollRef} scrollEventThrottle={16} scrollIndicatorInsets={{ bottom }} contentContainerStyle={{ paddingBottom: bottom }}>
        <react_native_reanimated_1.default.View style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
        ]}>
          {headerImage}
        </react_native_reanimated_1.default.View>
        <ThemedView_1.ThemedView style={styles.content}>{children}</ThemedView_1.ThemedView>
      </react_native_reanimated_1.default.ScrollView>
    </ThemedView_1.ThemedView>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: HEADER_HEIGHT,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
});
//# sourceMappingURL=ParallaxScrollView.js.map