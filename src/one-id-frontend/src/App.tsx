import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./app.css";
import DashboardLayout from "./components/dashboard/dashboard-layout";
import UserProfile from "./pages/user-profile";
import Integrations from "./pages/integrations";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		element: <DashboardLayout />,
		children: [
			{
				path: "/dashboard",
				element: <UserProfile />,
			},
			{
				path: "/dashboard/integrations",
				element: <Integrations />,
			},
		],
	},
]);
function App() {
	return <RouterProvider router={router} />;
}

export default App;
