import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, ExternalLink, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ContactForm from "./ContactForm";

const ContactCard = () => {
	const [copiedField, setCopiedField] = React.useState(null);

	const handleCopy = (text, field) => {
		navigator.clipboard.writeText(text);
		setCopiedField(field);
		setTimeout(() => setCopiedField(null), 2000);
	};

	const contactInfo = {
		name: "Kiran Gurung",
		position: "Proprietor, KNS",
		email: "kirangrg1628@gmail.com",
		phone: "+47 45921405",
		address: "Oslo, Norway",
		facebook: "https://www.facebook.com/bhoot.grg",
		instagram: "https://instagram.com/example",
		youtube: "https://youtube.com/example",
		linkedin: "https://linkedin.com/in/example",
	};

	const socialLinks = [
		{
			name: "Facebook",
			icon: Facebook,
			url: contactInfo.facebook,
			color: "bg-blue-500 hover:bg-blue-600",
		},
		{
			name: "Instagram",
			icon: Instagram,
			url: contactInfo.instagram,
			color: "bg-pink-500 hover:bg-pink-600",
		},
		{
			name: "YouTube",
			icon: Youtube,
			url: contactInfo.youtube,
			color: "bg-red-500 hover:bg-red-600",
		},
		{
			name: "LinkedIn",
			icon: Linkedin,
			url: contactInfo.linkedin,
			color: "bg-blue-600 hover:bg-blue-700",
		},
	];

	return (
		<section id="contact" className="py-16 bg-gray-100">
			<div className="container sm:mx-auto rounded-xl">
				<h2 className="text-3xl font-bold text-center mb-12">Let&apos;s Get Connected</h2>

				<div className="grid lg:grid-cols-3 gap-6">
					{/* Main Contact Card */}
					<Card className="bg-white shadow-lg mx-4">
						<CardContent className="p-6">
							<div className="space-y-8">
								{/* Contact Person Section */}
								<div className="flex items-center space-x-4">
									<div className="h-16 w-16 rounded-full flex items-center justify-center">
										<Image src="/kiran.jpeg" alt="Kiran Gurung" width={100} height={100} className="w-full rounded-full" />
									</div>
									<div>
										<h2 className="text-xl font-bold text-gray-800">{contactInfo.name}</h2>
										<p className="text-gray-600">{contactInfo.position}</p>
									</div>
								</div>

								{/* Contact Information */}
								<div className="space-y-4">
									{/* Email */}
									<div className="group relative flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
										<Mail className="h-5 w-5 text-blue-500 mr-3" />
										<div className="flex-grow">
											<p className="text-sm text-gray-500">Email</p>
											<p className="text-gray-800">{contactInfo.email}</p>
										</div>
										<button onClick={() => handleCopy(contactInfo.email, "email")} className="p-2 hover:bg-white rounded-full transition-colors" aria-label="Copy email">
											{copiedField === "email" ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-gray-400" />}
										</button>
									</div>

									{/* Phone */}
									<div className="group relative flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
										<Phone className="h-5 w-5 text-green-500 mr-3" />
										<div className="flex-grow">
											<p className="text-sm text-gray-500">Phone</p>
											<p className="text-gray-800">{contactInfo.phone}</p>
										</div>
										<button onClick={() => handleCopy(contactInfo.phone, "phone")} className="p-2 hover:bg-white rounded-full transition-colors" aria-label="Copy phone">
											{copiedField === "phone" ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-gray-400" />}
										</button>
									</div>

									{/* Address */}
									<div className="group relative flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
										<MapPin className="h-5 w-5 text-red-500 mr-3" />
										<div className="flex-grow">
											<p className="text-sm text-gray-500">Address</p>
											<p className="text-gray-800">{contactInfo.address}</p>
										</div>
										<button onClick={() => handleCopy(contactInfo.address, "address")} className="p-2 hover:bg-white rounded-full transition-colors" aria-label="Copy address">
											{copiedField === "address" ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-gray-400" />}
										</button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Contact Form Card */}
					<ContactForm />
					{/* Social Links Card */}
					<Card className="bg-white shadow-lg mx-4">
						<CardContent className="p-6">
							{/* Business Hours */}
							<div className="">
								<h3 className="text-lg font-semibold text-gray-800 mb-3">Business Hours</h3>
								<div className="space-y-3">
									<div className="flex justify-between items-center p-2 bg-gray-50 rounded">
										<span className="text-gray-600">Monday - Friday</span>
										<span className="text-gray-800 font-medium">9:00 AM - 6:00 PM</span>
									</div>
									<div className="flex justify-between items-center p-2 bg-gray-50 rounded">
										<span className="text-gray-600">Saturday</span>
										<span className="text-gray-800 font-medium">10:00 AM - 4:00 PM</span>
									</div>
									<div className="flex justify-between items-center p-2 bg-gray-50 rounded">
										<span className="text-gray-600">Sunday</span>
										<span className="text-gray-800 font-medium">Closed</span>
									</div>
								</div>
							</div>
							<h3 className="text-lg font-semibold text-gray-800 my-6">Let&apos;s Be Social</h3>
							<div className="grid grid-cols-2 gap-4">
								{socialLinks.map(
									(social) =>
										social.url && (
											<Button key={social.name} onClick={() => window.open(social.url, "_blank")} className={`w-full ${social.color} text-white flex items-center justify-center space-x-2 transition-transform hover:scale-105`}>
												<social.icon className="h-5 w-5" />
												<span>{social.name}</span>
												<ExternalLink className="h-4 w-4" />
											</Button>
										)
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
};

export default ContactCard;
