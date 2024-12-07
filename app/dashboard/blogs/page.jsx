"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import BlogForm from "@/components/BlogForm";
import useFetchData from "@/hooks/useFetchData";

export default function EventsPage() {
	const [openCreateBlogModal, setOpenCreateBlogModal] = useState(false);
	const { data: blogs, error, loading } = useFetchData("/api/blogs", "blogs");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

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
		<div className="max-w-6xl">
			<div className="text-right">
				<button onClick={handleCreateBlog} className="bg-red-800 text-white font-bold px-4 py-2 my-4">
					Create Blog
				</button>
			</div>
			<div className="bg-white rounded-lg shadow">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Blog Title</TableHead>
							<TableHead>Blog Description</TableHead>
							<TableHead>Blog Author</TableHead>
							<TableHead>Blog Date</TableHead>
							<TableHead>Main Image</TableHead>
							<TableHead>Secondary Image</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{blogs.length > 0 ? (
							blogs.map((blog) => (
								<TableRow key={blog?._id}>
									<TableCell className="w-64 font-semibold">{blog.blogTitle}</TableCell>
									<TableCell className="w-72">{blog.blogDesc}</TableCell>
									<TableCell className="w-36">{blog.blogAuthor}</TableCell>
									<TableCell className="w-32">{blog.blogDate}</TableCell>
									<TableCell className="w-32">
										<Image src={blog?.blogMainPicture || "/placeholder.jpg"} width={200} height={200} alt={blog?.blogAuthor || "alt"} className="w-24 h-32 object-cover" />
									</TableCell>
									<TableCell className="w-32">
										<Image src={blog?.blogSecondPicture || "/placeholder.jpg"} width={200} height={200} alt={blog?.blogAuthor || "alt"} className="w-24 h-32 object-cover" />
									</TableCell>

									<TableCell className="w-32">
										<div className="flex space-x-2">
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
						<h2 className="text-lg font-bold text-white bg-red-700 p-4 mb-6 text-center">Create Blog</h2>
						<BlogForm handleCloseBlogModal={handleCloseBlogModal} fetchBlogs={blogs} />
					</div>
				</div>
			)}
		</div>
	);
}
