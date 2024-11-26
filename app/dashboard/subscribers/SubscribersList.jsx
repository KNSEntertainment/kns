"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import connectDB from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber.Model";
async function getSubscribers() {
	await connectDB();
	const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
	return subscribers;
}

export default async function SubscribersList() {
	const subscribers = await getSubscribers();

	return <SubscribersListContent initialSubscribers={subscribers} />;
}

function SubscribersListContent({ initialSubscribers }) {
	const [subscribers, setSubscribers] = useState(initialSubscribers);
	const [deleteId, setDeleteId] = useState(null);
	const router = useRouter();

	const handleDelete = async (id) => {
		try {
			const res = await fetch(`/api/subscribers/${id}`, { method: "DELETE" });
			if (res.ok) {
				setSubscribers(subscribers.filter((sub) => sub._id !== id));
				router.refresh();
			}
		} catch (error) {
			console.error("Failed to delete subscriber:", error);
		}
		setDeleteId(null);
	};

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Subscriber</TableHead>
						<TableHead>Joined</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{subscribers.map((subscriber) => (
						<TableRow key={subscriber._id}>
							<TableCell className="font-medium">
								<div className="flex items-center space-x-4">
									<Avatar>
										<AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${subscriber.email}`} />
										<AvatarFallback>Image</AvatarFallback>
									</Avatar>
									<div>
										<div className="font-bold">{subscriber.name || "N/A"}</div>
										<div className="text-sm text-gray-500">{subscriber.email}</div>
									</div>
								</div>
							</TableCell>
							<TableCell>{format(new Date(subscriber.createdAt), "PP")}</TableCell>
							<TableCell>
								<span className={`px-2 py-1 rounded-full text-xs font-semibold ${subscriber.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{subscriber.status}</span>
							</TableCell>
							<TableCell>
								<Button variant="ghost" size="icon" onClick={() => setDeleteId(subscriber._id)}>
									<Trash2 className="h-4 w-4" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>This action cannot be undone. This will permanently delete the subscriber from your database.</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={() => handleDelete(deleteId)}>Delete</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
