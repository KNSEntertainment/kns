import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber.Model";

export const config = {
	api: {
		bodyParser: false,
	},
};

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
