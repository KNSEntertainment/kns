"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

// Mock data for search results
const mockResults = [
	{ id: 1, title: "Modern JavaScript Course", price: 49.99, rating: 4.5, image: "/placeholder.svg?height=200&width=300" },
	{ id: 2, title: "React Masterclass", price: 79.99, rating: 4.8, image: "/placeholder.svg?height=200&width=300" },
	{ id: 3, title: "Node.js for Beginners", price: 39.99, rating: 4.2, image: "/placeholder.svg?height=200&width=300" },
	{ id: 4, title: "Full Stack Web Development", price: 99.99, rating: 4.7, image: "/placeholder.svg?height=200&width=300" },
	{ id: 5, title: "Python Data Science", price: 69.99, rating: 4.6, image: "/placeholder.svg?height=200&width=300" },
	{ id: 6, title: "Machine Learning A-Z", price: 89.99, rating: 4.9, image: "/placeholder.svg?height=200&width=300" },
];

export default function SearchResults() {
	const searchParams = useSearchParams();
	const query = searchParams.get("query") || "";
	const [searchTerm, setSearchTerm] = useState(query);

	return (
		<div className="min-h-screen bg-gray-100">
			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold text-gray-900">Course Finder</h1>
						<div className="flex items-center w-full max-w-md">
							<Input type="text" placeholder="Search courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-grow" />
							<Button className="ml-2">
								<Search className="h-5 w-5" />
							</Button>
						</div>
					</div>
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex flex-col md:flex-row gap-8">
					<aside className="w-full md:w-64 space-y-6">
						<Card>
							<CardContent className="pt-6">
								<h2 className="text-lg font-semibold mb-4">Filters</h2>
								<div className="space-y-4">
									<div>
										<h3 className="text-sm font-medium mb-2">Price Range</h3>
										<slider defaultValue={[0, 100]} max={100} step={1} />
									</div>
									<div>
										<h3 className="text-sm font-medium mb-2">Rating</h3>
										<Select>
											<SelectTrigger>
												<SelectValue placeholder="Select rating" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="4">4+ stars</SelectItem>
												<SelectItem value="3">3+ stars</SelectItem>
												<SelectItem value="2">2+ stars</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div>
										<h3 className="text-sm font-medium mb-2">Categories</h3>
										<div className="space-y-2">
											<div className="flex items-center">
												<label htmlFor="web-dev" className="ml-2 text-sm">
													Web Development
												</label>
											</div>
											<div className="flex items-center">
												<label htmlFor="data-science" className="ml-2 text-sm">
													Data Science
												</label>
											</div>
											<div className="flex items-center">
												<label htmlFor="mobile-dev" className="ml-2 text-sm">
													Mobile Development
												</label>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button className="w-full">Apply Filters</Button>
							</CardFooter>
						</Card>
					</aside>

					<div className="flex-grow">
						<h2 className="text-2xl font-bold mb-6">Search Results for "{query}"</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{mockResults.map((result) => (
								<Card key={result.id} className="overflow-hidden">
									<img src={result.image} alt={result.title} className="w-full h-48 object-cover" />
									<CardContent className="p-4">
										<h3 className="text-lg font-semibold mb-2">{result.title}</h3>
										<div className="flex justify-between items-center">
											<span className="text-2xl font-bold">${result.price}</span>
											<span className="text-sm text-yellow-500">★ {result.rating}</span>
										</div>
									</CardContent>
									<CardFooter>
										<Button className="w-full">View Course</Button>
									</CardFooter>
								</Card>
							))}
						</div>
						<div className="mt-8 flex justify-center">
							<Button variant="outline" className="mx-1">
								Previous
							</Button>
							<Button variant="outline" className="mx-1">
								1
							</Button>
							<Button variant="outline" className="mx-1">
								2
							</Button>
							<Button variant="outline" className="mx-1">
								3
							</Button>
							<Button variant="outline" className="mx-1">
								Next
							</Button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
