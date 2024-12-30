import { HttpApi, OpenApi } from "@effect/platform";
import { AccountsApi } from "./Accounts/Api.js";
import { TodosApi } from "./Todo/Api.js";
export class Api extends HttpApi.make("Api")
    .add(AccountsApi)
    .add(TodosApi)
    .annotate(OpenApi.Title, "Groups API") {
}
//# sourceMappingURL=Api.js.map