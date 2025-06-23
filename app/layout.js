import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";

import Header from "@/app/_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default async function Layout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${josefin.className} antialiased  bg-primary-950 text-primary-50 min-h-screen flex flex-col`}
      >
        <Header />

        <main
          className="overflow-auto"
          style={{ height: "calc(100vh - 101px)" }}
        >
          <ReservationProvider>{children}</ReservationProvider>
        </main>
      </body>
    </html>
  );
}
