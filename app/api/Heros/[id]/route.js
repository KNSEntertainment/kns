import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Hero from "@/models/Hero.Model";
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
		const heroId = id;

		const heroData = {};
		for (const [key, value] of formData.entries()) {
			if (key !== "heroimage") {
				heroData[key] = value;
			}
		}

		const heroimage = formData.get("heroimage");
		if (heroimage) {
			heroData.heroimage = await saveFile(heroimage);
		}

		const updatedhero = await Hero.findByIdAndUpdate(heroId, heroData, { new: true });

		if (!updatedhero) {
			return NextResponse.json({ success: false, error: "Hero not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, Hero: updatedhero }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

export async function DELETE(request, { params }) {
	const { id } = await params;

	try {
		await connectDB();

		const heroId = id;

		const deletedhero = await Hero.findByIdAndDelete(heroId);

		if (!deletedhero) {
			return NextResponse.json({ success: false, error: "Hero not found" }, { status: 404 });
		}

		if (deletedhero.heroimage) {
			const filePath = path.join(process.cwd(), "public", deletedhero.heroimage);
			await fs.unlink(filePath).catch(console.error);
		}

		return NextResponse.json({ success: true, message: "Hero deleted successfully" }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

export async function GET(request, { params }) {
	const { id } = await params;

	try {
		await connectDB();

		const heroId = id;
		const Hero = await Hero.findById(heroId);

		if (!Hero) {
			return NextResponse.json({ success: false, error: "Hero not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, Hero }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}