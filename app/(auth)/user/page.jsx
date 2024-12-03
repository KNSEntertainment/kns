"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AuthForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		username: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleLogin = (e) => {
		e.preventDefault();
		console.log("Login attempted with:", { email: formData.email, password: formData.password });
	};

	const handleRegister = (e) => {
		e.preventDefault();
		console.log("Registration attempted with:", formData);
	};

	const handleCancel = () => {
		setFormData({
			name: "",
			email: "",
			username: "",
			password: "",
		});
		setError("");
		router.push("/");
	};

	const InputField = ({ id, icon: Icon, name, ...props }) => (
		<div className="relative">
			<Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
			<Input id={id} name={name} value={formData[name]} onChange={handleInputChange} {...props} className="pl-10" />
		</div>
	);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<Card className="w-full max-w-md">
				<CardHeader className="bg-red-700 text-white rounded-t-lg">
					<CardTitle className="text-2xl font-bold">Welcome</CardTitle>
				</CardHeader>
				<CardContent className="mt-6">
					<div className="mb-6 flex justify-center">
						<Image src="/knslogo.png" alt="Auth" className="w-24 h-auto rounded-full border-4 border-red-700" width={100} height={100} />
					</div>
					{error && <p className="text-red-500 mb-4">{error}</p>}
					<Tabs defaultValue="login">
						<TabsList className="grid w-full grid-cols-2 mb-4">
							<TabsTrigger value="login">Login</TabsTrigger>
							<TabsTrigger value="register">Register</TabsTrigger>
						</TabsList>
						<TabsContent value="login">
							<form onSubmit={handleLogin}>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="login-email">Email</Label>
										<InputField id="login-email" icon={Mail} name="email" type="email" placeholder="Enter your email" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="login-password">Password</Label>
										<div className="relative">
											<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
											<Input id="login-password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={formData.password} onChange={handleInputChange} className="pl-10 pr-10" />
											<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
												{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
											</button>
										</div>
									</div>
								</div>
								<div className="mt-6 flex justify-between">
									<Button type="button" variant="outline" onClick={handleCancel}>
										Cancel
									</Button>
									<Button type="submit" className="bg-red-700 hover:bg-red-800">
										Login
									</Button>
								</div>
							</form>
						</TabsContent>
						<TabsContent value="register">
							<form onSubmit={handleRegister}>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="register-name">Name</Label>
										<InputField id="register-name" icon={User} name="name" type="text" placeholder="Enter your name" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="register-email">Email</Label>
										<InputField id="register-email" icon={Mail} name="email" type="email" placeholder="Enter your email" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="register-username">Username</Label>
										<InputField id="register-username" icon={UserPlus} name="username" type="text" placeholder="Choose a username" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="register-password">Password</Label>
										<div className="relative">
											<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
											<Input id="register-password" name="password" type={showPassword ? "text" : "password"} placeholder="Choose a password" value={formData.password} onChange={handleInputChange} className="pl-10 pr-10" />
											<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
												{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
											</button>
										</div>
									</div>
								</div>
								<div className="mt-6 flex justify-between">
									<Button type="button" variant="outline" onClick={handleCancel}>
										Cancel
									</Button>
									<Button type="submit" className="bg-red-700 hover:bg-red-800">
										Register
									</Button>
								</div>
							</form>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
