import { Model, SqlClient, SqlSchema } from "@effect/sql"
import type { FoodId } from "@template/domain/Food"
import { Food, FoodAlreadyExists, FoodNotFound, FoodWithSensitive } from "@template/domain/Food"
import { Effect, Option, Schema } from "effect"
import { SqlLive } from "../Sql.js"

import { CategoriesRepo } from "../Categories/Repo.js"
import type { SqlLive } from "../Sql.js"

export const make = Model.makeRepository(Food, {
    tableName: "food",
    spanPrefix: "Repo",
    idColumn: "id"
})

export class FoodsRepo extends Effect.Service<FoodsRepo>()(
    "Foods/Repo",
    {
        effect: Effect.gen(function*() {
            const sql = yield* SqlClient.SqlClient
            const table = "foods"
            const repo = yield* Model.makeRepository(Food, {
                tableName: table,
                spanPrefix: "Repo",
                idColumn: "id"
            })
            const categoriesRepo = yield* CategoriesRepo

            const getAll = () =>
                SqlSchema.findAll({
                    Request: Schema.Void,
                    Result: Food,
                    execute: () => sql`select * from foods`
                })().pipe(
                    Effect.catchTags({
                        ParseError: (error) => Effect.die(error),
                        SqlError: (error) => Effect.die(error)
                    })
                )

            const where = SqlSchema.findOne({
                Request: Schema.Struct({
                    column: Schema.keyof(Food.json),
                    value: Schema.String
                }),
                Result: Food,
                execute: ({ column, value }) => sql`SELECT * FROM ${sql(table)} WHERE ${sql(column)} = ${value}`
            })

            const findById = (id: FoodId) =>
                repo.findById(id).pipe(
                    Effect.flatMap(
                        Option.match({
                            onNone: () => new FoodNotFound({ id }),
                            onSome: Effect.succeed
                        })
                    ),
                    Effect.flatMap((food) =>
                        categoriesRepo.findById(food.categoryId).pipe(
                            Effect.map((category) =>
                                new FoodWithSensitive({
                                    ...food,
                                    category
                                })
                            ),
                            Effect.catchTag("CategoryNotFound", (error) => Effect.die(error))
                        )
                    )
                )

            const deleteById = (id: FoodId) =>
                findById(id).pipe(
                    Effect.andThen((category) => repo.delete(category.id))
                )

            const updateFood = (
                id: FoodId,
                { categoryId, description, name, price }: Schema.Schema.Type<typeof Food.jsonUpdate> & {
                    categoryId: CategoryId
                }
            ) => findById(id).pipe(
                Effect.tap(Effect.annotateCurrentSpan({
                    name: "updateFood",
                    attributes: { id, name, price, description }
                })),
                Effect.tap(categoriesRepo.findById(categoryId)),
                Effect.andThen((food) =>
                    SqlSchema.findOne({
                        Request: Schema.Void,
                        Result: Food,
                        execute: () =>
                            sql`SELECT * FROM ${sql(table)} where ${
                                sql.and([
                                    sql`name = ${name}`,
                                    sql`id != ${food.id}`
                                ])
                            }`
                    })().pipe(
                        Effect.andThen(
                            Option.match({
                                onNone: () => Effect.succeed(food),
                                onSome: () => new FoodAlreadyExists({ name })
                            })
                        )
                    )
                ),
                Effect.andThen(() =>
                    repo.update(Food.update.make({
                        id,
                        name,
                        price,
                        description,
                        categoryId
                    }))
                ),
                Effect.catchTags({
                    ParseError: (error) => Effect.die(error),
                    SqlError: (error) => Effect.die(error)
                })
            )

            return {
                ...repo,
                getAll,
                findById,
                deleteById,
                updateFood,
                where
            } as const
        }),

        dependencies: [SqlLive, CategoriesRepo.Default]
    }
) {
}
