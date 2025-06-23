import { Suspense } from "react";
import SideNavigation from "../_components/SideNavigation";
import Spinner from "../_components/Spinner";

export default function Layout({ children }) {
  return (
    <div className="h-full grid grid-cols-[16rem_1fr]">
      <SideNavigation />
      <div className=" mx-auto w-full px-8 py-12 overflow-auto">
        <Suspense fallback={<Spinner />}>{children}</Suspense>
      </div>
    </div>
  );
}
