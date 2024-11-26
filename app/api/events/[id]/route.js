import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event.Model";

export async function GET(request, { params }) {
	const id = params.id;

	try {
		await dbConnect();

		const event = await Event.findById(id);

		if (!event) {
			return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, event });
	} catch (error) {
		console.error("Error fetching event:", error);
		return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
	}
}
