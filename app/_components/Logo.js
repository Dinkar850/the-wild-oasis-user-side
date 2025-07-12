import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-4 z-10">
      <Image
        src={logo}
        height="60"
        width="60"
        alt="The Wild Oasis logo"
        quality={100}
        className="w-12 h-12 sm:w-[60px] sm:h-[60px]"
      />
      <span className="text-lg sm:text-xl font-semibold text-primary-100">
        The Willow Paradise
      </span>
    </Link>
  );
}

export default Logo;
