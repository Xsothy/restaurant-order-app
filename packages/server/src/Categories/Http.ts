import { HttpApiBuilder } from "@effect/platform"
import { Effect, Layer, Option } from "effect"
import { Category, CategoryAlreadyExists } from "../../../domain/src/Category.js"
import { AuthenticationLive } from "../Accounts/Http.js"
import { Api } from "../Api.js"
import { CategoriesRepo } from "./Repo.js"

export const HttpCategoriesApiLive = HttpApiBuilder.group(
    Api,
    "categories",
    (handler) =>
        Effect.gen(function*() {
            const categoriesRepo = yield* CategoriesRepo
            return handler
                .handle("getAllCategories", () => categoriesRepo.getAll)
                .handle("createCategory", ({ payload: { name } }) =>
                    categoriesRepo
                        .where({
                            column: "name",
                            value: name
                        })
                        .pipe(
                            Effect.orDie,
                            Effect.andThen(
                                Option.match({
                                    onNone: () =>
                                        categoriesRepo
                                            .insert(Category.insert.make({
                                                name
                                            })),
                                    onSome: () => new CategoryAlreadyExists({ name })
                                })
                            )
                        ))
                .handle("getCategoryById", ({ path: { id } }) => categoriesRepo.findById(id))
                .handle(
                    "updateCategory",
                    ({ path: { id }, payload }) => categoriesRepo.updateCategory(id, payload.name)
                )
                .handle("removeCategory", ({ path: { id } }) => categoriesRepo.deleteById(id))
        })
).pipe(
    Layer.provide([CategoriesRepo.Default, AuthenticationLive])
)
