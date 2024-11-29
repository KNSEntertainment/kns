import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function GalleryForm({ handleCloseGalleryModal }) {
	const [formData, setFormData] = useState({
		mediatype: "",
		media: "",
		category: "",
		alt: "",
	});
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		console.log("Selected file:", file);
		setFormData((prev) => ({ ...prev, media: file }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSubmitting(true);

		try {
			const form = new FormData();
			form.append("mediatype", formData.mediatype);
			form.append("media", formData.media);
			form.append("category", formData.category);
			form.append("alt", formData.alt);

			console.log("form", form);
			const response = await fetch("/api/media/create", {
				method: "POST",
				body: form,
			});

			const result = await response.json();
			console.log("result", result);
			if (!response.ok) {
				throw new Error(result.error || "Failed to create gallery item");
			}

			if (result.success) {
				toast.success("Gallery item created successfully!");
				setFormData({
					mediatype: "",
					media: "",
					category: "",
					alt: "",
				});
			}
		} catch (error) {
			setError(error.message);
			console.error("Error creating gallery item:", error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		// <form onSubmit={handleSubmit} className="space-y-4">
		// 	{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
		// 	<div>
		// 		<label htmlFor="eventname" className="block mb-2 font-bold">
		// 			Name of Event
		// 		</label>
		// 		<input type="text" id="eventname" value={formData.eventname} onChange={(e) => setFormData({ ...formData, eventname: e.target.value })} className="w-full p-2 border rounded" required />
		// 	</div>
		// 	<div>
		// 		<label htmlFor="eventcountry" className="block mb-2 font-bold">
		// 			Event Country
		// 		</label>
		// 		<input id="eventcountry" value={formData.eventcountry} onChange={(e) => setFormData({ ...formData, eventcountry: e.target.value })} className="w-full p-2 border rounded" required />
		// 	</div>
		// 	<div>
		// 		<label htmlFor="eventvenue" className="block mb-2 font-bold">
		// 			Event Venue
		// 		</label>
		// 		<input id="eventvenue" value={formData.eventvenue} onChange={(e) => setFormData({ ...formData, eventvenue: e.target.value })} className="w-full p-2 border rounded" />
		// 	</div>
		// 	<div>
		// 		<label htmlFor="eventdate" className="block mb-2 font-bold">
		// 			Event Date
		// 		</label>
		// 		<input type="date" id="eventdate" value={formData.eventdate} onChange={(e) => setFormData({ ...formData, eventdate: e.target.value })} className="w-full p-2 border rounded" />
		// 	</div>
		// 	<div>
		// 		<label htmlFor="eventtime" className="block mb-2 font-bold">
		// 			Event Time
		// 		</label>
		// 		<input type="text" id="eventtime" value={formData.eventtime} onChange={(e) => setFormData({ ...formData, eventtime: e.target.value })} className="w-full p-2 border rounded" />
		// 	</div>
		// 	<div>
		// 		<label htmlFor="eventposter" className="block mb-2 font-bold">
		// 			Event Poster
		// 		</label>
		// 		<input type="file" id="eventposter" onChange={(e) => setFormData({ ...formData, eventposter: e.target.files[0] })} className="w-full p-2 border rounded" required />
		// 	</div>
		// 	<div className="grid grid-cols-2 gap-2">
		// 		<button type="submit" disabled={submitting} className={`w-full p-1.5 rounded ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"} text-white font-bold`}>
		// 			{submitting ? "Creating Event..." : "Create Event"}
		// 		</button>
		// 		<Button variant="outline" onClick={handleCloseEventModal}>
		// 			Close
		// 		</Button>
		// 	</div>
		// </form>
		<form onSubmit={handleSubmit} className="mt-6 space-y-6">
			{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

			<div>
				<label htmlFor="type" className="block text-sm font-medium text-gray-700">
					Media Type
				</label>
				<select id="mediatype" name="mediatype" value={formData.mediatype} onChange={handleInputChange} className="my-1 block w-full pl-3 pr-10 py-4 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md">
					<option value="image">Image</option>
					<option value="video">Video</option>
				</select>
			</div>

			<div>
				<label htmlFor="file" className="block text-sm font-medium text-gray-700">
					File Upload
				</label>
				<input
					type="file"
					id="media"
					name="media"
					onChange={handleFileChange}
					className="mt-1 block w-full text-sm text-gray-500
			  file:mr-4 file:py-2 file:px-4
			  file:rounded-full file:border-0
			  file:text-sm file:font-semibold
			  file:bg-red-50 
			  hover:file:bg-indigo-100"
				/>
			</div>

			<div>
				<label htmlFor="category" className="block text-sm font-medium text-gray-700">
					Category
				</label>
				<input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., Wedding, Portrait, Landscape, Event" />
			</div>

			<div>
				<label htmlFor="alt" className="block text-sm font-medium text-gray-700">
					Alt Text (for images)
				</label>
				<input type="text" id="alt" name="alt" value={formData.alt} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Describe the image for accessibility" />
			</div>

			<div className="grid grid-cols-2 gap-2">
				<button type="submit" disabled={submitting} className={`w-full p-1.5 rounded ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"} text-white font-bold`}>
					{submitting ? "Saving Gallery Item..." : "Create Gallery Item"}
				</button>
				<Button variant="outline" onClick={handleCloseGalleryModal}>
					Close
				</Button>
			</div>
		</form>
	);
}
