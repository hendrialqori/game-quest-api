import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core"

const USERS = "users";

export const users = mysqlTable(USERS, {
    id: int("id").autoincrement().primaryKey(),
    username: varchar("username", { length: 255 }).unique().notNull(),
    point: int("point").notNull(),
    createdAt: timestamp("created_at").defaultNow()
})

