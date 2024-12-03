import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog.Model";
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
		console.log("Received form data: ", formData);

		const blogTitle = formData.get("blogTitle");
		const blogDesc = formData.get("blogDesc");
		const blogAuthor = formData.get("blogAuthor");
		const blogDate = formData.get("blogDate");
		console.log("Received blogDate:", blogDate); // Debug

		const blogMainPicture = formData.get("blogMainPicture");
		const blogSecondPicture = formData.get("blogSecondPicture");

		// Validate required fields
		if (!blogTitle || !blogDesc || !blogMainPicture || !blogDate) {
			return NextResponse.json({ success: false, error: "Required fields are missing" }, { status: 400 });
		}

		// Save the files to the uploads directory
		const blogMainPictureUrl = await saveFile(blogMainPicture);
		let blogSecondPictureUrl = null;
		if (blogSecondPicture) {
			blogSecondPictureUrl = await saveFile(blogSecondPicture);
		}

		// Save blog to MongoDB
		console.log("Creating blog in database");
		const blog = await Blog.create({
			blogTitle,
			blogDesc,
			blogAuthor,
			blogMainPicture: blogMainPictureUrl,
			blogSecondPicture: blogSecondPictureUrl,
			blogDate: blogDate,
		});
		console.log("Blog created successfully:", blog);

		return NextResponse.json({ success: true, blog }, { status: 201 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
