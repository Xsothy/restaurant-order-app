import { HttpApiEndpoint, HttpApiGroup, OpenApi } from "@effect/platform"
import { Category, CategoryAlreadyExists, CategoryIdFromString, CategoryNotFound } from "@template/domain/Category"
import { Schema } from "effect"
import { Authentication } from "../Accounts/Api.js"

export class CategoriesApiGroup extends HttpApiGroup.make("categories")
    .add(
        HttpApiEndpoint.get("getAllCategories", "/categories")
            .addSuccess(Schema.Array(Category.json))
    )
    .add(
        HttpApiEndpoint.get("getCategoryById", "/categories/:id")
            .addSuccess(Category.json)
            .addError(CategoryNotFound, { status: 404 })
            .setPath(Schema.Struct({ id: CategoryIdFromString }))
    )
    .add(
        HttpApiEndpoint.post("createCategory", "/categories")
            .addSuccess(Category.json)
            .addError(CategoryAlreadyExists, { status: 409 })
            .setPayload(Category.jsonCreate)
    )
    .add(
        HttpApiEndpoint.patch("updateCategory", "/categories/:id")
            .addSuccess(Category.json)
            .addError(CategoryNotFound, { status: 404 })
            .addError(CategoryAlreadyExists, { status: 409 })
            .setPath(Schema.Struct({ id: CategoryIdFromString }))
            .setPayload(Category.jsonUpdate)
    )
    .add(
        HttpApiEndpoint.del("removeCategory", "/categories/:id")
            .addSuccess(Schema.Void)
            .addError(CategoryNotFound, { status: 404 })
            .setPath(Schema.Struct({ id: CategoryIdFromString }))
    )
    .middlewareEndpoints(Authentication)
    .annotate(OpenApi.Title, "Categories")
    .annotate(OpenApi.Description, "Manage food categories")
{}
