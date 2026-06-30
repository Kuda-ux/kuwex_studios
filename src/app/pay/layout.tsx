import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Make a Payment | KuWeX Studios",
};

export default function PayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
