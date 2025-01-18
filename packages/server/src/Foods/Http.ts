import { HttpApiBuilder } from "@effect/platform";
import { Api } from "../Api.js";
import { Effect, Layer, Option } from "effect";
import { FoodsRepo } from "./Repo.js";
import { AuthenticationLive } from "../Accounts/Http.js";
import { Food, FoodAlreadyExists } from "../../../domain/src/Food.js";
import { CategoriesRepo } from "../Categories/Repo.js";

export const HttpFoodsApiLive = HttpApiBuilder.group(
    Api,
    "foods",
    handler =>
        Effect.gen(function* () {
            const foodRepo = yield* FoodsRepo
            const categoriesRepo = yield* CategoriesRepo
            return handler
                .handle("getAllFoods", foodRepo.getAll)
                .handle("getFoodById", ({ path: { id } }) => foodRepo.findById(id))
                .handle("removeFood", ({ path: { id } }) => foodRepo.deleteById(id))
                .handle("updateFood", ({ path: { id }, payload }) => foodRepo.updateFood(id, payload))
                .handle("createFood", ({ payload: { name, price, description, categoryId } }) => foodRepo
                    .where({
                        column: "name",
                        value: name
                    })
                    .pipe(
                        Effect.orDie,
                        Effect.tap(categoriesRepo.findById(categoryId)),
                        Effect.andThen(
                            Option.match({
                                onNone: () => foodRepo
                                    .insert(Food.insert.make({
                                        name,
                                        categoryId: categoryId,
                                        price,
                                        description
                                    })
                                    ),
                                onSome: () => new FoodAlreadyExists({ name })
                            })
                        )
                    )
                )
        })
).pipe(
    Layer.provide([FoodsRepo.Default, AuthenticationLive, CategoriesRepo.Default])
)
