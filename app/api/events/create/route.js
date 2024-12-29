import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/models/Event.Model";
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
					folder: "event_images", // Customize folder name in your Cloudinary account
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

		const eventname = formData.get("eventname");
		const eventdescription = formData.get("eventdescription");
		const eventcountry = formData.get("eventcountry");
		const eventvenue = formData.get("eventvenue");
		const eventdate = formData.get("eventdate");
		const eventprice = formData.get("eventprice");
		const eventtime = formData.get("eventtime");
		const eventspotifyUrl = formData.get("eventspotifyUrl");
		const eventyoutubeUrl = formData.get("eventyoutubeUrl");
		const eventposter = formData.get("eventposter");
		const eventposter2 = formData.get("eventposter2");
		const eventposter3 = formData.get("eventposter3");

		// Validate input
		if (!eventname || !eventcountry || !eventposter) {
			return NextResponse.json({ success: false, error: "Required fields are missing" }, { status: 400 });
		}

		// Format the date
		const formattedDate = new Date(eventdate).toISOString().split("T")[0];

		// Upload images to Cloudinary
		const eventposterUrl = await uploadToCloudinary(eventposter);
		const eventposter2Url = eventposter2 ? await uploadToCloudinary(eventposter2) : null;
		const eventposter3Url = eventposter3 ? await uploadToCloudinary(eventposter3) : null;

		// Save event to MongoDB
		console.log("Creating event in database");
		const event = await Event.create({
			eventname,
			eventdescription,
			eventcountry,
			eventvenue,
			eventdate: formattedDate,
			eventprice,
			eventtime,
			eventspotifyUrl,
			eventyoutubeUrl,
			eventposterUrl,
			eventposter2Url,
			eventposter3Url,
		});
		console.log("Event created successfully:", event);

		return NextResponse.json({ success: true, event }, { status: 201 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

// import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
// import Event from "@/models/Event.Model";
// import { promises as fs } from "fs";
// import path from "path";

// export const config = {
// 	api: {
// 		bodyParser: false,
// 	},
// };

// async function saveFile(file) {
// 	const uploadsDir = path.join(process.cwd(), "public", "uploads");
// 	await fs.mkdir(uploadsDir, { recursive: true });

// 	const filePath = path.join(uploadsDir, file.name);
// 	const buffer = Buffer.from(await file.arrayBuffer());
// 	await fs.writeFile(filePath, buffer);

// 	return `/uploads/${file.name}`;
// }

// export async function POST(request) {
// 	try {
// 		await connectDB();

// 		const formData = await request.formData();
// 		console.log("Received form data");

// 		const eventname = formData.get("eventname");
// 		const eventdescription = formData.get("eventdescription");
// 		const eventcountry = formData.get("eventcountry");
// 		const eventvenue = formData.get("eventvenue");
// 		const eventdate = formData.get("eventdate");
// 		const eventprice = formData.get("eventprice");
// 		const eventtime = formData.get("eventtime");
// 		const eventspotifyUrl = formData.get("eventspotifyUrl");
// 		const eventyoutubeUrl = formData.get("eventyoutubeUrl");
// 		const eventposter = formData.get("eventposter");
// 		const eventposter2 = formData.get("eventposter2");
// 		const eventposter3 = formData.get("eventposter3");

// 		// console.log("Parsed form data:", { eventname, eventdescription, eventcountry, eventdate, eventposter });

// 		// Validate input
// 		if (!eventname || !eventcountry || !eventposter) {
// 			return NextResponse.json({ success: false, error: "Required fields are missing" }, { status: 400 });
// 		}

// 		// Format the date
// 		const formattedDate = new Date(eventdate).toISOString().split("T")[0];
// 		// const formattedTime = new Date(eventtime).toISOString().split("T")[1];

// 		// Save the file to the uploads directory
// 		const eventposterUrl = await saveFile(eventposter);
// 		const eventposter2Url = await saveFile(eventposter2);
// 		const eventposter3Url = await saveFile(eventposter3);

// 		// Save event to MongoDB
// 		console.log("Creating event in database");
// 		const event = await Event.create({
// 			eventname,
// 			eventdescription,
// 			eventcountry,
// 			eventvenue,
// 			eventdate: formattedDate,
// 			eventprice,
// 			eventtime,
// 			eventspotifyUrl,
// 			eventyoutubeUrl,
// 			eventposterUrl,
// 			eventposter2Url,
// 			eventposter3Url,
// 		});
// 		console.log("Event created successfully:", event);

// 		return NextResponse.json({ success: true, event }, { status: 201 });
// 	} catch (error) {
// 		console.error("Error in API route:", error);
// 		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// 	}
// }
