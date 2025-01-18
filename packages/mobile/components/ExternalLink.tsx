import { Link } from "expo-router"
import { openBrowserAsync } from "expo-web-browser"
import { type ComponentProps } from "react"
import { Platform } from "react-native"

type Props = ComponentProps<typeof Link>

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== "web") {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault()
          // Open the link in an in-app browser.
          if (typeof href == "string") {
            await openBrowserAsync(href)
          }
        }
      }}
    />
  )
}