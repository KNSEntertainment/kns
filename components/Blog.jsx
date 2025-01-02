"use client";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import useFetchData from "@/hooks/useFetchData";

const advertisements = [
	{
		id: 1,
		image: "/event2.png",
		alt: "Advertisement 1",
		title: "Concert craze is increasing",
	},
	{
		id: 2,
		image: "/event3.png",
		alt: "Advertisement 2",
		title: "Standup Comedy has gained popularity",
	},
];

export default function Blog() {
	const { data: blogs } = useFetchData("/api/blogs", "blogs");

	return (
		<section id="blog" className="bg-gray-100">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
				<h2 className="text-3xl font-bold text-center mb-6 sm:mb-12">
					Our <span className="text-red-500">Blogs</span>
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{/* Featured Article - Left Column */}

					<div className="md:col-span-2 lg:col-span-1 lg:row-span-2">
						<h3 className="text-2xl font-bold mb-2">Featured</h3>
						<div className="group relative h-[520px] overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg">
							<Image src={blogs[0]?.blogMainPicture || "/placeholder.jpg"} alt={blogs[0]?.blogTitle || "alt"} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
								<div className="absolute bottom-0 p-4 text-slate-200">
									<h1 className="text-xl md:text-2xl font-bold mb-2 cursor-pointer group-hover:text-red-700">{blogs[0]?.blogTitle}</h1>
									<div className="flex items-center text-gray-300">
										<Calendar className="w-4 h-4 mr-2" />
										<span className="text-sm">{blogs[0]?.blogDate}</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Recent Blogs - Middle Column */}
					<div>
						<h3 className="text-2xl font-bold mb-2">Recent</h3>
						<div className="space-y-4">
							{blogs &&
								blogs.slice(1).map((blog) => (
									<div key={blog._id} className="group bg-white rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-md">
										<div className="flex items-center p-3">
											<div className="relative w-20 h-20 flex-shrink-0">
												<Image src={blog?.blogMainPicture || "/placeholder.jpg"} alt={blog?.blogTitle || "alt"} fill className="object-cover rounded" />
											</div>
											<div className="ml-4 flex-1">
												<h2 className="text-sm font-semibold text-gray-800 line-clamp-2 cursor-pointer group-hover:text-red-700 transition-colors duration-100 ease-in">{blog.blogTitle}</h2>
												<div className="flex items-center text-gray-500 mt-1">
													<Calendar className="w-3 h-3 mr-1" />
													<span className="text-xs">{blog?.blogDate}</span>
												</div>
											</div>
										</div>
									</div>
								))}
							<Button href="/news" className="w-full text-center">
								View More Recent Blogs
							</Button>
						</div>
					</div>

					{/* Advertisements - Right Column */}
					<div>
						<h3 className="text-2xl font-bold mb-2">Most Popular</h3>
						<div className="space-y-4">
							{advertisements.map((ad) => (
								<div key={ad.id} className="relative w-full h-56 aspect-[3/2] rounded-lg overflow-hidden shadow-md">
									<Image src={ad.image || "/placeholder.jpg"} alt={ad.alt || "alt"} fill className="object-cover" />
									<p className="absolute bottom-4 bg-black bg-opacity-50 text-white hover:text-red-100 text-2xl px-6 hover:scale-105 cursor-pointer transition-all ease-in-out duration-100">{ad.title} here</p>
								</div>
							))}
							<Button variant="outline" href="/news" className="w-full text-center">
								View More Popular Blogs
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
