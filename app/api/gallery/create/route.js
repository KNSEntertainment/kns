import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallery.Model";
import { promises as fs } from "fs";
import path from "path";

export const config = {
	api: {
		bodyParser: false, // Disable body parsing
	},
};

async function saveFile(file) {
	const uploadsDir = path.join(process.cwd(), "public", "uploads");
	await fs.mkdir(uploadsDir, { recursive: true });

	const filePath = path.join(uploadsDir, file.name);
	const buffer = Buffer.from(await file.arrayBuffer());
	await fs.writeFile(filePath, buffer);

	return `/uploads/${file.name}`; // Return file URL
}

export async function POST(request) {
	try {
		await connectDB();

		const formData = await request.formData();
		console.log("Received form data");

		const mediatype = formData.get("mediatype");
		const category = formData.get("category");
		const alt = formData.get("alt");
		const mediaFiles = formData.getAll("media"); // Get all files

		// Validate input
		if (!mediatype || !category || mediaFiles.length === 0) {
			return NextResponse.json({ success: false, error: "Required fields are missing" }, { status: 400 });
		}

		// Save each file to the uploads directory and create DB entries
		const galleryItems = [];
		for (const file of mediaFiles) {
			const mediaUrl = await saveFile(file); // Save each file
			const galleryItem = await Gallery.create({
				mediatype,
				media: mediaUrl,
				category,
				alt,
			});
			galleryItems.push(galleryItem);
		}

		console.log("Gallery items created successfully:", galleryItems);

		return NextResponse.json({ success: true, gallery: galleryItems }, { status: 201 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
