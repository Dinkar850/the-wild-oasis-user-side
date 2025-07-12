"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { Stardos_Stencil } from "next/font/google";
import { createBooking } from "../_lib/actions";
import FormSubmitButton from "./FormSubmitButton";
import { setUTCStartOrEndOfDay } from "../_utils/helper";

function ReservationForm({ cabin, user }) {
  // CHANGE
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const { range, resetRange } = useReservation();
  const startDate = range?.from ? setUTCStartOrEndOfDay(range?.from) : null;
  const endDate = range?.to ? setUTCStartOrEndOfDay(range?.to) : null;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);
  console.log("startDate: ", startDate);
  console.log("endDate: ", endDate);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData); //this = null, first arg is populated by bookingData, rest is the one coming from the form

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-4 sm:px-8 lg:px-16 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
        <p className="text-sm sm:text-base">Logged in as</p>

        <div className="flex gap-2 sm:gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-6 w-6 sm:h-8 sm:w-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p className="text-sm sm:text-base">{user.name}</p>
        </div>
      </div>

      <form
        className="bg-primary-900 py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-16 text-base sm:text-lg flex gap-4 sm:gap-5 flex-col"
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests" className="text-sm sm:text-base">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-3 sm:px-5 py-2 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base"
            required
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
          <label htmlFor="observations" className="text-sm sm:text-base">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-3 sm:px-5 py-2 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-4 sm:gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-sm sm:text-base min-h-[3.75rem]">
              Start by selecting dates
            </p>
          ) : (
            <FormSubmitButton isLoadingText="Reserving..." text="Reserve now" />
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
