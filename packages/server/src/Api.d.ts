import type { HttpApi } from "@effect/platform"
import type { AccountsApi } from "./Accounts/Api.js"
import type { TodosApi } from "./Todo/Api.js"

declare const Api_base: HttpApi.HttpApi<
    "Api",
    typeof AccountsApi | typeof TodosApi,
    import("@effect/platform/HttpApiError").HttpApiDecodeError,
    never
>
export declare class Api extends Api_base {
}
export {}
// # sourceMappingURL=Api.d.ts.map
