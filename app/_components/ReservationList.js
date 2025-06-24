"use client";
import { useOptimistic } from "react";
import { deleteBooking } from "../_lib/actions";
import ReservationCard from "./ReservationCard";

function ReservationList({ bookings }) {
  //useOptimistic(curr_state, updateFunction)
  //const[returned default state when no async action is currentlyrunning, setter to invoke delete state]
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings, //cur_state default state
    (curBookings, bookingId) => {
      //second arg ie bookingId is usually same as one passed in function as delReservation
      //what shud be rendered just after performing opreration
      return curBookings.filter((booking) => booking.id != bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
