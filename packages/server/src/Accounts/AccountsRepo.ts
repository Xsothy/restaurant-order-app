import { Model } from "@effect/sql"
import { Account } from "@template/domain/Account"
import { Effect } from "effect"
import { SqlLive } from "../Sql.js"

export const make = Model.makeRepository(Account, {
    tableName: "accounts",
    spanPrefix: "Repo",
    idColumn: "id"
})

export class AccountsRepo extends Effect.Service<AccountsRepo>()(
    "Accounts/Repo",
    {
        effect: make,
        dependencies: [SqlLive]
    }
) {
}
