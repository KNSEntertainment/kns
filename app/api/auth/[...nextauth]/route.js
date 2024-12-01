import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/User.Model";
import ConnectDB from "@/lib/mongodb";

export const authOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				console.log("Authorize called with credentials:", credentials);

				await ConnectDB();

				const user = await User.findOne({ email: credentials.email });
				if (!user) {
					console.log("No user found with this email");
					throw new Error("No user found with this email");
				}

				const isValid = await bcrypt.compare(credentials.password, user.password);
				if (!isValid) {
					console.log("Invalid password");
					throw new Error("Invalid credentials");
				}

				console.log("User authenticated successfully:", user);
				return {
					id: user._id.toString(),
					email: user.email,
					role: user.role,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			session.user = {
				id: token.id,
				email: token.email,
				role: token.role,
			};
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export const { GET, POST } = NextAuth(authOptions);
