import { encrypt } from "@/utils/aes";
import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  apiKey: z.string().length(51),
});

async function matcher(id: string) {
  const userInDB = await prisma.user.findUnique({
    where: {
      clerkId: id,
    },
  });

  if (userInDB && userInDB.openAI && userInDB.clerkId === id) {
    return true;
  }
  return false;
}

async function apiKeySubmit(formData: FormData) {
  "use server";

  const parsed = schema.parse({
    apiKey: formData.get("apiKey"),
  });

  if (parsed.apiKey) {
    const encrypted = encrypt(parsed.apiKey);

    await createNewUser(encrypted);

    return encrypted;
  }
}

async function createNewUser(encrypted: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("No user");
  }
  const match = await matcher(user.id);

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
        openAI: encrypted,
      },
    });
  }
  redirect("/journal");
}

export default async function Newuser() {
  const user = await currentUser();

  if (!user) {
    throw new Error("No user");
  }

  const match = await matcher(user.id);

  if (match) {
    redirect("/journal");
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <form className='space-y-2 w-1/4 flex flex-col' action={apiKeySubmit}>
        <label
          htmlFor='apiKey'
          className='text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          {"Enter OpenAI API Key :"}
        </label>
        <input
          type='text'
          name='apiKey'
          className='flex h-10 w-full rounded-md border border-black/20 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
        />
        <button
          type='submit'
          className='inline-flex w-16 items-center justify-center mr-0 ml-auto rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-white disabled:pointer-events-none disabled:opacity-50 bg-black text-black-foreground hover:bg-gray-800/90 h-10 px-4 py-2'
        >
          Save
        </button>
      </form>
    </div>
  );
}
