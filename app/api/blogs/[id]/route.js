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

export async function PUT(request, { params }) {
	const { id } = await params;

	try {
		await connectDB();

		const formData = await request.formData();
		const blogId = id;

		const blogData = {};
		for (const [key, value] of formData.entries()) {
			if (key !== "blogMainPicture" || key !== "blogSecondPicture") {
				blogData[key] = value;
			}
		}
		const blogMainPicture = formData.get("blogMainPicture");
		if (blogMainPicture) {
			blogData.blogMainPicture = await saveFile(blogMainPicture);
		}
		const blogSecondPicture = formData.get("blogSecondPicture");
		if (blogSecondPicture) {
			blogData.blogSecondPicture = await saveFile(blogSecondPicture);
		}

		const updatedblog = await Blog.findByIdAndUpdate(blogId, blogData, { new: true });

		if (!updatedblog) {
			return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, blog: updatedblog }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

export async function DELETE(request, { params }) {
	const { id } = await params;

	try {
		await connectDB();

		const blogId = id;

		const deletedblog = await Blog.findByIdAndDelete(blogId);

		if (!deletedblog) {
			return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
		}

		if (deletedblog.blogMainPicture) {
			const filePath = path.join(process.cwd(), "public", deletedblog.blogMainPicture);
			await fs.unlink(filePath).catch(console.error);
		}
		if (deletedblog.blogSecondPicture) {
			const filePath = path.join(process.cwd(), "public", deletedblog.blogSecondPicture);
			await fs.unlink(filePath).catch(console.error);
		}

		return NextResponse.json({ success: true, message: "Blog deleted successfully" }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

export async function GET(request, { params }) {
	const { id } = await params;

	try {
		await connectDB();

		const blogId = id;
		const blog = await Blog.findById(blogId);

		if (!blog) {
			return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, blog }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
