import { auth } from "@clerk/nextjs";
import { prisma } from "./db";
import { currentUser } from "@clerk/nextjs/server";
import { decrypt } from "./aes";

export async function getUserByClerkId() {
  const { userId } = auth();

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
  });
  return user;
}

export async function keyfetch() {
  const user = await currentUser();

  const openAIKey = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
    select: {
      openAI: true,
    },
  });
  const key = decrypt(openAIKey?.openAI as string);
  return key;
}
