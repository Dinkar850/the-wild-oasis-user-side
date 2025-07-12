import Navigation from "@/app/_components/Navigation";
import MobileNavigation from "@/app/_components/MobileNavigation";
import Logo from "@/app/_components/Logo";
import { auth } from "@/app/_lib/auth";

async function Header() {
  const session = await auth();

  return (
    <header className=" px-4 sm:px-8 py-5 relative z-50">
      <div className="flex justify-between items-center mx-auto">
        <Logo />
        <Navigation />
        <MobileNavigation session={session} />
      </div>
    </header>
  );
}

export default Header;
