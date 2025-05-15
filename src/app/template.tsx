import HeaderProvider from "./providers/HeaderProvider";

export default function template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderProvider>{children}</HeaderProvider>
    </>
  );
}
