import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Partner from "@/models/Partner.Model";
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
		console.log("Received form data");

		const partner_name = formData.get("partner_name");
		const partner_url = formData.get("partner_url");
		const partner_logo = formData.get("partner_logo");
		const logo_alt_text = formData.get("logo_alt_text");

		// console.log("Parsed form data:", { eventname, eventdescription, eventcountry, eventdate, eventposter });

		// Validate input
		if (!partner_name || !partner_url || !partner_logo || !logo_alt_text) {
			return NextResponse.json({ success: false, error: "Required fields are missing" }, { status: 400 });
		}

		const partner_logo_url = await saveFile(partner_logo);

		// Save event to MongoDB
		console.log("Creating partner in database");
		const partner = await Partner.create({
			partner_name,
			partner_url,
			partner_logo: partner_logo_url,
			logo_alt_text,
		});
		console.log("Partner created successfully:", partner);

		return NextResponse.json({ success: true, partner }, { status: 201 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
