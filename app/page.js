import Image from "next/image";
import Link from "next/link";

import bg from "@/public/bg.png";

export default function Page() {
  return (
    <main className="mt-16 sm:mt-24">
      <Image
        src={bg}
        fill
        alt="Mountains and forests with two cabins"
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
      />

      <div className="relative z-10 text-center animate-fadeUp px-4">
        <h1 className="text-4xl sm:text-6xl md:text-8xl text-primary-50 mb-6 sm:mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-6 py-4 sm:px-8 sm:py-6 text-primary-800 text-base sm:text-lg font-semibold hover:bg-accent-600 transition-all inline-block"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
