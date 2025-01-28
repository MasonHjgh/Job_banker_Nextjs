import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Google],
  callbacks: {
    async jwt({ token, user }) {
     
      // Include the Prisma User ID in the JWT token
      if (user) {
        token.id = user.id; // `user.id` comes from the Prisma Adapter
      }
      return token;
    },
    async session({ session, token }) {
      // Attach user ID to the session object
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig

