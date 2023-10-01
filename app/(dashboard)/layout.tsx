import NavBar from "@/components/NavBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='h-screen w-screen'>
      <NavBar />
      {children}
    </div>
  );
}
