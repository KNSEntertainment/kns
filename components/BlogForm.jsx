import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

export default function BlogForm({ handleCloseBlogModal }) {
	const [formData, setFormData] = useState({
		blogTitle: "",
		blogDesc: "",
		blogAuthor: "",
		blogMainPicture: null,
		blogSecondPicture: null,
		blogDate: "",
	});
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSubmitting(true);

		try {
			const form = new FormData();
			form.append("blogTitle", formData.blogTitle);
			form.append("blogDesc", formData.blogDesc);
			form.append("blogAuthor", formData.blogAuthor);
			if (formData.blogMainPicture) {
				form.append("blogMainPicture", formData.blogMainPicture);
			}
			if (formData.blogSecondPicture) {
				form.append("blogSecondPicture", formData.blogSecondPicture);
			}
			form.append("blogDate", formData.blogDate);

			console.log("form", form);
			const response = await fetch("/api/blogs/create", {
				method: "POST",
				body: form,
			});

			const result = await response.json();
			console.log("result", result);
			if (!response.ok) {
				throw new Error(result.error || "Failed to create blog");
			}

			if (result.success) {
				setFormData({
					blogTitle: "",
					blogDesc: "",
					blogAuthor: "",
					blogMainPicture: null,
					blogSecondPicture: null,
					blogDate: "",
				});
				// Reset file inputs
				const mainPictureInput = document.getElementById("blogMainPicture");
				const secondPictureInput = document.getElementById("blogSecondPicture");
				if (mainPictureInput) mainPictureInput.value = "";
				if (secondPictureInput) secondPictureInput.value = "";
				toast.success("Blogs created successfully!");
			}
		} catch (error) {
			setError(error.message);
			console.error("Error creating blog:", error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
			<div>
				<label htmlFor="blogTitle" className="block mb-2 font-bold">
					Blog Title
				</label>
				<input type="text" id="blogTitle" value={formData.blogTitle} onChange={(e) => setFormData({ ...formData, blogTitle: e.target.value })} className="w-full p-2 border rounded" required />
			</div>
			<div>
				<label htmlFor="blogDesc" className="block mb-2 font-bold">
					Blog Description
				</label>
				<textarea id="blogDesc" value={formData.blogDesc} onChange={(e) => setFormData({ ...formData, blogDesc: e.target.value })} className="w-full p-2 border rounded" required />
			</div>
			<div>
				<label htmlFor="blogAuthor" className="block mb-2 font-bold">
					Blog Author
				</label>
				<input type="text" id="blogAuthor" value={formData.blogAuthor} onChange={(e) => setFormData({ ...formData, blogAuthor: e.target.value })} className="w-full p-2 border rounded" />
			</div>
			<div>
				<label htmlFor="blogMainPicture" className="block mb-2 font-bold">
					Blog Main Picture
				</label>
				<input type="file" id="blogMainPicture" onChange={(e) => setFormData({ ...formData, blogMainPicture: e.target.files[0] })} className="w-full p-2 border rounded" required />
			</div>
			<div>
				<label htmlFor="blogSecondPicture" className="block mb-2 font-bold">
					Blog Second Picture
				</label>
				<input type="file" id="blogSecondPicture" onChange={(e) => setFormData({ ...formData, blogSecondPicture: e.target.files[0] })} className="w-full p-2 border rounded" />
			</div>
			<div>
				<label htmlFor="blogDate" className="block mb-2 font-bold">
					Blog Date
				</label>
				<input
					type="date"
					id="blogDate"
					value={formData.blogDate}
					onChange={(e) => {
						console.log("Selected date:", e.target.value); // Debug
						setFormData({ ...formData, blogDate: e.target.value });
					}}
					className="w-full p-2 border rounded"
				/>
			</div>
			<div className="grid grid-cols-2 gap-2">
				<button type="submit" disabled={submitting} className={`w-full p-1.5 rounded ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold`}>
					{submitting ? "Creating Blog..." : "Create Blog"}
				</button>
				<Button variant="outline" onClick={handleCloseBlogModal}>
					Close
				</Button>
			</div>
		</form>
	);
}
