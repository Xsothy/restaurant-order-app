"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconSymbol = IconSymbol;
const expo_symbols_1 = require("expo-symbols");
function IconSymbol({ name, size = 24, color, style, weight = 'regular', }) {
    return (<expo_symbols_1.SymbolView weight={weight} tintColor={color} resizeMode="scaleAspectFit" name={name} style={[
            {
                width: size,
                height: size,
            },
            style,
        ]}/>);
}
//# sourceMappingURL=IconSymbol.ios.js.map