import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/models/Event.Model";

export async function POST(request) {
	console.log("API route started");

	try {
		console.log("Connecting to MongoDB");
		await connectDB();
		console.log("Connected to MongoDB");
		//Done
		const formData = await request.formData();
		console.log("Received form data: ", formData);

		const title = formData.get("title");
		const description = formData.get("description");
		const date = formData.get("date");
		const file = formData.get("file");

		console.log("Parsed form data:", { title, description, date, file });

		if (!title || !description || !date || !file) {
			return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
		}

		const formattedDate = new Date(date).toISOString().split("T")[0];

		const fileUrl = "https://example.com/placeholder-file-url";

		console.log("Creating event in database");
		const event = await Event.create({
			title,
			description,
			date: formattedDate,
			fileUrl,
		});
		console.log("Event created successfully:", event);

		return NextResponse.json({ success: true, event }, { status: 201 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
