"use client"

import DashboardLayout from "@/layouts/dashboard-layout/layout"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout>{children}</DashboardLayout>
    )
}
