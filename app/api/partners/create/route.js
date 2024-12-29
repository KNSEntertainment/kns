import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Partner from "@/models/Partner.Model";
import cloudinary from "cloudinary";
import { Readable } from "stream";

export const config = {
	api: {
		bodyParser: false,
	},
};

// Configure Cloudinary
cloudinary.v2.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file) {
	return new Promise(async (resolve, reject) => {
		try {
			// Await the arrayBuffer
			const buffer = Buffer.from(await file.arrayBuffer());
			const stream = cloudinary.v2.uploader.upload_stream(
				{
					resource_type: "image",
					folder: "partner_images",
				},
				(error, result) => {
					if (error) {
						reject(error);
					} else {
						resolve(result.secure_url);
					}
				}
			);
			Readable.from(buffer).pipe(stream);
		} catch (error) {
			reject(error);
		}
	});
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

		const partner_logo_url = await uploadToCloudinary(partner_logo);

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
