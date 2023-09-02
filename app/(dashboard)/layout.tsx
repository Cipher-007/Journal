import { decrypt } from "@/utils/aes";
import { prisma } from "@/utils/db";
import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/history", label: "History" },
];

async function keyfetch() {
  const user = await currentUser();

  const openAIKey = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
    select: {
      openAI: true,
    },
  });

  return openAIKey?.openAI;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const key = await keyfetch();
  if (key) {
    process.env.OPENAI_API_KEY = decrypt(key);
  } else {
    redirect("/new-user");
  }

  return (
    <div className='h-screen w-screen relative'>
      <aside className='absolute top-0 left-0 h-full border-r border-black/10 w-[200px]'>
        <div>
          <Image src='/logo.png' width={80} height={80} alt='Logo' />
        </div>
        <ul>
          {links.map((link) => (
            <li key={link.label} className='px-2 py-6 text-xl'>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className='ml-[200px] h-full'>
        <header className='h-[60px] border-b border-black/10'>
          <div className='h-full w-full px-6 flex items-center justify-end'>
            <UserButton />
          </div>
        </header>
        <div className='h-[calc(100vh-60px)]'>{children}</div>
      </div>
    </div>
  );
}
