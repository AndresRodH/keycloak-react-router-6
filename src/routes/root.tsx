import { Form, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { getUserProfile, logout } from "../lib/auth";

export async function loader() {
	const profile = await getUserProfile();
	return { profile };
}

export async function action() {
	await logout();
}

export default function Root() {
	const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;

	return (
		<div style={{ fontFamily: "sans-serif" }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					backgroundColor: "black",
					padding: "16px 8px",
					color: "white",
					textAlign: "center",
					gap: 8,
				}}
			>
				<span>ACME, inc.</span>
				Hello, {data.profile.username}!
				<Form method="POST">
					<button type="submit">Logout</button>
				</Form>
			</div>
			<div style={{ display: "flex", gap: "8px", marginTop: 8 }}>
				<NavLink to="/public">Public</NavLink>
				<NavLink to="/protected">Protected</NavLink>
			</div>
			<div style={{ marginTop: 8 }}>
				<Outlet />
			</div>
		</div>
	);
}
