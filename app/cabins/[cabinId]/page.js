import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import Spinner from "@/app/_components/Spinner";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const DateSelector = dynamic(() => import("@/app/_components/DateSelector"), {
  ssr: false,
});

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  //{cabinId: '89'} and so on, as the folder name is cabinId

  return ids;
}

// PLACEHOLDER DATA
const cabin = {
  id: 89,
  name: "001",
  maxCapacity: 2,
  regularPrice: 250,
  discount: 0,
  description:
    "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
  image:
    "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
};

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-400 mb-10">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>
      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  );
}
