import { Model, SqlClient, SqlSchema } from "@effect/sql"
import { AccessToken } from "@template/domain/AccessToken"
import { PhoneNumber } from "@template/domain/PhoneNumber"
import { User } from "@template/domain/User"
import { Effect, pipe } from "effect"
import { SqlLive } from "../Sql.js"

export class UsersRepo extends Effect.Service<UsersRepo>()(
    "Accounts/UsersRepo",
    {
        effect: Effect.gen(function*() {
            const sql = yield* SqlClient.SqlClient
            const repo = yield* Model.makeRepository(User, {
                tableName: "users",
                spanPrefix: "UsersRepo",
                idColumn: "id"
            })

            const findByAccessTokenSchema = SqlSchema.findOne({
                Request: AccessToken,
                Result: User,
                execute: (key) => sql`select * from users where accessToken = ${key}`
            })
            const findByAccessToken = (apiKey: AccessToken) =>
                pipe(
                    findByAccessTokenSchema(apiKey),
                    Effect.orDie,
                    Effect.withSpan("UsersRepo.findByAccessToken")
                )

            const findByPhoneNumberSchema = SqlSchema.findOne({
                Request: PhoneNumber,
                Result: User,
                execute: (phoneNumber) => sql`select * from users where phoneNumber = ${phoneNumber}`
            })
            const findByPhoneNumber = (phoneNumber: PhoneNumber) =>
                pipe(
                    findByPhoneNumberSchema(phoneNumber),
                    Effect.orDie,
                    Effect.withSpan("UsersRepo.findByPhoneNumber")
                )

            return { ...repo, findByAccessToken, findByPhoneNumber } as const
        }),
        dependencies: [SqlLive]
    }
) {
}
