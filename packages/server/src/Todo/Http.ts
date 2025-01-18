import { HttpApiBuilder } from "@effect/platform"
import { Effect, Layer } from "effect"
import { Api } from "../Api.js"
import { TodosRepository } from "./TodosRepository.js"

export const HttpTodosApiLive = HttpApiBuilder.group(
    Api,
    "todos",
    (handlers) =>
        Effect.gen(function*() {
            const todos = yield* TodosRepository
            return handlers
                .handle("getAllTodos", () => todos.getAll)
                .handle("getTodoById", ({ path: { id } }) => todos.getById(id))
                .handle("createTodo", ({ payload: { text } }) => todos.create(text))
                .handle("completeTodo", ({ path: { id } }) => todos.complete(id))
                .handle("removeTodo", ({ path: { id } }) => todos.remove(id))
        })
).pipe(
    Layer.provide(TodosRepository.Default)
)
