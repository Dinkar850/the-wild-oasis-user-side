import FormSubmitButton from "@/app/_components/FormSubmitButton";
import { updateBooking } from "@/app/_lib/actions";
import { getBooking } from "@/app/_lib/data-service";

export function generateMetadata({ params }) {
  const reservationId = params.editId;
  return { title: `Reservation ${reservationId}` };
}

export default async function Page({ params }) {
  // CHANGE
  const reservationId = params.editId;
  const {
    observations,
    numGuests,
    cabins: { maxCapacity },
  } = await getBooking(reservationId);
  console.log("numGuests", numGuests, observations);
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        action={updateBooking}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            defaultValue={numGuests}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={observations}
          />
        </div>
        <input name="bookingId" value={reservationId} type="hidden" />
        <input name="maxGuests" value={maxCapacity} type="hidden" />

        <div className="flex justify-end items-center gap-6">
          <FormSubmitButton
            text="Update reservation"
            isLoadingText="Updating..."
          />
        </div>
      </form>
    </div>
  );
}
