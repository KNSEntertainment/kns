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
	const uploadsDir = path.join(process.cwd(), "public", "uploads");
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
		const eventdescription = formData.get("eventdescription");
		const eventcountry = formData.get("eventcountry");
		const eventvenue = formData.get("eventvenue");
		const eventdate = formData.get("eventdate");
		const eventprice = formData.get("eventprice");
		const eventtime = formData.get("eventtime");
		const eventspotifyUrl = formData.get("eventspotifyUrl");
		const eventyoutubeUrl = formData.get("eventyoutubeUrl");
		const eventposter = formData.get("eventposter");

		// console.log("Parsed form data:", { eventname, eventdescription, eventcountry, eventdate, eventposter });

		// Validate input
		if (!eventname || !eventcountry || !eventposter) {
			return NextResponse.json({ success: false, error: "Required fields are missing" }, { status: 400 });
		}

		// Format the date
		const formattedDate = new Date(eventdate).toISOString().split("T")[0];
		// const formattedTime = new Date(eventtime).toISOString().split("T")[1];

		// Save the file to the uploads directory
		const eventposterUrl = await saveFile(eventposter);

		// Save event to MongoDB
		console.log("Creating event in database");
		const event = await Event.create({
			eventname,
			eventdescription,
			eventcountry,
			eventvenue,
			eventdate: formattedDate,
			eventprice,
			eventtime,
			eventspotifyUrl,
			eventyoutubeUrl,
			eventposterUrl,
		});
		console.log("Event created successfully:", event);

		return NextResponse.json({ success: true, event }, { status: 201 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
