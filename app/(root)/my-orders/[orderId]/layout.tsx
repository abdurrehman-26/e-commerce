// app/(no-layout)/order-confirmation/layout.tsx
export default function OrderConfirmationLayout({
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
