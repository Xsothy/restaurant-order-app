import { policy } from "@template/domain/Policy"
import type { UserId } from "@template/domain/User"
import { Effect } from "effect"

export class AccountsPolicy extends Effect.Service<AccountsPolicy>()(
    "Accounts/Policy",
    {
        // eslint-disable-next-line require-yield
        effect: Effect.gen(function*() {
            const canUpdate = (toUpdate: UserId) =>
                policy("User", "update", (actor) => Effect.succeed(actor.id === toUpdate))

            const canRead = (toRead: UserId) => policy("User", "read", (actor) => Effect.succeed(actor.id === toRead))

            const canReadSensitive = (toRead: UserId) =>
                policy("User", "readSensitive", (actor) => Effect.succeed(actor.id === toRead))

            return { canUpdate, canRead, canReadSensitive } as const
        })
    }
) {}
