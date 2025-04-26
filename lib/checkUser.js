import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/configs/db";
import { users } from "@/configs/schema";
import { eq } from "drizzle-orm";

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userData = await db.query.users.findFirst({
    where: eq(users.clerkUserId, user.id),
  });

  if (userData) {
    return userData;
  }

  // If user doesn't exist in DB, create new user
  const newUser = await db.insert(users).values({
    id: user.id,
    clerkUserId: user.id,
    email: user.emailAddresses[0].emailAddress,
    name: user.firstName + " " + user.lastName,
    imageUrl: user.imageUrl,
    createdAt: new Date(),
    updatedAt: new Date()
  }).returning();

  return newUser[0];
};