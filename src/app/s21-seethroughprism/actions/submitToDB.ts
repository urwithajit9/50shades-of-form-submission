"use server";

import prisma from "../lib/prisma";
import { FormData } from "../type";

// Server action to handle form submission
export async function createUser(data: FormData) {
  const name = data["name"] as string;
  const email = data["email"] as string;
  const password = data["password"] as string;
  const phone_number = data["phone_number"] as string | null;
  const salary = parseFloat(data["salary"] as string);

  const user = await prisma.registeruser.create({
    data: {
      name,
      email,
      password,
      phone_number,
      salary,
    },
  });

  return user;
}
