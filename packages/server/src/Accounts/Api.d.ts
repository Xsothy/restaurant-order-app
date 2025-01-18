import { HttpApiEndpoint, HttpApiGroup, HttpApiMiddleware, HttpApiSecurity } from "@effect/platform";
import { Unauthorized } from "@template/domain/Policy";
import { CurrentUser, User, UserNotFound } from "@template/domain/User";
declare const Authentication_base: HttpApiMiddleware.TagClass.BaseSecurity<Authentication, "Accounts/Api/Authentication", {
    readonly provides: typeof CurrentUser;
    readonly failure: typeof Unauthorized;
    readonly security: {
        readonly cookie: HttpApiSecurity.ApiKey;
    };
}, {
    readonly cookie: (_: import("effect/Redacted").Redacted<string>) => import("effect/Effect").Effect<User, Unauthorized, import("@effect/platform/HttpRouter").HttpRouter.Provided>;
}, {
    readonly cookie: HttpApiSecurity.ApiKey;
}>;
export declare class Authentication extends Authentication_base {
}
declare const AccountsApi_base: HttpApiGroup.HttpApiGroup<"accounts", HttpApiEndpoint.HttpApiEndpoint<"updateUser", "PATCH", {
    readonly id: number & import("effect/Brand").Brand<"UserId">;
}, never, {
    readonly email?: string & import("effect/Brand").Brand<"Email">;
}, never, {
    readonly id: number & import("effect/Brand").Brand<"UserId">;
    readonly accountId: number & import("effect/Brand").Brand<"AccountId">;
    readonly email: string & import("effect/Brand").Brand<"Email">;
    readonly createdAt: import("effect/DateTime").Utc;
    readonly updatedAt: import("effect/DateTime").Utc;
}, Unauthorized | UserNotFound, Authentication, never> | HttpApiEndpoint.HttpApiEndpoint<"getUserMe", "GET", never, never, never, never, {
    readonly id: number & import("effect/Brand").Brand<"UserId">;
    readonly accountId: number & import("effect/Brand").Brand<"AccountId">;
    readonly email: string & import("effect/Brand").Brand<"Email">;
    readonly accessToken: import("effect/Redacted").Redacted<string & import("effect/Brand").Brand<"AccessToken">>;
    readonly createdAt: import("effect/DateTime").Utc;
    readonly updatedAt: import("effect/DateTime").Utc;
    readonly account: {
        readonly id: number & import("effect/Brand").Brand<"AccountId">;
        readonly createdAt: import("effect/DateTime").Utc;
        readonly updatedAt: import("effect/DateTime").Utc;
    };
}, Unauthorized, Authentication, never> | HttpApiEndpoint.HttpApiEndpoint<"getUser", "GET", {
    readonly id: number & import("effect/Brand").Brand<"UserId">;
}, never, never, never, {
    readonly id: number & import("effect/Brand").Brand<"UserId">;
    readonly accountId: number & import("effect/Brand").Brand<"AccountId">;
    readonly email: string & import("effect/Brand").Brand<"Email">;
    readonly createdAt: import("effect/DateTime").Utc;
    readonly updatedAt: import("effect/DateTime").Utc;
}, Unauthorized | UserNotFound, Authentication, never> | HttpApiEndpoint.HttpApiEndpoint<"createUser", "POST", never, never, {
    readonly email: string & import("effect/Brand").Brand<"Email">;
}, never, {
    readonly id: number & import("effect/Brand").Brand<"UserId">;
    readonly accountId: number & import("effect/Brand").Brand<"AccountId">;
    readonly email: string & import("effect/Brand").Brand<"Email">;
    readonly accessToken: import("effect/Redacted").Redacted<string & import("effect/Brand").Brand<"AccessToken">>;
    readonly createdAt: import("effect/DateTime").Utc;
    readonly updatedAt: import("effect/DateTime").Utc;
    readonly account: {
        readonly id: number & import("effect/Brand").Brand<"AccountId">;
        readonly createdAt: import("effect/DateTime").Utc;
        readonly updatedAt: import("effect/DateTime").Utc;
    };
}, never, never, never>, never, never, false>;
export declare class AccountsApi extends AccountsApi_base {
}
export {};
//# sourceMappingURL=Api.d.ts.map