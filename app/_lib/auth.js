import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    }, //authorized returns true then user can go thru middleware otherwise not
    async signIn({ user, account, profile }) {
      //called before signing in
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name }); //create a new guest if existing guest is dne
        return true; //to sign in successfully
      } catch {
        console.error("error");
        return false; //dont sign in if error occurs
      }
    }, //after putting in credentials and before signing in
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    }, //providing id of guest from database to session.guestId
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig);
