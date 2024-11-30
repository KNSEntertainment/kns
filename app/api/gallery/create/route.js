import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallery.Model";
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

		const mediatype = formData.get("mediatype");
		const media = formData.get("media");
		const category = formData.get("category");
		const alt = formData.get("alt");

		// console.log("Parsed form data:", { eventname, eventdescription, eventcountry, eventdate, eventposter });

		// Validate input
		if (!mediatype || !media || !category) {
			return NextResponse.json({ success: false, error: "Required fields are missing" }, { status: 400 });
		}

		// Save the file to the uploads directory
		const mediaUrl = await saveFile(media);

		// Save event to MongoDB
		console.log("Creating gallery item in database");
		const gallery = await Gallery.create({
			mediatype,
			media: mediaUrl,
			category,
			alt,
		});
		console.log("Gallery item created successfully:", gallery);

		return NextResponse.json({ success: true, gallery }, { status: 201 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
