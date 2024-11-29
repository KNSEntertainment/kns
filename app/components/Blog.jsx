import Image from "next/image";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredArticle = {
	title: "Samikshya Adhikari is coming soon for the new event",
	image: "/samikshya.jpeg",
	timeAgo: "4 mins ago",
};

const recentArticles = [
	{
		id: 1,
		title: "Nepali Community in Europe: Managing Cultural Programs with Increased Participation",
		image: "/event1.png",
		timeAgo: "7 hours ago",
	},
	{
		id: 2,
		title: "Challenges Faced by Nepali Event Organizers in Europe: Navigating Cultural and Financial Hurdles",
		image: "/event2.png",
		timeAgo: "7 hours ago",
	},
	{
		id: 3,
		title: "Over 200 Cultural Events Launched by the Nepali Community in Europe: A Growing Network",
		image: "/event3.png",
		timeAgo: "7 hours ago",
	},
	{
		id: 4,
		title: "A Decade of Growth: The Evolution of Nepali Cultural Programs in Europe",
		image: "/event4.png",
		timeAgo: "7 hours ago",
	},
];

const advertisements = [
	{
		id: 1,
		image: "/event2.png",
		alt: "Advertisement 1",
	},
	{
		id: 2,
		image: "/event3.png",
		alt: "Advertisement 2",
	},
];

export default function NewsPage() {
	return (
		<section id="blog" className="bg-gray-100">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
				<h2 className="text-3xl font-bold text-center mb-6 sm:mb-12">Our Blogs</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{/* Featured Article - Left Column */}

					<div className="md:col-span-2 lg:col-span-1 lg:row-span-2">
						<h3 className="text-2xl font-bold mb-2">Featured</h3>
						<div className="group relative h-[520px] overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg">
							<Image src={featuredArticle.image} alt={featuredArticle.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
								<div className="absolute bottom-0 p-4 text-white">
									<h1 className="text-xl md:text-2xl font-bold mb-2">{featuredArticle.title}</h1>
									<div className="flex items-center text-gray-300">
										<Clock className="w-4 h-4 mr-2" />
										<span className="text-sm">{featuredArticle.timeAgo}</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Recent Articles - Middle Column */}
					<div>
						<h3 className="text-2xl font-bold mb-2">Recent</h3>
						<div className="space-y-4">
							{recentArticles.map((article) => (
								<div key={article.id} className="group bg-white rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-md">
									<div className="flex items-center p-3">
										<div className="relative w-20 h-20 flex-shrink-0">
											<Image src={article.image} alt={article.title} fill className="object-cover rounded" />
										</div>
										<div className="ml-4 flex-1">
											<h2 className="text-sm font-semibold text-gray-800 line-clamp-2">{article.title}</h2>
											<div className="flex items-center text-gray-500 mt-1">
												<Clock className="w-3 h-3 mr-1" />
												<span className="text-xs">{article.timeAgo}</span>
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
									<Image src={ad.image} alt={ad.alt} fill className="object-cover" />
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
