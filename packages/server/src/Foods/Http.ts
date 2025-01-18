import { HttpApiBuilder } from "@effect/platform"
import { Effect, Layer, Option } from "effect"
import { Food, FoodAlreadyExists } from "../../../domain/src/Food.js"
import { AuthenticationLive } from "../Accounts/Http.js"
import { Api } from "../Api.js"
import { CategoriesRepo } from "../Categories/Repo.js"
import { FoodsRepo } from "./Repo.js"

export const HttpFoodsApiLive = HttpApiBuilder.group(
    Api,
    "foods",
    (handler) =>
        Effect.gen(function*() {
            const foodRepo = yield* FoodsRepo
            const categoriesRepo = yield* CategoriesRepo
            return handler
                .handle("getAllFoods", foodRepo.getAll)
                .handle("getFoodById", ({ path: { id } }) => foodRepo.findById(id))
                .handle("removeFood", ({ path: { id } }) => foodRepo.deleteById(id))
                .handle("updateFood", ({ path: { id }, payload }) => foodRepo.updateFood(id, payload))
                .handle("createFood", ({ payload: { categoryId, description, name, price } }) =>
                    foodRepo
                        .where({
                            column: "name",
                            value: name
                        })
                        .pipe(
                            Effect.orDie,
                            Effect.tap(categoriesRepo.findById(categoryId)),
                            Effect.andThen(
                                Option.match({
                                    onNone: () =>
                                        foodRepo
                                            .insert(Food.insert.make({
                                                name,
                                                categoryId,
                                                price,
                                                description
                                            })),
                                    onSome: () => new FoodAlreadyExists({ name })
                                })
                            )
                        ))
        })
).pipe(
    Layer.provide([FoodsRepo.Default, AuthenticationLive, CategoriesRepo.Default])
)
