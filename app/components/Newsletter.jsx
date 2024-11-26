import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = async () => {
		e.preventDefault();
		setError("");

		try {
			const form = new FormData();
			form.append("subscriber", email);

			const response = await fetch("/api/subscriber", {
				method: "POST",
				body: form,
			});

			const result = await response.json();
			console.log("result", result);
			if (!response.ok) {
				throw new Error(result.error || "Failed to subscribe");
			}

			if (result.success) {
				setEmail("");
				setError("");
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<section className="py-16 bg-primary">
			<div className="container mx-auto px-4">
				<motion.div className="max-w-2xl mx-auto text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
					<h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
					<p className="text-gray-200 mb-8">Subscribe to our newsletter for the latest updates on upcoming events and exclusive offers.</p>
					<form onSubmit={handleSubmit} className=" max-w-md  mx-auto flex flex-col sm:flex-row gap-4">
						<Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-grow text-lg font-bold text-white" required />
						<Button type="submit" variant="secondary">
							Subscribe
						</Button>
						{error && <p className="text-red-500 text-sm">{error}</p>}
					</form>
				</motion.div>
			</div>
		</section>
	);
}
