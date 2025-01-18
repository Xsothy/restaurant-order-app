"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collapsible = Collapsible;
const react_1 = require("react");
const react_native_1 = require("react-native");
const ThemedText_1 = require("@/components/ThemedText");
const ThemedView_1 = require("@/components/ThemedView");
const IconSymbol_1 = require("@/components/ui/IconSymbol");
const Colors_1 = require("@/constants/Colors");
const useColorScheme_1 = require("@/hooks/useColorScheme");
function Collapsible({ children, title }) {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const theme = (0, useColorScheme_1.useColorScheme)() ?? 'light';
    return (<ThemedView_1.ThemedView>
      <react_native_1.TouchableOpacity style={styles.heading} onPress={() => setIsOpen((value) => !value)} activeOpacity={0.8}>
        <IconSymbol_1.IconSymbol name="chevron.right" size={18} weight="medium" color={theme === 'light' ? Colors_1.Colors.light.icon : Colors_1.Colors.dark.icon} style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}/>

        <ThemedText_1.ThemedText type="defaultSemiBold">{title}</ThemedText_1.ThemedText>
      </react_native_1.TouchableOpacity>
      {isOpen && <ThemedView_1.ThemedView style={styles.content}>{children}</ThemedView_1.ThemedView>}
    </ThemedView_1.ThemedView>);
}
const styles = react_native_1.StyleSheet.create({
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    content: {
        marginTop: 6,
        marginLeft: 24,
    },
});
//# sourceMappingURL=Collapsible.js.map