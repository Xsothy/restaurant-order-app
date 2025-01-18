import { Model, SqlClient, SqlSchema } from "@effect/sql"
import { Category, CategoryAlreadyExists, CategoryId, CategoryNotFound } from "@template/domain/Category"
import { Effect, Option, Schema } from "effect"
import { SqlLive } from "../Sql.js"

export class CategoriesRepo extends Effect.Service<CategoriesRepo>()(
    "Categories/Repo",
    {
        effect: Effect.gen(function* () {
            const table = "categories"
            const sql = yield* SqlClient.SqlClient
            const repo = yield* Model.makeRepository(Category, {
                tableName: table,
                spanPrefix: "Repo",
                idColumn: "id"
            })

            const getAll = SqlSchema.findAll({
                Request: Schema.Void,
                Result: Category,
                execute: () => sql`SELECT * FROM ${sql(table)}`
            })().pipe(
                Effect.catchTags({
                    ParseError: (error) => Effect.die(error),
                    SqlError: (error) => Effect.die(error)
                })
            )

            const where = SqlSchema.findOne({
                Request: Schema.Struct({
                    column: Schema.keyof(Category.json),
                    value: Schema.String
                }),
                Result: Category,
                execute: ({ column, value }) => sql`SELECT * FROM ${sql(table)} WHERE ${sql(column)} = ${value}`
            })

            const findById = (id: CategoryId) => repo.findById(id).pipe(
                Effect.flatMap(
                    Option.match({
                        onNone: () => new CategoryNotFound({ id }),
                        onSome: Effect.succeed
                    })
                )
            )

            const deleteById = (id: CategoryId) => findById(id).pipe(
                Effect.andThen((category) => repo.delete(category.id))
            )

            const updateCategory = (id: CategoryId, name: string) => findById(id).pipe(
                Effect.andThen(category =>
                    SqlSchema.findOne({
                        Request: Schema.Void,
                        Result: Category,
                        execute: () => sql`SELECT * FROM ${sql(table)} where ${sql.and([
                            sql`name = ${name}`,
                            sql`id != ${category.id}`
                        ])}`
                    })().pipe(
                        Effect.andThen(
                            Option.match({
                                onNone: () => Effect.succeed(category),
                                onSome: () => new CategoryAlreadyExists({ name })
                            })
                        )
                    )
                ),
                Effect.andThen(() => repo.update(Category.update.make({ id, name }))),
                Effect.catchTags({
                    ParseError: (error) => Effect.die(error),
                    SqlError: (error) => Effect.die(error)
                })
            )


            return {
                ...repo,
                findById,
                where,
                deleteById,
                updateCategory,
                getAll
            } as const
        }),
        dependencies: [SqlLive]
    }
) {
}
