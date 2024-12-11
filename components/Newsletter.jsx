import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function Newsletter() {
	const [email, setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("/api/subscribers", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ subscriber: email }),
			});

			const result = await response.json();
			console.log("result", result);
			if (!response.ok) {
				throw new Error(result.error || "Failed to subscribe");
			}

			if (result.success) {
				setEmail("");
				toast.success("Thank you for subscribing!");
			}
		} catch (error) {
			toast.success("Sorry, try again!", error);
		}
	};

	return (
		<div>
			<motion.div className="lg:max-w-2xl max-w-sm md:mx-auto mt-6 md:mt-0 md:text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				<h2 className="text-3xl font-bold text-slate-200 mb-4">
					Stay <span className="text-red-500">Updated</span>
				</h2>
				<p className="text-gray-200 mb-8">Whether you&apos;re planning an event, looking for the perfect venue, or seeking entertainment that leaves you inspired, we&apos;re here to make it happen. Stay updated on our latest offerings and let us create memories together.</p>
				<form onSubmit={handleSubmit} className="max-w-md  md:mx-auto flex  gap-4">
					<Input
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							console.log(email);
						}}
						className="flex-grow text-lg font-bold text-slate-200"
						required
					/>
					<Button type="submit" variant="secondary">
						Subscribe
					</Button>
				</form>
			</motion.div>
		</div>
	);
}
