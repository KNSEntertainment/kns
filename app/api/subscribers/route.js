import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber.Model";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			await connectDB();
			const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
			res.status(200).json({ subscribers });
		} catch (error) {
			res.status(500).json({ error: "Failed to fetch subscribers" });
		}
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
