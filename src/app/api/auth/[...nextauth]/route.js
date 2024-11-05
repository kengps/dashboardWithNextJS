// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import adminUser from '@/models/adminModel';
import memberUser from '@/models/memberModel';
import { connectDatabases } from '@/utils/database/mongoose/connectDB';
import profiles from '@/models/profiles';
import roles from '@/models/role';


export const authOptions = {
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

                //const user = await profiles.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } })
             
                const user = await profiles.findOne({ username: username }).populate({ path: 'role', select: { _id: 0, name: 1 } })
                console.log(`⩇⩇:⩇⩇🚨  file: route.js:27  user :`, user);

              

                // await adminUser.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } }) ||

                // await memberUser.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });

                //if (!user || !user.enabled) return null;
                if (!user || !user.isActive) {
                    throw new Error("User not found or not enabled");
                }

                const isPasswordMatch = await bcrypt.compare(password, user.password);

                if (!isPasswordMatch) {
                    throw new Error("Incorrect Password");
                };
                const profile = {
                    id: user._id,
                    username: user.username,
                    role: user.name,
                }
                // console.log(`⩇⩇:⩇⩇🚨  file: route.js:44  profile :`, profile);


                return {
                    id: user._id,
                    username: user.username,
                    role: user.role.name,
                    permissions: user.permissions
                };
            }
        })


    ],
    session: {
        strategy: "jwt",
        maxAge: 3 * 60 * 60, // 3 hours in seconds
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
                token.permissions = user.permissions;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                username: token.username,
                role: token.role,
                permissions: token.permissions,
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
