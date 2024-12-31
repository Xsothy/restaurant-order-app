import { HttpApiBuilder, HttpApiSwagger, HttpMiddleware, HttpServer } from "@effect/platform"
import { NodeHttpServer, NodeRuntime } from "@effect/platform-node"
import { Layer } from "effect"
import { createServer } from "node:http"
import { HttpAccountsLive } from "./Accounts/Http.js"
import { Api } from "./Api.js"
import { HttpTodosApiLive } from "./Todo/Http.js"

const ApiLive = Layer.provide(HttpApiBuilder.api(Api), [
    HttpAccountsLive,
    HttpTodosApiLive
])
const HttpLive = HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
    Layer.provide(HttpApiSwagger.layer()),
    Layer.provide(ApiLive),
    HttpServer.withLogAddress,
    Layer.provide(NodeHttpServer.layer(createServer, { port: 3000 }))
)
Layer.launch(HttpLive).pipe(
    NodeRuntime.runMain
)
