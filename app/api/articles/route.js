import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article.Model";

export async function GET() {
	try {
		await connectDB();

		const articles = await Article.find();

		return NextResponse.json({ success: true, articles }, { status: 200 });
	} catch (error) {
		console.error("Error fetching articles:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
