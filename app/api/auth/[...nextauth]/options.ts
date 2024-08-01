
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GithubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from 'next-auth';
import clientPromise from "@/lib/db";

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

}