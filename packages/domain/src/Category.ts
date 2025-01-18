import { Model } from "@effect/sql"
import { Schema } from "effect"

export const CategoryId = Schema.Number.pipe(Schema.brand("CategoryId"))
export type CategoryId = typeof CategoryId.Type

export const CategoryIdFromString = Schema.NumberFromString.pipe(
    Schema.compose(CategoryId)
)

export class Category extends Model.Class<Category>("Category")({
    id: Model.Generated(CategoryId),
    name: Schema.NonEmptyTrimmedString,
    createdAt: Model.DateTimeInsert,
    updatedAt: Model.DateTimeUpdate
}) {
}

export class CategoryNotFound extends Schema.TaggedError<CategoryNotFound>()(
    "CategoryNotFound",
    { id: CategoryId }
) {}

export class CategoryAlreadyExists extends Schema.TaggedError<CategoryAlreadyExists>()(
    "CategoryAlreadyExists",
    { name: Schema.NonEmptyTrimmedString }
) {}
