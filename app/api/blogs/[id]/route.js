import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog.Model";

export async function GET(request, { params }) {
	const id = params.id;

	try {
		await dbConnect();

		const blog = await Blog.findById(id);

		if (!blog) {
			return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, blog });
	} catch (error) {
		console.error("Error fetching Blog:", error);
		return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
	}
}
