import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import TwitterProvider from 'next-auth/providers/twitter';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession, NextAuthOptions } from 'next-auth';
import clientPromise from "@/lib/db";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      sessionToken?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string;
    sessionToken?: string;
  }
}

// Utility function to check if a user exists and get their provider
async function getUserAndProvider(email: string) {
  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection("users").findOne({ email });
  if (user) {
    const account = await db.collection("accounts").findOne({ userId: user._id });
    return { user, provider: account?.provider };
  }
  return { user: null, provider: null };
}

export const options: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile(profile) {

        // Check if the user already exists and the associated provider
        const { user, provider } = await getUserAndProvider(profile.email);

        // If user exists with another provider, throw an error
        if (user && provider && provider !== "google") {
          throw new Error(`This email is associated with ${provider}. Please sign in with ${provider}.`);
        }

        const sessionToken = uuidv4();

        if (!user) {
          const newUser = {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            role: 'client',
          };

          const client = await clientPromise;
          const db = client.db();
          const result = await db.collection('users').insertOne(newUser);

          return {
            id: result.insertedId.toString(),
            name: newUser.name,
            email: newUser.email,
            image: newUser.image,
            role: newUser.role,
            sessionToken,
          };
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role || 'client',
          sessionToken,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const { user, provider } = await getUserAndProvider(email);

        if (!user) {
          throw new Error("User not found");
        }

        if (provider && provider !== "credentials") {
          throw new Error(`This email is associated with ${provider}. Please sign in with ${provider}.`);
        }

        // Check email verification status
        if (user.emailVerified === null || user.emailVerified === false) {
          throw new Error("Please verify your email. A verification link was sent to your email upon registration.");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        const sessionToken = uuidv4();
        const sessionExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

        const client = await clientPromise;
        const db = client.db();
        await db.collection('sessions').insertOne({
          sessionToken,
          userId: user._id,
          expires: sessionExpiration,
        });

        return {
          id: user._id.toString(),
          name: user.fullName,
          email: user.email,
          role: user.role,
          sessionToken,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.sessionToken = user.sessionToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string | undefined;
        session.user.sessionToken = token.sessionToken as string | undefined;
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/login',
  },
  debug: process.env.NODE_ENV === 'development',

};
