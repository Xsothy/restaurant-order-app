import { Schema } from "effect"

export const PhoneNumber = Schema.String.pipe(
    Schema.pattern(/^[0-9]/),
    Schema.annotations({
        title: "Phone Number",
        description: "Phone number accepted only number"
    }),
    Schema.brand("PhoneNumber"),
    Schema.annotations({ title: "Phone Number" })
)

export type PhoneNumber = typeof PhoneNumber.Type
