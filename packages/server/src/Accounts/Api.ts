import { HttpApiEndpoint, HttpApiGroup, HttpApiMiddleware, HttpApiSecurity, OpenApi } from "@effect/platform"
import { Unauthorized } from "@template/domain/Policy"
import {
    AccountNotFound,
    CurrentUser,
    User,
    UserIdFromString,
    UserNotFound,
    UserWithSensitive
} from "@template/domain/User"
import { Schema } from "effect"

export class Authentication extends HttpApiMiddleware.Tag<Authentication>()(
    "Accounts/Api/Authentication",
    {
        provides: CurrentUser,
        failure: Unauthorized,
        security: {
            cookie: HttpApiSecurity.apiKey({
                in: "cookie",
                key: "token"
            })
        }
    }
) {}

export class AccountsApiGroup extends HttpApiGroup.make("accounts")
    .add(
        HttpApiEndpoint.patch("updateUser", "/users/:id")
            .setPath(Schema.Struct({ id: UserIdFromString }))
            .addSuccess(User.json)
            .addError(UserNotFound)
            .setPayload(Schema.partialWith(User.jsonUpdate, { exact: true }))
    )
    .add(
        HttpApiEndpoint.get("getUserMe", "/users/me").addSuccess(
            UserWithSensitive.json
        )
    )
    .add(
        HttpApiEndpoint.get("getUser", "/users/:id")
            .setPath(Schema.Struct({ id: UserIdFromString }))
            .addSuccess(User.json)
            .addError(UserNotFound)
    )
    .middlewareEndpoints(Authentication)
    // unauthenticated
    .add(
        HttpApiEndpoint.post("createUser", "/users")
            .addSuccess(UserWithSensitive.json)
            .setPayload(User.jsonCreate)
    )
    .add(
        HttpApiEndpoint.post("loginUser", "/login")
            .addSuccess(UserWithSensitive.json)
            .addError(AccountNotFound)
            .setPayload(User.jsonCreate)
    )
    .annotate(OpenApi.Title, "Accounts")
    .annotate(OpenApi.Description, "Manage user accounts")
{}
