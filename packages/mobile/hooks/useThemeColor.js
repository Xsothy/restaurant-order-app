"use strict";
/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeColor = useThemeColor;
const Colors_1 = require("@/constants/Colors");
const useColorScheme_1 = require("@/hooks/useColorScheme");
function useThemeColor(props, colorName) {
    const theme = (0, useColorScheme_1.useColorScheme)() ?? 'light';
    const colorFromProps = props[theme];
    if (colorFromProps) {
        return colorFromProps;
    }
    else {
        return Colors_1.Colors[theme][colorName];
    }
}
//# sourceMappingURL=useThemeColor.js.map