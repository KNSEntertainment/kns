import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/models/Event.Model";
import { promises as fs } from "fs";
import path from "path";

export const config = {
	api: {
		bodyParser: false,
	},
};

async function saveFile(file) {
	const uploadsDir = path.join(process.cwd(), "uploads");
	await fs.mkdir(uploadsDir, { recursive: true });

	const filePath = path.join(uploadsDir, file.name);
	const buffer = Buffer.from(await file.arrayBuffer());
	await fs.writeFile(filePath, buffer);

	return `/uploads/${file.name}`;
}

export async function POST(request) {
	try {
		await connectDB();

		const formData = await request.formData();
		console.log("Received form data");

		const eventname = formData.get("eventname");
		const eventaddress = formData.get("eventaddress");
		const eventdate = formData.get("eventdate");
		const eventposter = formData.get("eventposter");

		console.log("Parsed form data:", { eventname, eventaddress, eventdate, eventposter });

		// Validate input
		if (!eventname || !eventaddress || !eventdate || !eventposter) {
			return NextResponse.json({ success: false, error: "All fields are required to create event" }, { status: 400 });
		}

		// Format the date
		const formattedDate = new Date(eventdate).toISOString().split("T")[0];

		// Save the file to the uploads directory
		const eventposterUrl = await saveFile(eventposter);

		// Save event to MongoDB
		console.log("Creating event in database");
		const event = await Event.create({
			eventname,
			eventaddress,
			eventdate: formattedDate,
			eventposterUrl,
		});
		console.log("Event created successfully:", event);

		return NextResponse.json({ success: true, event }, { status: 201 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
