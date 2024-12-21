import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/models/Event.Model";
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
	const { id } = params;

	try {
		await connectDB();

		const formData = await request.formData();
		const eventId = id;

		const eventData = {};
		for (const [key, value] of formData.entries()) {
			if (key !== "eventposter" && key !== "eventposter2" && key !== "eventposter3") {
				eventData[key] = value;
			}
		}

		const eventposter = formData.get("eventposter");
		if (eventposter && eventposter.size > 0) {
			eventData.eventposterUrl = await saveFile(eventposter);
		}

		const eventposter2 = formData.get("eventposter2");
		if (eventposter2 && eventposter2.size > 0) {
			eventData.eventposter2Url = await saveFile(eventposter2);
		}

		const eventposter3 = formData.get("eventposter3");
		if (eventposter3 && eventposter3.size > 0) {
			eventData.eventposter3Url = await saveFile(eventposter3);
		}

		const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, { new: true });

		if (!updatedEvent) {
			return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, event: updatedEvent }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

export async function DELETE(request, { params }) {
	const { id } = await params;

	try {
		await connectDB();

		const eventId = id;

		const deletedEvent = await Event.findByIdAndDelete(eventId);

		if (!deletedEvent) {
			return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
		}

		if (deletedEvent.eventposterUrl) {
			const filePath = path.join(process.cwd(), "public", deletedEvent.eventposterUrl);
			await fs.unlink(filePath).catch(console.error);
		}
		if (deletedEvent.eventposter2Url) {
			const filePath = path.join(process.cwd(), "public", deletedEvent.eventposter2Url);
			await fs.unlink(filePath).catch(console.error);
		}
		if (deletedEvent.eventposter3Url) {
			const filePath = path.join(process.cwd(), "public", deletedEvent.eventposter3Url);
			await fs.unlink(filePath).catch(console.error);
		}

		return NextResponse.json({ success: true, message: "Event deleted successfully" }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

export async function GET(request, { params }) {
	const { id } = await params;

	try {
		await connectDB();

		const eventId = id;
		const event = await Event.findById(eventId);

		if (!event) {
			return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, event }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
