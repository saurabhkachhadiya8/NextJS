"use client"

import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import Footer from "@/components/footer/footer"
import Navbar from "@/components/navbar/dashboardNavbar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                {/* Sidebar */}
                <AppSidebar />

                {/* Right content: Navbar + Content + Footer */}
                <div className="flex flex-col flex-1 min-h-screen transition-all duration-300">
                    <Navbar />
                    <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-950">
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </SidebarProvider>
    )
}
