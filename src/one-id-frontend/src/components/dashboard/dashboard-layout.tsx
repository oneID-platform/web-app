import Header from "./header";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
	return (
		<div className='w-[80%] mx-auto bg-[#0f0e0e]'>
			<Header />
			<Outlet />
		</div>
	);
}
export default DashboardLayout;
