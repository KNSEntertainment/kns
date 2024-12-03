"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import BlogForm from "@/components/BlogForm";
import useFetchData from "@/hooks/useFetchData";

export default function EventsPage() {
	const [openCreateBlogModal, setOpenCreateBlogModal] = useState(false);
	const { data: blogs, error, loading } = useFetchData("/api/blogs", "blogs");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	const handleView = (id) => {
		console.log("View item:", id);
	};

	const handleEdit = (id) => {
		console.log("Edit item:", id);
	};

	const handleDelete = (id) => {
		console.log("Delete item:", id);
	};

	const handleCloseBlogModal = () => {
		setOpenCreateBlogModal(false);
	};

	const handleCreateBlog = () => {
		setOpenCreateBlogModal(true);
	};

	return (
		<>
			<div className="text-right">
				<button onClick={handleCreateBlog} className="bg-red-800 text-white font-bold px-4 py-2 my-4">
					Create Blog
				</button>
			</div>
			<div className="bg-white rounded-lg shadow">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Event Name</TableHead>
							<TableHead>Event Venue</TableHead>
							<TableHead>Event Date</TableHead>
							<TableHead>Poster</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{blogs.length > 0 ? (
							blogs.map((blog) => (
								<TableRow key={blog?.author}>
									<TableCell className="font-semibold">Blog Title</TableCell>
									<TableCell>{blog.author || "Author"}</TableCell>
									<TableCell>Hello</TableCell>
									<TableCell>
										<Image src={blog?.picture || "/placeholder.jpg"} width={200} height={200} alt={blog?.author} className="w-24 h-32 object-cover" />
									</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button variant="ghost" size="icon" onClick={() => handleView(blog.id)}>
												<Eye className="w-6 h-6 text-green-700" />
											</Button>
											<Button variant="ghost" size="icon" onClick={() => handleEdit(blog.id)}>
												<Pencil className="w-6 h-6 text-blue-700" />
											</Button>
											<Button variant="ghost" size="icon" onClick={() => handleDelete(blog.id)}>
												<Trash2 className="w-6 h-6 text-red-700" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} className="text-center">
									No blogs found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{openCreateBlogModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-bold text-gray-800 bg-red-100 p-4 mb-6 text-center">Create Blog</h2>
						<BlogForm handleCloseBlogModal={handleCloseBlogModal} fetchBlogs={blogs} />
					</div>
				</div>
			)}
		</>
	);
}
