import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial.Model";
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
	const { id } = await params;

	try {
		await connectDB();

		const formData = await request.formData();
		const testimonialId = id;

		const testimonialData = {};
		for (const [key, value] of formData.entries()) {
			if (key !== "audienceimage") {
				testimonialData[key] = value;
			}
		}

		const audienceimage = formData.get("audienceimage");
		if (audienceimage) {
			testimonialData.audienceimage = await saveFile(audienceimage);
		}

		const updatedTestimonial = await Testimonial.findByIdAndUpdate(testimonialId, testimonialData, { new: true });

		if (!updatedTestimonial) {
			return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, testimonial: updatedTestimonial }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

export async function DELETE(request, { params }) {
	const { id } = await params;

	try {
		await connectDB();

		const testimonialId = id;

		const deletedTestimonial = await Testimonial.findByIdAndDelete(testimonialId);

		if (!deletedTestimonial) {
			return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
		}

		if (deletedTestimonial.audienceimage) {
			const filePath = path.join(process.cwd(), "public", deletedTestimonial.audienceimage);
			await fs.unlink(filePath).catch(console.error);
		}

		return NextResponse.json({ success: true, message: "Testimonial deleted successfully" }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

export async function GET(request, { params }) {
	const { id } = await params;

	try {
		await connectDB();

		const testimonialId = id;
		const testimonial = await Testimonial.findById(testimonialId);

		if (!testimonial) {
			return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, testimonial }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
