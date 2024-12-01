import bcrypt from "bcrypt";
import User from "@/models/User";
import { ConnectDB } from "@/lib/mongodb";

(async function seedAdmin() {
	await ConnectDB();

	const adminExists = await User.findOne({ email: "admin@example.com" });
	if (!adminExists) {
		const hashedPassword = await bcrypt.hash("adminpassword", 10);
		await User.create({
			email: "admin@example.com",
			password: hashedPassword,
			role: "admin",
		});
		console.log("Admin user created");
	} else {
		console.log("Admin user already exists");
	}

	process.exit();
})();
