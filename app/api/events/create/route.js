import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/models/Event.Model";

export async function POST(request) {
	console.log("API route started");

	try {
		console.log("Connecting to MongoDB");
		await connectDB();
		console.log("Connected to MongoDB");

		const formData = await request.formData();
		console.log("Received form data: ", formData);

		const title = formData.get("title");
		const description = formData.get("description");
		const date = formData.get("date");
		const file = formData.get("file");

		console.log("Parsed form data:", { title, description, date, file });

		if (!title || !description || !date || !file) {
			return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
		}

		const formattedDate = new Date(date).toISOString().split("T")[0];

		// Here you would typically upload the file to a storage service like AWS S3 or Cloudinary
		// For this example, we'll just use a placeholder URL
		const fileUrl = "https://example.com/placeholder-file-url";

		console.log("Creating event in database");
		const event = await Event.create({
			title,
			description,
			date: formattedDate,
			fileUrl,
		});
		console.log("Event created successfully:", event);

		return NextResponse.json({ success: true, event }, { status: 201 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

// import connectDB from "@/lib/mongodb";
// import Event from "@/models/Event";
// import cloudinary from "@/lib/cloudinary";
// import multer from "multer";
// import { promises as fs } from "fs";
// import path from "path";

// // Configure multer for file upload
// const upload = multer({
// 	storage: multer.diskStorage({
// 		destination: (req, file, cb) => {
// 			// Use absolute path
// 			const uploadDir = path.join(process.cwd(), "uploads");
// 			// Ensure directory exists
// 			fs.mkdir(uploadDir, { recursive: true })
// 				.then(() => cb(null, uploadDir))
// 				.catch((err) => cb(err));
// 		},
// 		filename: (req, file, cb) => {
// 			const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
// 			cb(null, `${uniqueSuffix}-${file.originalname}`);
// 		},
// 	}),
// 	limits: {
// 		fileSize: 10 * 1024 * 1024, // 10MB limit
// 	},
// });

// // Helper function to handle file upload
// const runMiddleware = (req, res, fn) => {
// 	return new Promise((resolve, reject) => {
// 		fn(req, res, (result) => {
// 			if (result instanceof Error) {
// 				return reject(result);
// 			}
// 			return resolve(result);
// 		});
// 	});
// };

// export const config = {
// 	api: {
// 		bodyParser: false,
// 	},
// };

// export default async function handler(req, res) {
// 	if (req.method !== "POST") {
// 		return res.status(405).json({ message: "Method not allowed" });
// 	}

// 	try {
// 		// Connect to MongoDB
// 		await connectDB();

// 		// Handle file upload with error catching
// 		try {
// 			await runMiddleware(req, res, upload.single("file"));
// 		} catch (error) {
// 			if (error.code === "LIMIT_FILE_SIZE") {
// 				return res.status(413).json({
// 					success: false,
// 					error: "File size too large. Maximum size is 10MB",
// 				});
// 			}
// 			throw error;
// 		}

// 		if (!req.file) {
// 			return res.status(400).json({
// 				success: false,
// 				error: "No file uploaded",
// 			});
// 		}

// 		// Upload to Cloudinary
// 		try {
// 			const result = await cloudinary.uploader.upload(req.file.path, {
// 				folder: "events",
// 			});

// 			// Create event in MongoDB
// 			const eventData = {
// 				title: req.body.title,
// 				description: req.body.description,
// 				date: new Date(req.body.date),
// 				fileUrl: result.secure_url,
// 			};

// 			const event = await Event.create(eventData);

// 			// Clean up: Delete temporary file
// 			await fs.unlink(req.file.path);

// 			res.status(201).json({ success: true, event });
// 		} catch (error) {
// 			// Clean up temporary file if upload fails
// 			if (req.file) {
// 				await fs.unlink(req.file.path).catch(console.error);
// 			}
// 			throw error;
// 		}
// 	} catch (error) {
// 		console.error("Error creating event:", error);
// 		res.status(500).json({ success: false, error: error.message });
// 	}
// }
