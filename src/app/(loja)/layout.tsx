import { Header } from "@/components/header";

export default function LojaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}