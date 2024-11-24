import { useState } from "react";

export default function EventForm() {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		date: "",
		file: null,
	});
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSubmitting(true);

		try {
			const form = new FormData();
			form.append("title", formData.title);
			form.append("description", formData.description);
			form.append("date", formData.date);
			if (formData.file) {
				form.append("file", formData.file);
			}

			const response = await fetch("/api/events/create", {
				method: "POST",
				body: form,
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "Failed to create event");
			}

			if (result.success) {
				alert("Event created successfully!");
				setFormData({
					title: "",
					description: "",
					date: "",
					file: null,
				});
				// Reset file input
				const fileInput = document.getElementById("file");
				if (fileInput) {
					fileInput.value = "";
				}
			}
		} catch (error) {
			setError(error.message);
			console.error("Error creating event:", error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="container mx-auto w-full md:w-1/2 p-6">
			<form onSubmit={handleSubmit} className="space-y-4">
				{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
				<div>
					<label htmlFor="title" className="block mb-2 font-bold">
						Title
					</label>
					<input type="text" id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border rounded" required />
				</div>
				<div>
					<label htmlFor="description" className="block mb-2 font-bold">
						Description
					</label>
					<textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded" required />
				</div>
				<div>
					<label htmlFor="date" className="block mb-2 font-bold">
						Date
					</label>
					<input type="date" id="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full p-2 border rounded" required />
				</div>
				<div>
					<label htmlFor="file" className="block mb-2 font-bold">
						File
					</label>
					<input type="file" id="file" onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })} className="w-full p-2 border rounded" required />
				</div>
				<button type="submit" disabled={submitting} className={`w-full p-2 rounded ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold`}>
					{submitting ? "Creating Event..." : "Create Event"}
				</button>
			</form>
		</div>
	);
}
