//https://orm.drizzle.team/docs/get-started/postgresql-new

import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { usersTable } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "Ajit Kumar",
    salary: 4000,
    email: "ajit@example.com",
    password: "1234567",
    phone_number: "01097581360",
  };

  await db.insert(usersTable).values(user);
  console.log("New user created!");

  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  //   await db
  //     .update(usersTable)
  //     .set({
  //       salary: 3111,
  //     })
  //     .where(eq(usersTable.email, user.email));
  //   console.log("User info updated!");

  //   await db.delete(usersTable).where(eq(usersTable.email, user.email));
  //   console.log("User deleted!");
}

main();
