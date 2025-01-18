import { HttpApiEndpoint, HttpApiGroup, OpenApi } from "@effect/platform"
import { Food, FoodAlreadyExists, FoodIdFromString, FoodNotFound, FoodWithSensitive } from "@template/domain/Food"
import { Schema } from "effect"
import { Authentication } from "../Accounts/Api.js"
import { CategoryIdFromString, CategoryNotFound } from "../../../domain/src/Category.js"

export class FoodsApiGroup extends HttpApiGroup.make("foods")
    .add(
        HttpApiEndpoint.get("getAllFoods", "/foods")
            .addSuccess(Schema.Array(Food.json))
    )
    .add(
        HttpApiEndpoint.get("getFoodById", "/foods/:id")
            .addSuccess(FoodWithSensitive.json)
            .addError(FoodNotFound, { status: 404 })
            .setPath(Schema.Struct({ id: FoodIdFromString }))
    )
    .add(
        HttpApiEndpoint.post("createFood", "/foods")
            .addSuccess(Food.json)
            .addError(FoodAlreadyExists, { status: 409 })
            .addError(CategoryNotFound, { status: 409 })
            .setPayload(
                Schema.extend(
                    Food.jsonUpdate,
                    Schema.Struct({ categoryId: CategoryIdFromString })
                )
            )
    )
    .add(
        HttpApiEndpoint.patch("updateFood", "/foods/:id")
            .addSuccess(Food.json)
            .addError(FoodNotFound, { status: 404 })
            .addError(FoodAlreadyExists, { status: 409 })
            .addError(CategoryNotFound, { status: 409 })
            .setPath(Schema.Struct({ id: FoodIdFromString }))
            .setPayload(
                Schema.extend(
                    Food.jsonUpdate,
                    Schema.Struct({ categoryId: CategoryIdFromString })
                )
            ))
    .add(
        HttpApiEndpoint.del("removeFood", "/foods/:id")
            .addSuccess(Schema.Void)
            .addError(FoodNotFound, { status: 404 })
            .setPath(Schema.Struct({ id: FoodIdFromString }))
    )
    .middlewareEndpoints(Authentication)
    .annotate(OpenApi.Title, "Foods")
    .annotate(OpenApi.Description, "Manage food categories")
{ }
