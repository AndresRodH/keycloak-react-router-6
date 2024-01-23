import { useLoaderData } from "react-router-dom";
import { getUserProfile } from "../lib/auth";

export async function loader() {
	const profile = await getUserProfile();

	return { profile };
}

export default function Protected() {
	const { profile } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
	return (
		<div style={{ backgroundColor: "green", color: "white", padding: 80 }}>
			Hello, {profile.username}!
		</div>
	);
}
