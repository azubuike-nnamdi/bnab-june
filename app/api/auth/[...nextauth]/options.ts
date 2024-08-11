
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GithubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession, NextAuthOptions } from 'next-auth';
import clientPromise from "@/lib/db";


declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

export const options: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_SECRET_ID,
    //   clientSecret: process.env.GITHUB_SECRET_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'database',
    maxAge: 1 * 24 * 60 * 60 // 1 days
  },
  callbacks: {
    async signIn({ user }) {
      const client = await clientPromise;
      const db = client.db();

      await db.collection("users").updateOne(
        { email: user.email },
        {
          $set: {
            lastActive: new Date(),
          },
        }
      );
      if (!user.role) {
        user.role = "client";
      }

      return true;
    }
  },
}