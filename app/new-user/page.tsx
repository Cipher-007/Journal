import { encrypt } from "@/utils/aes";
import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function matcher(id: string) {
  const match = await prisma.user.findUnique({
    where: {
      clerkId: id as string,
    },
  });
  return match ? true : false;
}

async function apiKeySubmit(formData: FormData) {
  "use server";
  const apiKey = formData.get("apiKey") as string;
  if (apiKey) {
    const encrypted = encrypt(apiKey);

    await createNewUser(encrypted);
    return encrypted;
  }
}

async function createNewUser(encrypted: string) {
  const user = await currentUser();
  const match = await matcher(user?.id as string);

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
  const match = await matcher(user?.id as string);
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
          className='flex h-10 w-full rounded-md border border-black/20 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
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
