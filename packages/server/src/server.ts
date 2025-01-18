import { DevTools } from "@effect/experimental"
import { HttpApiBuilder, HttpApiSwagger, HttpMiddleware, HttpServer } from "@effect/platform"
import { NodeHttpServer, NodeRuntime, NodeSocket } from "@effect/platform-node"
import { Effect, Layer } from "effect"
import { createServer } from "node:http"
import { HttpAccountsLive } from "./Accounts/Http.js"
import { Api } from "./Api.js"
import { HttpCategoriesApiLive } from "./Categories/Http.js"
import { HttpFoodsApiLive } from "./Foods/Http.js"
import { HttpTodosApiLive } from "./Todo/Http.js"

const ApiLive = Layer.provide(HttpApiBuilder.api(Api), [
    HttpAccountsLive,
    HttpTodosApiLive,
    HttpCategoriesApiLive,
    HttpFoodsApiLive
])
const HttpLive = HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
    Layer.provide(HttpApiSwagger.layer()),
    Layer.provide(ApiLive),
    HttpServer.withLogAddress,
    Layer.provide(NodeHttpServer.layer(createServer, { port: 3000, host: "127.0.0.1" }))
)
const DevToolsLive = DevTools.layerWebSocket().pipe(
    Layer.provide(NodeSocket.layerWebSocketConstructor)
)
Layer.launch(HttpLive).pipe(
    Effect.provide(DevToolsLive),
    NodeRuntime.runMain
)
