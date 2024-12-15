import { NextResponse } from "next/server";

// Define the structure of the form data
interface FormData {
	companyName: string;
	address: string;
	contactName: string;
	email: string;
	phone: string;
	offeredPrice: string;
	additionalInfo?: string;
}

export async function POST(request: Request) {
	try {
		const formData: FormData = await request.json();

		// Validate the form data
		if (!formData.companyName || !formData.address || !formData.contactName || !formData.email || !formData.phone || !formData.offeredPrice) {
			return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
		}

		const response = await fetch("https://api.web3forms.com/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				access_key: process.env.WEBFORM_API,
				...formData,
			}),
		});

		const data = await response.json();

		if (response.ok) {
			return NextResponse.json({ success: true, message: "Form submitted successfully" });
		} else {
			return NextResponse.json({ success: false, message: data.message || "Form submission failed" }, { status: 400 });
		}
	} catch (error) {
		console.error("Error submitting form:", error);
		return NextResponse.json({ success: false, message: "An error occurred while submitting the form" }, { status: 500 });
	}
}
