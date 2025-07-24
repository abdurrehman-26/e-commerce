// app/(no-layout)/order-confirmation/layout.tsx
export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <section className="flex min-h-screen justify-center py-2 px-4">
    {children}
  </section>
  ); // no layout wrapper at all
}
