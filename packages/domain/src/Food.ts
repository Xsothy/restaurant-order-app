import { Model } from "@effect/sql"
import { Schema } from "effect"
import { Category, CategoryId } from "./Category.js"

export const FoodId = Schema.Number.pipe(Schema.brand("FoodId"))
export type FoodId = typeof FoodId.Type

export const FoodIdFromString = Schema.NumberFromString.pipe(
    Schema.compose(FoodId)
)

export class Food extends Model.Class<Food>("Food")({
    id: Model.Generated(FoodId),
    categoryId: Model.GeneratedByApp(CategoryId),
    name: Schema.NonEmptyTrimmedString,
    description: Schema.NullOr(Schema.String),
    price: Schema.Number,
    createdAt: Model.DateTimeInsert,
    updatedAt: Model.DateTimeUpdate
}) {
}

export class FoodWithSensitive extends Model.Class<FoodWithSensitive>(
    "UserWithSensitive"
)({
    ...Model.fields(Food),
    category: Category
}) {}

export class FoodNotFound extends Schema.TaggedError<FoodNotFound>()(
    "FoodNotFound",
    { id: FoodId }
) {}

export class FoodAlreadyExists extends Schema.TaggedError<FoodAlreadyExists>()(
    "FoodAlreadyExists",
    { name: Schema.NonEmptyTrimmedString }
) {}
