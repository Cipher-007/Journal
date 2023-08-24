import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='h-screen w-screen relative'>
      <aside className='absolute top-0 left-0 h-full border-r border-black/10 w-[200px]'>
        Mood
      </aside>
      <div className='ml-[200px]'>
        <header className='h-[60px] border-b border-black/10'>
          <div className='h-full w-full px-6 flex items-center justify-end'>
            <UserButton />
          </div>
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
}
