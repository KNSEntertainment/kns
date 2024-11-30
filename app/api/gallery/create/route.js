import formidable from "formidable";
import path from "path";
import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallery.Model";

export const config = {
	api: {
		bodyParser: false, // Disable default body parsing
	},
};

async function parseForm(req) {
	return new Promise((resolve, reject) => {
		const form = new formidable.IncomingForm({
			uploadDir: path.join(process.cwd(), "public", "uploads"),
			keepExtensions: true,
		});

		form.parse(req, (err, fields, files) => {
			if (err) return reject(err);
			resolve({ fields, files });
		});
	});
}

export async function POST(request) {
	try {
		await connectDB();

		const { fields, files } = await parseForm(request);

		const { mediatype, category, alt } = fields;
		const file = files.media; // File object

		if (!mediatype || !file || !category) {
			return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
		}

		// Save file URL
		const fileUrl = `/uploads/${file.newFilename}`;

		// Save to database
		const gallery = await Gallery.create({
			mediatype,
			media: fileUrl,
			category,
			alt,
		});

		return NextResponse.json({ success: true, gallery }, { status: 201 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
