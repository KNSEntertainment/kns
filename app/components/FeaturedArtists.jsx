import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, Facebook, Instagram, Play, User } from "lucide-react";
import { useEffect, useState } from "react";

// const artists = [
// 	{
// 		id: 1,
// 		name: "Jyoti Magar",
// 		genre: "Modern",
// 		image: "/jyoti.jpeg",
// 		bio: "A modern Nepali singer known for her unique style and energetic performances.",
// 		totalsongs: 134,
// 		rating: 4.9,
// 		popularSongs: ["Timilai Dekhera", "Chirbir Chirbir", "Sakambari"],
// 		socialMedia: {
// 			facebook: "https://facebook.com/jyotimagar",
// 			instagram: "https://instagram.com/jyotimagar",
// 		},
// 		performanceCount: 150,
// 		contact: "jyotimagar@music.com",
// 		featured: true,
// 	},
// 	{
// 		id: 2,
// 		name: "Prakash Saput",
// 		genre: "Folk",
// 		image: "/prakashsaput.jpeg",
// 		bio: "A prominent figure in Nepali folk music with a message-driven style.",
// 		totalsongs: 160,
// 		rating: 4.8,
// 		popularSongs: ["Bol Maya", "Galbandi", "Mero Pani Haina Ra"],
// 		socialMedia: {
// 			facebook: "https://facebook.com/prakashsaput",
// 			instagram: "https://instagram.com/prakashsaput",
// 		},
// 		performanceCount: 200,
// 		contact: "contact@prakashsaput.com",
// 		featured: true,
// 	},
// 	{
// 		id: 3,
// 		name: "Samikshya Adhikari",
// 		genre: "Instrumental Folk",
// 		image: "/samikshya1.jpeg",
// 		bio: "A versatile instrumentalist blending traditional and modern folk tunes.",
// 		totalsongs: 150,
// 		rating: 4.9,
// 		popularSongs: ["Instrumental Magic", "Himalayan Echoes", "Arko kun hola"],
// 		socialMedia: {
// 			facebook: "https://facebook.com/samikshya",
// 			instagram: "https://instagram.com/samikshya",
// 		},
// 		performanceCount: 75,
// 		contact: "info@samikshya.com",
// 		featured: false,
// 	},
// 	{
// 		id: 4,
// 		name: "Melina Rai",
// 		genre: "Folk",
// 		image: "/melina.jpeg",
// 		bio: "Known for her melodious voice and heartwarming folk songs.",
// 		totalsongs: 134,
// 		rating: 4.5,
// 		popularSongs: ["Kutu Ma Kutu", "Timro Bhaka", "Dashain Tihar"],
// 		socialMedia: {
// 			facebook: "https://facebook.com/melinarai",
// 			instagram: "https://instagram.com/melinarai",
// 		},
// 		performanceCount: 120,
// 		contact: "melinarai@music.com",
// 		featured: true,
// 	},
// ];

export default function FeaturedArtists() {
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchArtists = async () => {
			try {
				const response = await fetch("/api/artists");
				const data = await response.json();

				if (data.success) {
					setArtists(data.artists);
				} else {
					console.error("Failed to fetch artists:", data.error);
				}
			} catch (error) {
				console.error("Error fetching artists:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchArtists();
	}, []);

	if (loading) {
		return <p>Loading artists...</p>;
	}
	return (
		<section id="artists" className="py-16 bg-gray-100">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">Featured Artists</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{artists.map((artist, index) => (
						<motion.div key={artist.index} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
							<Card className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
								{/* Hero Section with Image Overlay */}
								<div className="relative">
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
									<Image width={300} height={300} src={artist.image} alt={artist.name} className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105" />
									<div className="absolute bottom-4 left-4 z-20">
										<Badge className="bg-red-500 text-white mb-2">{artist.genre}</Badge>
										<h2 className="text-2xl font-bold text-white mb-1">{artist.name}</h2>
									</div>
								</div>

								<CardContent className="p-6">
									{/* Stats Section */}
									<div className="grid grid-cols-3 gap-4 mb-6">
										<div className="text-center p-3 bg-gray-50 rounded-lg">
											<User className="w-5 h-5 mx-auto mb-1 text-red-500" />
											<p className="text-lg font-bold">{artist.performanceCount}</p>
											<p className="text-xs text-gray-600">Performances</p>
										</div>
										<div className="text-center p-3 bg-gray-50 rounded-lg">
											<Music className="w-5 h-5 mx-auto mb-1 text-red-500" />
											<p className="text-lg font-bold">{artist.totalsongs}</p>
											<p className="text-xs text-gray-600">Songs</p>
										</div>
										<div className="text-center p-3 bg-gray-50 rounded-lg">
											<Play className="w-5 h-5 mx-auto mb-1 text-red-500" />
											<p className="text-lg font-bold">{artist.rating}</p>
											<p className="text-xs text-gray-600">Rating</p>
										</div>
									</div>

									{/* Bio Section */}
									<div className="mb-6">
										<p className="text-gray-700 leading-relaxed">{artist.bio}</p>
									</div>

									{/* Popular Songs Section */}
									<div className="mb-6">
										<h3 className="text-sm font-semibold text-gray-900 mb-3">Popular Songs</h3>
										<div className="space-y-2">
											{artist.popularSongs.map((song, index) => (
												<div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
													<Music className="w-4 h-4 text-red-500 mr-2" />
													<span className="text-sm text-gray-700">{song}</span>
												</div>
											))}
										</div>
									</div>

									{/* Social Media Section */}
									<div className="flex space-x-3">
										{artist.socialMedia.facebook && (
											<Button variant="outline" size="sm" className="flex-1" onClick={() => window.open(artist.socialMedia.facebook, "_blank")}>
												<Facebook className="w-4 h-4 mr-2" />
												Facebook
											</Button>
										)}
										{artist.socialMedia.instagram && (
											<Button variant="outline" size="sm" className="flex-1" onClick={() => window.open(artist.socialMedia.instagram, "_blank")}>
												<Instagram className="w-4 h-4 mr-2" />
												Instagram
											</Button>
										)}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
