"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

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

	const handleCancel = () => {
		router.push("/");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-700">
			<Card className="w-full max-w-sm">
				<CardHeader className="bg-red-700 text-white rounded-t-lg">
					<CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
				</CardHeader>
				<CardContent className="mt-6">
					<div className="mb-6 flex justify-center">
						<Image src="/knslogo.png" alt="Login" className="rounded-full" width={100} height={100} />
					</div>
					{error && <p className="text-red-500 mb-4">{error}</p>}
					<form onSubmit={handleSubmit}>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
									<Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
									<Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" />
									<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
										{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
									</button>
								</div>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline" onClick={handleCancel}>
						Cancel
					</Button>
					<Button className="bg-red-700 hover:bg-red-800" onClick={handleSubmit}>
						Login
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
