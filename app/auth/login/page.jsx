"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});
		if (result.error) {
			setError(result.error);
		} else {
			router.push("/dashboard");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">Admin Login</h1>
			{error && <p className="text-red-500">{error}</p>}
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email</label>
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 mt-1" />
				</div>
				<div className="mt-4">
					<label>Password</label>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 mt-1" />
				</div>
				<button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
					Login
				</button>
			</form>
		</div>
	);
}
