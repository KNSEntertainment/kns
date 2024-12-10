import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Smile } from "lucide-react";

const ContactForm = () => {
	const [formData, setFormData] = React.useState({
		email: "",
		subject: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [errors, setErrors] = React.useState({});
	const [message, setMessage] = React.useState("");

	const validateForm = () => {
		const newErrors = {};
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}
		if (!formData.subject.trim()) newErrors.subject = "Subject is required";
		if (!formData.message.trim()) newErrors.message = "Message is required";
		return newErrors;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = validateForm();

		if (Object.keys(newErrors).length === 0) {
			setIsSubmitting(true);
			try {
				const response = await fetch("https://api.web3forms.com/submit", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						access_key: "cf9615fd-9901-4e6b-a50e-241719bbcda6",
						...formData,
					}),
				});

				if (response.ok) {
					setMessage("Thanks for reaching out! We'll get back to you soon.");
					// Reset form
					setFormData({
						email: "",
						subject: "",
						message: "",
					});
				} else {
					console.error("Error submitting form:", await response.json());
				}
			} catch (error) {
				console.error("Error submitting form:", error);
			} finally {
				setIsSubmitting(false);
			}
		} else {
			setErrors(newErrors);
		}
	};

	return (
		<Card className="bg-white shadow-lg mx-4">
			<CardContent className="p-6">
				<h3 className="text-xl font-semibold text-gray-800 mb-2">Have Something to Say?</h3>
				{/* <p className="text-gray-600 mb-6">We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you as soon as possible.</p> */}
				{message ? (
					<div className="flex flex-col items-center justify-center p-6 space-y-4 border border-green-700 bg-green-50">
						<Smile className="h-12 w-12 text-green-700" />
						<p className="text-green-700 text-center">{message}</p>
						<Button onClick={() => setMessage("")}>Send another message</Button>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Email Input */}
						<div className="">
							<div className="relative">
								<Input
									type="email"
									name="email"
									placeholder="Your Email"
									value={formData.email}
									onChange={handleChange}
									className={`w-full p-3 rounded-lg bg-gray-50 border transition-colors focus:bg-white
                  ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
								/>
								{errors.email && <p className="absolute -bottom-5 left-0 text-xs text-red-500">{errors.email}</p>}
							</div>
						</div>

						{/* Subject Input */}
						<div className="">
							<div className="relative">
								<Input
									type="text"
									name="subject"
									placeholder="Subject"
									value={formData.subject}
									onChange={handleChange}
									className={`w-full p-3 rounded-lg bg-gray-50 border transition-colors focus:bg-white
                  ${errors.subject ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
								/>
								{errors.subject && <p className="absolute -bottom-5 left-0 text-xs text-red-500">{errors.subject}</p>}
							</div>
						</div>

						{/* Message Textarea */}
						<div className="">
							<div className="relative">
								<Textarea
									name="message"
									placeholder="Your Message"
									value={formData.message}
									onChange={handleChange}
									className={`w-full p-3 h-32 rounded-lg bg-gray-50 border transition-colors focus:bg-white resize-none
                  ${errors.message ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
								/>
								{errors.message && <p className="absolute -bottom-5 left-0 text-xs text-red-500">{errors.message}</p>}
							</div>
						</div>

						{/* Submit Button */}
						<Button type="submit" disabled={isSubmitting} className="w-full bg-slate-700 hover:bg-black text-slate-200 py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
							{isSubmitting ? (
								<>
									<Loader2 className="h-5 w-5 animate-spin" />
									<span>Sending...</span>
								</>
							) : (
								<>
									<Send className="h-5 w-5" />
									<span>Send Message</span>
								</>
							)}
						</Button>
					</form>
				)}
			</CardContent>
		</Card>
	);
};

export default ContactForm;
