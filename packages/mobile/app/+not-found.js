"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotFoundScreen;
const expo_router_1 = require("expo-router");
const react_native_1 = require("react-native");
const ThemedText_1 = require("@/components/ThemedText");
const ThemedView_1 = require("@/components/ThemedView");
const react_1 = __importDefault(require("react"));
function NotFoundScreen() {
    return (<>
      <expo_router_1.Stack.Screen options={{ title: "Oops!" }}/>
      <ThemedView_1.ThemedView style={styles.container}>
        <ThemedText_1.ThemedText type="title">This screen doesn't exist.</ThemedText_1.ThemedText>
        <expo_router_1.Link href="/" style={styles.link}>
          <ThemedText_1.ThemedText type="link">Go to home screen!</ThemedText_1.ThemedText>
        </expo_router_1.Link>
      </ThemedView_1.ThemedView>
    </>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    link: {
        marginTop: 15,
        paddingVertical: 15
    }
});
//# sourceMappingURL=+not-found.js.map