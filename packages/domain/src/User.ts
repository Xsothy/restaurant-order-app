import { HttpApiSchema } from "@effect/platform"
import { Model } from "@effect/sql"
import { Context, Schema } from "effect"
import { AccessToken } from "./AccessToken.js"
import { Account, AccountId } from "./Account.js"
import { PhoneNumber } from "./PhoneNumber.js"

export const UserId = Schema.Number.pipe(Schema.brand("UserId"))
export type UserId = typeof UserId.Type

export const UserIdFromString = Schema.NumberFromString.pipe(
    Schema.compose(UserId)
)

export class User extends Model.Class<User>("User")({
    id: Model.Generated(UserId),
    accountId: Model.GeneratedByApp(AccountId),
    phoneNumber: PhoneNumber,
    accessToken: Model.Sensitive(AccessToken),
    createdAt: Model.DateTimeInsert,
    updatedAt: Model.DateTimeUpdate
}) {}

export class UserWithSensitive extends Model.Class<UserWithSensitive>(
    "UserWithSensitive"
)({
    ...Model.fields(User),
    accessToken: AccessToken,
    account: Account
}) {}

export class CurrentUser extends Context.Tag("Domain/User/CurrentUser")<
    CurrentUser,
    User
>() {}

export class UserNotFound extends Schema.TaggedError<UserNotFound>()(
    "UserNotFound",
    { id: UserId },
    HttpApiSchema.annotations({ status: 404 })
) {}

export class AccountNotFound extends Schema.TaggedError<AccountNotFound>()(
    "AccountNotFound",
    { phoneNumber: PhoneNumber },
    HttpApiSchema.annotations({ status: 404 })
) {}
