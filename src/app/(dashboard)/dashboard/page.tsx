import { PageHeader } from '@/components/dashboard-page-header/pageHeader'
import React from 'react'

const DashboardPage = () => {
    return (
        <>
            <PageHeader
                title="Dashboard"
                breadcrumbs={[
                    { name: "Dashboard" }
                ]}
            />

            {/* Page content goes here */}
            <div>
                <p>Welcome to the Dashboard page.</p>
            </div>
        </>
    )
}

export default DashboardPage