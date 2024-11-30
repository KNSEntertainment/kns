import connectDB from "@/lib/mongodb";
import Article from "@/models/Article.Model";

export async function getBlogData() {
	try {
		await connectDB();

		const featuredArticle = await Article.findOne({ isFeatured: true }).sort({ createdAt: -1 }).lean();
		const recentArticles = await Article.find({ isFeatured: false }).sort({ createdAt: -1 }).limit(4).lean();
		const popularArticles = await Article.find({ isPopular: true }).limit(2).lean();

		return {
			featuredArticle: JSON.parse(JSON.stringify(featuredArticle)),
			recentArticles: JSON.parse(JSON.stringify(recentArticles)),
			popularArticles: JSON.parse(JSON.stringify(popularArticles)),
		};
	} catch (error) {
		console.error("Error in getBlogData:", error);
		throw new Error("Failed to fetch blog data");
	}
}
