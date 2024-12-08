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

export async function PUT(request, { params }) {
	try {
		await connectDB();

		const formData = await request.formData();
		const galleryId = params.id;

		const galleryData = {};
		for (const [key, value] of formData.entries()) {
			if (key !== "media") {
				galleryData[key] = value;
			}
		}

		const media = formData.get("media");
		if (media) {
			galleryData.media = await saveFile(media);
		}

		const updatedGallery = await Gallery.findByIdAndUpdate(galleryId, galleryData, { new: true });

		if (!updatedGallery) {
			return NextResponse.json({ success: false, error: "Gallery not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, gallery: updatedGallery }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

export async function DELETE(request, { params }) {
	try {
		await connectDB();

		const galleryId = params.id;

		const deletedGallery = await Gallery.findByIdAndDelete(galleryId);

		if (!deletedGallery) {
			return NextResponse.json({ success: false, error: "Gallery not found" }, { status: 404 });
		}

		if (deletedGallery.media) {
			const filePath = path.join(process.cwd(), "public", deletedGallery.media);
			await fs.unlink(filePath).catch(console.error);
		}

		return NextResponse.json({ success: true, message: "Gallery deleted successfully" }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

export async function GET(request, { params }) {
	try {
		await connectDB();

		const galleryId = params.id;
		const gallery = await Gallery.findById(galleryId);

		if (!gallery) {
			return NextResponse.json({ success: false, error: "Gallery not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, gallery }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
