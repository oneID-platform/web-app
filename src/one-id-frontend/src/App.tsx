import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./app.css";
import DashboardLayout from "./components/dashboard/dashboard-layout";
import UserProfile from "./pages/user-profile";
import Integrations from "./pages/integrations";
import { ProtectedRoute } from "./components/protected-route";
import { Fragment } from "react/jsx-runtime";
import { Toaster } from "react-hot-toast";
import DashboardAbout from "./pages/about-dashboard";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		element: (
			<ProtectedRoute>
				<DashboardLayout />
			</ProtectedRoute>
		),
		children: [
			{
				path: "/dashboard",
				element: <UserProfile />,
			},
			{
				path: "/dashboard/integrations",
				element: <Integrations />,
			},
			{
				path: "/dashboard/about",
				element: <DashboardAbout />,
			},
		],
	},
]);

function App() {
	return (
		<Fragment>
			<Toaster />
			<RouterProvider router={router} />
		</Fragment>
	);
}

export default App;
