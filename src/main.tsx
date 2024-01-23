import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, {
	loader as rootLoader,
	action as rootAction,
} from "./routes/root";
import Public from "./routes/public";
import Protected, { loader as protectedLoader } from "./routes/protected";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				path: "/public",
				element: <Public />,
			},
			{
				path: "/protected",
				loader: protectedLoader,
				element: <Protected />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
