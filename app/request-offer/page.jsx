"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Smile } from "lucide-react";
import Image from "next/image";

const ContactForm = () => {
	const initialFormData = {
		companyName: "",
		address: "",
		contactName: "",
		email: "",
		phone: "",
		offeredPrice: "",
		additionalInfo: "",
	};

	const [formData, setFormData] = React.useState(initialFormData);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [errors, setErrors] = React.useState({});
	const [message, setMessage] = React.useState("");

	const validateForm = () => {
		const newErrors = {};
		if (!formData.companyName.trim()) {
			newErrors.companyName = "Company name is required";
		}
		if (!formData.address.trim()) {
			newErrors.address = "Address are required";
		}
		if (!formData.contactName.trim()) {
			newErrors.contactName = "Contact person name is required";
		}
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}
		if (!formData.phone.trim()) {
			newErrors.phone = "Phone number is required";
		}
		if (!formData.offeredPrice.trim()) {
			newErrors.offeredPrice = "Offered price is required";
		}

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
						companyName: "",
						address: "",
						contactName: "",
						email: "",
						phone: "",
						offeredPrice: "",
						additionalInfo: "",
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

	const handleReset = () => {
		setFormData(initialFormData); // Reset form data
		setErrors({}); // Clear errors
	};

	return (
		<div className="container mx-4 sm:mx-auto pt-40 pb-20">
			<div className="flex flex-col md:flex-row">
				<Image src="/collaborate.avif" alt="dancing image" width={500} height={700} className="hidden md:block border-2 shadow-stone-400 shadow-sm border-gray-200 w-full h-[700px] object-cover" />
				<Card className=" bg-white w-full md:w-1/2 rounded-none">
					<CardContent className="p-6">
						<h3 className="text-xl font-semibold text-gray-800">Have questions or want to collaborate?</h3>
						<p className="text-gray-600 mb-6">Reach out to us and let&apos;s craft extraordinary events together!</p>
						{message ? (
							<div className="flex flex-col items-center justify-center p-6 space-y-4 border border-green-700 bg-green-50">
								<Smile className="h-12 w-12 text-green-700" />
								<p className="text-green-700 text-center">{message}</p>
								<Button onClick={() => setMessage("")}>Send another message</Button>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Company Name Input */}
								<div className="relative">
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Name of Company or Organization <span className="text-red-500">*</span>
									</label>
									<Input
										type="text"
										name="companyName"
										placeholder="Enter company or organization name"
										value={formData.companyName}
										onChange={handleChange}
										className={`w-full p-3 rounded-lg bg-gray-50 border transition-colors focus:bg-white
							  ${errors.companyName ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
									/>
									{errors.companyName && <p className="absolute -bottom-4 left-0 text-xs text-red-500">{errors.companyName}</p>}
								</div>

								{/* Contact Person Name Input */}
								<div className="relative">
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Contact Person Name <span className="text-red-500">*</span>
									</label>
									<Input
										type="text"
										name="contactName"
										placeholder="Enter contact person name"
										value={formData.contactName}
										onChange={handleChange}
										className={`w-full p-3 rounded-lg bg-gray-50 border transition-colors focus:bg-white
							  ${errors.contactName ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
									/>
									{errors.contactName && <p className="absolute -bottom-4 left-0 text-xs text-red-500">{errors.contactName}</p>}
								</div>

								<div className="flex justify-between gap-2">
									{/* Address Input */}
									<div className="relative w-2/3">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Address <span className="text-red-500">*</span>
										</label>
										<Input
											type="text"
											name="address"
											placeholder="Enter country and city"
											value={formData.address}
											onChange={handleChange}
											className={`w-full p-3 rounded-lg bg-gray-50 border transition-colors focus:bg-white
							  ${errors.address ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
										/>
										{errors.address && <p className="absolute -bottom-4 left-0 text-xs text-red-500">{errors.address}</p>}
									</div>
									{/* Phone Input */}
									<div className="relative">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											WhatsApp Number <span className="text-red-500">*</span>
										</label>
										<Input
											type="tel"
											name="phone"
											placeholder="Enter phone number"
											value={formData.phone}
											onChange={handleChange}
											className={`w-full p-3 rounded-lg bg-gray-50 border transition-colors focus:bg-white
							  ${errors.phone ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
										/>
										{/* <p className="text-xs text-gray-500 mt-1">We will try to reach via Whatsapp. Please make sure the number is correct.</p> */}
										{errors.phone && <p className="absolute -bottom-4 left-0 text-xs text-red-500">{errors.phone}</p>}
									</div>
								</div>

								<div className="flex justify-between gap-2">
									{/* Email Input */}
									<div className="relative w-2/3">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Contact Email <span className="text-red-500">*</span>
										</label>
										<Input
											type="email"
											name="email"
											placeholder="Enter contact email"
											value={formData.email}
											onChange={handleChange}
											className={`w-full p-3 rounded-lg bg-gray-50 border transition-colors focus:bg-white
							  ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
										/>
										{errors.email && <p className="absolute -bottom-4 left-0 text-xs text-red-500">{errors.email}</p>}
									</div>
									{/* Offered Price Input */}
									<div className="relative">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Your Offered Price <span className="text-red-500">*</span>
										</label>
										<Input
											type="text"
											name="offeredPrice"
											placeholder="Enter your offered price"
											value={formData.offeredPrice}
											onChange={handleChange}
											className={`w-full p-3 rounded-lg bg-gray-50 border transition-colors focus:bg-white
							  ${errors.offeredPrice ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
										/>
										{errors.offeredPrice && <p className="absolute -bottom-4 left-0 text-xs text-red-500">{errors.offeredPrice}</p>}
									</div>
								</div>

								{/* Additional Information Textarea */}
								<div className="relative">
									<label className="block text-sm font-medium text-gray-700 mb-1">Any Additional Information</label>
									<Textarea name="additionalInfo" placeholder="Enter any additional information" value={formData.additionalInfo} onChange={handleChange} className="w-full p-3 h-36 rounded-lg bg-gray-50 border transition-colors focus:bg-white resize-none border-gray-200 focus:border-blue-500" />
								</div>

								{/* Submit Button */}
								<div className="flex gap-4">
									<Button type="submit" disabled={isSubmitting} className="w-full bg-slate-700 hover:bg-black text-slate-200 py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
										{isSubmitting ? (
											<>
												<Loader2 className="h-5 w-5 animate-spin" />
												<span>Sending...</span>
											</>
										) : (
											<>
												<Send className="h-5 w-5" />
												<span>Submit</span>
											</>
										)}
									</Button>
									<Button variant="secondary" type="button" onClick={handleReset} className="hover:bg-slate-200">
										Reset
									</Button>{" "}
								</div>
							</form>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ContactForm;
