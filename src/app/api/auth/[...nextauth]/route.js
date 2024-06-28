import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const res = await fetch('http://45.64.99.242:8850/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });

          if (!res.ok) {
            const error = await res.json();
            console.error('Login failed:', error);
            throw new Error('Login failed: ' + error.message);
          }

          const user = await res.json();
          console.log(user);

          if (user && user.data.email) {
            return user;
          } else {
            throw new Error('No user data found');
          }
        } catch (error) {
          console.error('Error in authorize function:', error);
          throw new Error('Authorization error: ' + error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials") {
        token.email = user.data.email;
        token.name = user.data.name;
        token.role_id = user.data.role_id;
        token.token = user.token; // Save the token
        console.log('JWT callback:', token); // Add this line for debugging
      }
      return token;
    },
    async session({ session, token }) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("name" in token) {
        session.user.name = token.name;
      }
      if ("role_id" in token) {
        session.user.role_id = token.role_id;
      }
      if ("token" in token) {
        session.user.token = token.token;
      }
      console.log('Session callback:', session); // Add this line for debugging
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import { NextAuthOptions } from "next-auth";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";

// const authOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     CredentialsProvider({
//       type: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials;

//         try {
//           const res = await fetch('http://45.64.99.242:8850/api/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password })
//           });

//           if (!res.ok) {
//             const error = await res.json();
//             console.error('Login failed:', error);
//             throw new Error('Login failed');
//           }

//           const user = await res.json();
//           console.log(user);

//           if (user && user.data.email) {
//             return user;
//           } else {
//             return null;
//           }
//         } catch (error) {
//           console.error('Error in authorize function:', error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account, user }) {
//       if (account?.provider === "credentials") {
//         token.email = user.data.email;
//         token.name = user.data.name;
//         token.role = user.data.role;
//         token.token = user.token; // Save the token
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if ("email" in token) {
//         session.user.email = token.email;
//       }
//       if ("name" in token) {
//         session.user.name = token.name;
//       }
//       if ("role" in token) {
//         session.user.role = token.role;
//       }
//       if ("token" in token) {
//         session.user.token = token.token;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
