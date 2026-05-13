import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const API_BASE = process.env.NEXT_PUBLIC_API_PATH || "http://localhost:8080/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 7 días en segundos
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const response = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            return null;
          }

          const data = await response.json();

          return {
            id: data.user._id,
            email: data.user.email,
            name: `${data.user.firstName} ${data.user.lastName}`,
            token: data.token,
            role: data.user.role,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
        token.accessToken = (user as any).token;
        return token;
      }

      // Refresh backend token before it expires
      if (token.accessToken) {
        try {
          const payloadB64 = (token.accessToken as string).split('.')[1];
          const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());
          const expiresInMs = payload.exp * 1000 - Date.now();

          if (expiresInMs < 5 * 60 * 1000) {
            const res = await fetch(`${API_BASE}/auth/renew`, {
              headers: { 'x-token': token.accessToken as string },
            });
            if (res.ok) {
              const data = await res.json();
              if (data.token) token.accessToken = data.token;
            }
          }
        } catch {
          // Keep existing token if refresh fails
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // token.id = MongoDB _id; token.sub = NextAuth fallback UUID
        session.user.id = (token.id || token.sub) as string;
        (session.user as any).role = token.role as string;
        (session.user as any).firstName = token.firstName;
        (session.user as any).lastName = token.lastName;
      }
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
