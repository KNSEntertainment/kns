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

export async function PUT(request, { params }) {
	const { id } = await params;

	try {
		await connectDB();

		const formData = await request.formData();
		const partnerId = id;

		const partnerData = {};
		for (const [key, value] of formData.entries()) {
			if (key !== "partner_logo") {
				partnerData[key] = value;
			}
		}

		const partner_logo = formData.get("partner_logo");
		if (partner_logo) {
			partnerData.partner_logo = await saveFile(partner_logo);
		}

		const updatedpartner = await Partner.findByIdAndUpdate(partnerId, partnerData, { new: true });

		if (!updatedpartner) {
			return NextResponse.json({ success: false, error: "partner not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, partner: updatedpartner }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

export async function DELETE(request, { params }) {
	const { id } = await params;

	try {
		await connectDB();

		const partnerId = id;

		const deletedpartner = await Partner.findByIdAndDelete(partnerId);

		if (!deletedpartner) {
			return NextResponse.json({ success: false, error: "partner not found" }, { status: 404 });
		}

		if (deletedpartner.partnerposterUrl) {
			const filePath = path.join(process.cwd(), "public", deletedpartner.partnerposterUrl);
			await fs.unlink(filePath).catch(console.error);
		}

		return NextResponse.json({ success: true, message: "partner deleted successfully" }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

export async function GET(request, { params }) {
	const { id } = await params;

	try {
		await connectDB();

		const partnerId = id;
		const partner = await Partner.findById(partnerId);

		if (!partner) {
			return NextResponse.json({ success: false, error: "partner not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, partner }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
