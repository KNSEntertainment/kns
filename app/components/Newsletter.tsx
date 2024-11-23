import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsletterProps {
	onSignup: (email: string) => void;
}

export default function Newsletter({ onSignup }: NewsletterProps) {
	const [email, setEmail] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSignup(email);
		setEmail("");
	};

	return (
		<section className="py-16 bg-primary">
			<div className="container mx-auto px-4">
				<motion.div className="max-w-2xl mx-auto text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
					<h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
					<p className="text-gray-200 mb-8">Subscribe to our newsletter for the latest updates on upcoming events and exclusive offers.</p>
					<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
						<Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-grow" required />
						<Button type="submit" variant="secondary">
							Subscribe
						</Button>
					</form>
				</motion.div>
			</div>
		</section>
	);
}
