

import DBconnect from "@/lib/db";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from 'next-auth/providers/github'
import User from '@/lib/models/user'
import { passwordCheck } from "@/components/utils";

export const options: AuthOptions = {
  providers: [
    CredentialsProvider<any>({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email'
        },
        password: {
          label: "Password",
          type: 'password',
          placeholder: 'Enter your password'
        }
      },
      authorize: async (credential: any) => {
        console.log('authorize-----1111');

        await DBconnect();
        const user = await User.findOne({
          email: credential?.email
        })
        console.log('authorize-----2222', user);
        if (!user) {
          console.log('authorize-----333');
          return null
        }
        console.log('authorize-----4444');
        const pwdOk = await passwordCheck(credential?.password, user.password);
        if (pwdOk) {
          return user;
        }
        return null;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  pages: {
    signIn: '/register'
  },
  theme: {
    colorScheme: 'dark',
    brandColor: '',
    logo: '',
    buttonText: '#e4393c'
  }
}