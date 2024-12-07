import { Suspense } from "react";
import SubscribersList from "./SubscribersList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const dynamic = "force-dynamic";

export default function SubscribersPage() {
	return (
		<div className="max-w-2xl space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Subscribers</CardTitle>
					<CardDescription>Manage and view your newsletter subscribers.</CardDescription>
				</CardHeader>
				<CardContent>
					<Suspense fallback={<SubscribersListSkeleton />}>
						<SubscribersList />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	);
}

function SubscribersListSkeleton() {
	return (
		<div className="space-y-4">
			{[...Array(5)].map((_, i) => (
				<div key={i} className="flex items-center space-x-4">
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
			))}
		</div>
	);
}
