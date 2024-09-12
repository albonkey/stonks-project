export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex flex-col gap-12 m-auto mt-32 h-screen items-center">
      {children}
    </div>
  );
}
