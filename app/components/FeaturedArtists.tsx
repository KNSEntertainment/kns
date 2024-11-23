import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const artists = [
	{ id: 1, name: "Anju Panta", genre: "Classical", image: "/avatar.avif" },
	{ id: 2, name: "Nepathya", genre: "Folk Rock", image: "/avatar.avif" },
	{ id: 3, name: "Kutumba", genre: "Instrumental Folk", image: "/avatar.avif" },
	{ id: 4, name: "Bipul Chettri", genre: "Folk", image: "/avatar.avif" },
];

export default function FeaturedArtists() {
	return (
		<section id="artists" className="py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">Featured Artists</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{artists.map((artist, index) => (
						<motion.div key={artist.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
							<Card className="overflow-hidden">
								<img src={artist.image} alt={artist.name} className="w-full h-64 object-cover" />
								<CardHeader>
									<CardTitle>{artist.name}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-gray-600">{artist.genre}</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
