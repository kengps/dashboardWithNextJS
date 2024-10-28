// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import adminUser from '@/models/adminModel';
import memberUser from '@/models/memberModel';
import { connectDatabases } from '@/utils/database/mongoose/connectDB';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDatabases();
                const { username, password } = credentials;

                let user =
                    await adminUser.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } }) ||
                    await memberUser.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });

                if (!user || !user.enabled) return null;

                const isPasswordMatch = await bcrypt.compare(password, user.password);
                if (!isPasswordMatch) return null;

                return {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                username: token.username,
                role: token.role,
            };
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/login',
    },
    debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
