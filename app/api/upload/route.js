import formidable from "formidable";
import fs from "fs/promises";
import path from "path";

// Disable the default body parser
export const config = {
	api: {
		bodyParser: false,
	},
};

async function saveFile(file) {
	const uploadsDir = path.join(process.cwd(), "public", "uploads");
	await fs.mkdir(uploadsDir, { recursive: true });

	const filePath = path.join(uploadsDir, file.originalFilename);
	await fs.rename(file.filepath, filePath);

	return `/uploads/${file.originalFilename}`;
}

export async function POST(req, res) {
	const form = new formidable.IncomingForm();

	// Parse the incoming request
	form.parse(req, async (err, fields, files) => {
		if (err) {
			console.error("File parsing error:", err);
			return res.status(500).json({ error: "File parsing failed" });
		}

		try {
			// Save the uploaded file using `saveFile`
			const fileUrl = await saveFile(files.file);
			return res.status(200).json({ url: fileUrl });
		} catch (error) {
			console.error("Error saving file:", error);
			return res.status(500).json({ error: "Error saving file" });
		}
	});
}
