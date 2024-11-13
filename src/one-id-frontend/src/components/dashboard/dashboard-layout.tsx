import Header from "./header";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
	return (
		<div className='mx-auto bg-[#0f0e0e] h-screen dashboard-layout'>
			<Header />
			<div className='outlet mx-auto w-[80%]'>
				<Outlet />
			</div>
		</div>
	);
}
export default DashboardLayout;
