import { SqlClient } from "@effect/sql"
import { Effect } from "effect"

export default Effect.gen(function*() {
    const sql = yield* SqlClient.SqlClient
    yield* sql.onDialectOrElse({
        pg: () => 
            sql`
                CREATE TABLE foods (
                    id SERIAL PRIMARY KEY,
                    categoryId INTEGER NOT NULL,
                    name TEXT NOT NULL UNIQUE,
                    description TEXT,
                    price DECIMAL NOT NULL,
                    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    FOREIGN KEY (categoryId) REFERENCES categories(id)
                )
            `,
        orElse: () =>
            sql`
                CREATE TABLE foods (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    categoryId INTEGER NOT NULL,
                    name TEXT NOT NULL UNIQUE,
                    description TEXT,
                    price DECIMAL NOT NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    FOREIGN KEY (categoryId) REFERENCES categories(id)
                )
            `
    })
})
