import { Metadata } from "next";
import AboutUsContent from "./about-us-content";

export const metadata: Metadata = {
	title: "About Us | Gurung KNS Entertainment",
	description: "Learn about our vision, team, and services in event planning across Europe.",
};

export default function AboutUsPage() {
	return <AboutUsContent />;
}
