"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalLink = ExternalLink;
const expo_router_1 = require("expo-router");
const expo_web_browser_1 = require("expo-web-browser");
const react_native_1 = require("react-native");
function ExternalLink({ href, ...rest }) {
    return (<expo_router_1.Link target="_blank" {...rest} href={href} onPress={async (event) => {
            if (react_native_1.Platform.OS !== "web") {
                // Prevent the default behavior of linking to the default browser on native.
                event.preventDefault();
                // Open the link in an in-app browser.
                if (typeof href == "string") {
                    await (0, expo_web_browser_1.openBrowserAsync)(href);
                }
            }
        }}/>);
}
//# sourceMappingURL=ExternalLink.js.map