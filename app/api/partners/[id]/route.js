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
			partnerData.partner_logo = await uploadToCloudinary(partner_logo);
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
