import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("registeruserdrizzle", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  salary: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phone_number: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});
