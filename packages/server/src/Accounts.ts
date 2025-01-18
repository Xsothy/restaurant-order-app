import { SqlClient } from "@effect/sql"
import type { AccessToken } from "@template/domain/AccessToken"
import { accessTokenFromString } from "@template/domain/AccessToken"
import { Account } from "@template/domain/Account"
import { policyRequire } from "@template/domain/Policy"
import type { UserId } from "@template/domain/User"
import { AccountNotFound, User, UserNotFound, UserWithSensitive } from "@template/domain/User"
import { Effect, Layer, Option, pipe } from "effect"
import { AccountsRepo } from "./Accounts/AccountsRepo.js"
import { UsersRepo } from "./Accounts/UsersRepo.js"
import { SqlLive, SqlTest } from "./Sql.js"
import { Uuid } from "./Uuid.js"

export class Accounts extends Effect.Service<Accounts>()("Accounts", {
    effect: Effect.gen(function*() {
        const sql = yield* SqlClient.SqlClient
        const accountRepo = yield* AccountsRepo
        const userRepo = yield* UsersRepo
        const uuid = yield* Uuid

        const createUser = (user: typeof User.jsonCreate.Type) =>
            accountRepo.insert(Account.insert.make({})).pipe(
                Effect.tap((account) => Effect.annotateCurrentSpan("account", account)),
                Effect.bindTo("account"),
                Effect.bind("accessToken", () => uuid.generate.pipe(Effect.map(accessTokenFromString))),
                Effect.bind("user", ({ accessToken, account }) =>
                    userRepo.insert(
                        User.insert.make({
                            ...user,
                            accountId: account.id,
                            accessToken
                        })
                    )),
                Effect.map(
                    ({ account, user }) =>
                        new UserWithSensitive({
                            ...user,
                            account
                        })
                ),
                sql.withTransaction,
                Effect.orDie,
                Effect.withSpan("Accounts.createUser", { attributes: { user } }),
                policyRequire("User", "create")
            )

        const updateUser = (
            id: UserId,
            user: Partial<typeof User.jsonUpdate.Type>
        ) => userRepo.findById(id).pipe(
            Effect.flatMap(
                Option.match({
                    onNone: () => new UserNotFound({ id }),
                    onSome: Effect.succeed
                })
            ),
            Effect.andThen((previous) =>
                userRepo.update({
                    ...previous,
                    ...user,
                    id,
                    updatedAt: undefined
                })
            ),
            sql.withTransaction,
            Effect.catchTag("SqlError", (err) => Effect.die(err)),
            Effect.withSpan("Accounts.updateUser", { attributes: { id, user } }),
            policyRequire("User", "update")
        )

        const findUserByAccessToken = (apiKey: AccessToken) =>
            pipe(
                userRepo.findByAccessToken(apiKey),
                Effect.withSpan("Accounts.findUserByAccessToken"),
                policyRequire("User", "read")
            )

        const findUserById = (id: UserId) =>
            pipe(
                userRepo.findById(id),
                Effect.withSpan("Accounts.findUserById", {
                    attributes: { id }
                }),
                policyRequire("User", "read")
            )

        const embellishUser = (user: User) =>
            pipe(
                accountRepo.findById(user.accountId),
                Effect.flatten,
                Effect.map((account) => new UserWithSensitive({ ...user, account })),
                Effect.orDie,
                Effect.withSpan("Accounts.embellishUser", {
                    attributes: { id: user.id }
                }),
                policyRequire("User", "readSensitive")
            )

        const loginUser = (user: typeof User.jsonCreate.Type) =>
            pipe(
                userRepo.findByPhoneNumber(user.phoneNumber),
                Effect.flatMap(
                    Option.match({
                        onNone: () => new AccountNotFound({ phoneNumber: user.phoneNumber }),
                        onSome: Effect.succeed
                    })
                ),
                Effect.map(
                    (user) =>
                        new UserWithSensitive({
                            ...user,
                            account: accountRepo.findById(user.accountId).pipe(
                                Effect.runSync,
                                Option.getOrThrow
                            )
                        })
                ),
                Effect.withSpan("Accounts.loginUser")
            )

        return {
            createUser,
            updateUser,
            findUserByAccessToken,
            findUserById,
            embellishUser,
            loginUser
        } as const
    }),
    dependencies: [
        SqlLive,
        AccountsRepo.Default,
        UsersRepo.Default,
        Uuid.Default
    ]
}) {
    static Test = this.DefaultWithoutDependencies.pipe(
        Layer.provideMerge(SqlTest),
        Layer.provideMerge(Uuid.Test)
    )
}
