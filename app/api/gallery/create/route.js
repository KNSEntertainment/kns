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

	const uniqueFilename = `${Date.now()}-${file.name}`;
	const filePath = path.join(uploadsDir, uniqueFilename);
	const buffer = Buffer.from(await file.arrayBuffer());
	await fs.writeFile(filePath, buffer);

	return `/uploads/${uniqueFilename}`;
}

export async function POST(request) {
	try {
		await connectDB();

		const formData = await request.formData();
		console.log("Received form data:", Object.fromEntries(formData));

		const mediatype = formData.get("mediatype");
		const category = formData.get("category");
		const alt = formData.get("alt");
		const media = formData.get("media");

		console.log("Parsed form data:", { mediatype, category, alt, media: media ? media.name : null });

		// Validate input
		if (!mediatype || !category || !media || !(media instanceof Blob)) {
			return NextResponse.json({ success: false, error: "Required fields are missing or invalid" }, { status: 400 });
		}

		// Save file to the uploads directory
		const mediaUrl = await saveFile(media);

		// Create DB entry
		const galleryItem = await Gallery.create({
			mediatype,
			media: mediaUrl,
			category,
			alt: alt || "",
		});

		console.log("Gallery item created successfully:", galleryItem);

		return NextResponse.json({ success: true, gallery: galleryItem }, { status: 201 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
