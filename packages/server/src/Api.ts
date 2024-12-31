import { HttpApi, OpenApi } from "@effect/platform"
import { AccountsApi } from "./Accounts/Api.js"
import { TodosApiGroup } from "./Todo/Api.js"

export class Api extends HttpApi.make("Api")
    .add(AccountsApi)
    .add(TodosApiGroup)
    .annotate(OpenApi.Title, "Groups API")
{}
