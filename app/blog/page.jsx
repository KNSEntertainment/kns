import { getBlogData } from "@/lib/getBlogData";
import Blog from "@/app/components/Blog";

export default async function Page() {
	const { featuredArticle, recentArticles, popularArticles } = await getBlogData();

	return <Blog featuredArticle={featuredArticle} recentArticles={recentArticles} popularArticles={popularArticles} />;
}
