// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);
//   return NextResponse.redirect(new URL("/about", request.url));
// } //name of the function shud be middleware only by convention

// export const config = {
//   matcher: ["/account", "/cabins"],
// };

import { auth } from "@/app/_lib/auth";
export const middleware = auth; //auth acts as a middleware function (auth is a function only)

export const config = {
  matcher: ["/account"],
};
