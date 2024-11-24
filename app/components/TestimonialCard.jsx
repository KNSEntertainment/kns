import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote, MapPin, Heart } from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
	const [isLiked, setIsLiked] = React.useState(false);

	return (
		<Card className="max-w-xl bg-white hover:shadow-lg transition-shadow duration-300">
			<CardContent className="p-6">
				{/* Quote Icon Accent */}
				<div className="relative">
					<Quote className="absolute -top-1 -left-2 rotate-180 w-8 h-8 text-blue-500/10" />
				</div>

				{/* Main Quote Content */}
				<div className="mb-6 pl-6">
					{/* Testimonial Text */}
					<p className="text-gray-700 text-lg leading-relaxed relative">"{testimonial.text}"</p>
				</div>

				{/* Divider */}
				<div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6" />

				{/* Author Section */}
				<div className="flex items-start justify-between">
					<div className="flex items-center">
						{/* Avatar with Border */}
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-50" />
							<Avatar className="h-12 w-12 border-2 border-white relative">
								<AvatarImage src={testimonial.avatar} alt={testimonial.name} className="object-cover" />
								<AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">{testimonial.name[0]}</AvatarFallback>
							</Avatar>
						</div>

						{/* Author Details */}
						<div className="ml-4">
							<p className="font-semibold text-gray-900">{testimonial.name}</p>
							<div className="flex items-center mt-1 text-sm text-gray-600">
								<MapPin className="w-3 h-3 mr-1" />
								<span>{testimonial.location}</span>
							</div>
						</div>
					</div>

					{/* Interaction Buttons */}
					<div className="flex items-center space-x-3">
						<button className="group flex items-center space-x-1 p-2 hover:bg-rose-50 rounded-full transition-colors duration-200" onClick={() => setIsLiked(!isLiked)} aria-label={isLiked ? "Unlike testimonial" : "Like testimonial"}>
							<Heart className={`w-4 h-4 transition-colors duration-200 ${isLiked ? "text-rose-500 fill-rose-500 scale-110" : "text-gray-400 group-hover:text-rose-500"}`} />
						</button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default TestimonialCard;
