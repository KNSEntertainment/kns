import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber.Model";

export const config = {
	api: {
		bodyParser: false,
	},
};

// Handle GET request
export async function GET() {
	try {
		await connectDB();
		const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
		return NextResponse.json({ subscribers });
	} catch (error) {
		console.error("Error fetching subscribers:", error);
		return NextResponse.json({ error: error.message || "Failed to fetch subscribers" }, { status: 500 });
	}
}

export async function POST(req) {
	try {
		await connectDB();

		const { subscriber } = req.body;
		console.log("Received subscriber data:", subscriber);

		if (!subscriber || typeof subscriber !== "string" || !subscriber.includes("@")) {
			return res.status(400).json({ success: false, error: "Please enter a valid email address for subscribing to us." });
		}

		// Check if the email already exists
		const existingSubscriber = await Subscriber.findOne({ subscriber });
		if (existingSubscriber) {
			return res.status(400).json({ success: false, error: "This email is already subscribed." });
		}

		console.log("Saving subscriber to database");
		const subscriberData = await Subscriber.create({ subscriber });
		console.log("Subscriber saved successfully:", subscriberData);

		return res.status(201).json({ success: true, subscriber: subscriberData });
	} catch (error) {
		console.error("Error in API route:", error);
		if (error.code === 11000) {
			return res.status(400).json({ success: false, error: "This email is already subscribed." });
		}
		return res.status(500).json({ success: false, error: "An error occurred while processing your request." });
	}
	// try {
	// 	await connectDB();

	// 	const formData = await request.formData();
	// 	console.log("Received form data");

	// 	const subscriber = formData.get("subscriber");
	// 	if (!subscriber) {
	// 		return NextResponse.json({ success: false, error: "Please enter your email id for subscribing to us." }, { status: 400 });
	// 	}

	// 	console.log("Saving subscriber to database");
	// 	const subscriberdata = await Subscriber.create({
	// 		subscriber,
	// 	});
	// 	console.log("Subscriber saved successfully:", subscriberdata);

	// 	return NextResponse.json({ success: true, subscriber }, { status: 201 });
	// } catch (error) {
	// 	console.error("Error in API route:", error);
	// 	return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	// }
}
