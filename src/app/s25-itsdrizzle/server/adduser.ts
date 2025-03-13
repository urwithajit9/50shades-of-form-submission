import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";
import { FormData } from "./type";

const db = drizzle(process.env.DATABASE_URL!);

export async function insertUser(data: FormData) {
  //   const user: typeof usersTable.$inferInsert = {
  //     name: "Ajit Kumar from",
  //     salary: 4000,
  //     email: "raushan@example.com",
  //     password: "1234567",
  //     phone_number: "01097587777",
  //   };

  await db.insert(usersTable).values(data);
  console.log("New user created!");
}

// insertUser(data);
