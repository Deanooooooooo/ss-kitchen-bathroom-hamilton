import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deanooooooooo.github.io/ss-kitchen-bathroom-hamilton"),
  title: "SS Kitchen and Bathroom | Hamilton Renovations",
  description:
    "Call SS Kitchen and Bathroom for kitchen, bathroom, laundry, TV unit, wall panel and lighting enquiries in Hamilton, Waikato.",
  robots: "index, follow",
  alternates: {
    canonical: "https://deanooooooooo.github.io/ss-kitchen-bathroom-hamilton/",
  },
  openGraph: {
    type: "website",
    title: "SS Kitchen and Bathroom | Hamilton Renovations",
    description:
      "Kitchen, bathroom, laundry, TV unit, wall panel and lighting enquiries for Hamilton and nearby Waikato homes.",
    url: "https://deanooooooooo.github.io/ss-kitchen-bathroom-hamilton/",
    images: ["/assets/kitchen-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SS Kitchen and Bathroom | Hamilton Renovations",
    description: "Call for kitchen, bathroom, laundry and cabinetry enquiries in Hamilton, Waikato.",
    images: ["/assets/kitchen-hero.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
