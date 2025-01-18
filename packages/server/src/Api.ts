import { HttpApi, OpenApi } from "@effect/platform"
import { AccountsApiGroup } from "./Accounts/Api.js"
import { CategoriesApiGroup } from "./Categories/Api.js"
import { FoodsApiGroup } from "./Foods/Api.js"
import { TodosApiGroup } from "./Todo/Api.js"

export class Api extends HttpApi.make("Api")
    .add(AccountsApiGroup)
    .add(TodosApiGroup)
    .add(FoodsApiGroup)
    .add(CategoriesApiGroup)
    .annotate(OpenApi.Title, "Groups API")
{}
