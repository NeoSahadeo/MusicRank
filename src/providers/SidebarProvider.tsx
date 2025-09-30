import { SidebarProvider as SP, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/app-sidebar";

export default function SidebarProvider({ children }) {
	return (
		<SP>
			<AppSidebar />
			<SidebarTrigger />
			{children}
		</SP>
	);
}
