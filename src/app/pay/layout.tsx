import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: { absolute: "Make a Payment | KuWeX Studios" },
};

export default function PayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
