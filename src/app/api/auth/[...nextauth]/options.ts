

import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
      authorize: (credential: any) => {
        const user = {
          id: '_id123456',
          email: 'knight_lujb@163.com',
          password: 'testing123'
        }
        if (
          credential?.email && credential?.email === user.email &&
          credential?.password && credential?.password === user.password) {
            return user;
        }
        return null;
      },
    })
  ],
  theme: {
    colorScheme: 'dark',
    brandColor: '',
    logo: '',
    buttonText: '#e4393c'
  }
}