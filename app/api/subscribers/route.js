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

export async function POST(request) {
	try {
		await connectDB();

		const formData = await request.formData();
		console.log("Received form data");

		const subscriber = formData.get("subscriber");
		if (!subscriber) {
			return NextResponse.json({ success: false, error: "Please enter your email id for subscribing to us." }, { status: 400 });
		}

		console.log("Saving subscriber to database");
		const subscriberdata = await Subscriber.create({
			subscriber,
		});
		console.log("Subscriber saved successfully:", subscriberdata);

		return NextResponse.json({ success: true, subscriber }, { status: 201 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
