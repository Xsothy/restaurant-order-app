import type { HttpApiEndpoint, HttpApiGroup, HttpApiMiddleware, HttpApiSecurity } from "@effect/platform"
import type { Unauthorized } from "@template/domain/Policy"

declare const Authentication_base: HttpApiMiddleware.TagClass.BaseSecurity<
    Authentication,
    "Accounts/Api/Authentication",
    {
        readonly provides: any
        readonly failure: typeof Unauthorized
        readonly security: {
            readonly cookie: HttpApiSecurity.ApiKey
        }
    },
    {
        readonly cookie: (
            _: import("effect/Redacted").Redacted<string>
        ) => import("effect/Effect").Effect<
            any,
            Unauthorized,
            import("@effect/platform/HttpRouter").HttpRouter.Provided
        >
    },
    {
        readonly cookie: HttpApiSecurity.ApiKey
    }
>
export declare class Authentication extends Authentication_base {
}
declare const AccountsApi_base: HttpApiGroup.HttpApiGroup<
    "accounts",
    | HttpApiEndpoint.HttpApiEndpoint<"updateUser", "PATCH", any, never, {}, never, any, any, any, any>
    | HttpApiEndpoint.HttpApiEndpoint<"getUserMe", "GET", never, never, never, never, any, Unauthorized, any, never>
    | HttpApiEndpoint.HttpApiEndpoint<"getUser", "GET", any, never, never, never, any, any, any, any>
    | HttpApiEndpoint.HttpApiEndpoint<"createUser", "POST", never, never, any, never, any, never, any, never>,
    never,
    never,
    false
>
export declare class AccountsApi extends AccountsApi_base {
}
export {}
// # sourceMappingURL=Api.d.ts.map
