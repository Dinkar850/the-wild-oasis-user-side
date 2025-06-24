"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new error("You must be logged in"); //checking for authorization before allowing server actions
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID"); //min length 6-12 alphanumeric

  const updateData = { nationality, countryFlag, nationalID };
  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
  redirect("/account/profile");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new error("You must be logged in");

  // Object.entries(formData.entries()); for huge objects

  //can add validation here using Zod
  //server side validation is important to not let user select already booked dates

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: +formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabibns/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function updateBooking(formData) {
  const session = await auth();
  if (!session) throw new error("You must be logged in");
  const bookingId = +formData.get("bookingId");

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to edit this booking");

  const numGuests = +formData.get("numGuests");
  const observations = formData.get("observations");
  const maxGuests = +formData.get("maxGuests");
  if (observations.length > 500)
    throw new Error("Exceeded character limit of 500");
  if (numGuests > maxGuests)
    throw new Error("Cannot exceed the capacity of the cabin");
  const updateData = { numGuests, observations };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new error("You must be logged in"); //always check on server side if the user is authenticated

  //only allowing this user to delete the bookings mapped to their own guestIds, (See network tab, this POSt url is shown and by running it with curl on terminal, a user can delete any booking id, so this is a layer of additional security)
  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("account/reservation");
}
