import { PageHeader } from '@/components/dashboard-page-header/pageHeader'
import React from 'react'

const TeamPage = () => {
    return (
        <>
            <PageHeader
                title="Team"
                breadcrumbs={[
                    { name: "Partner-Team" },
                    { name: "Team", current: true }
                ]}
            />

            {/* Page content goes here */}
            <div>
                <p>Welcome to the Team page.</p>
            </div>
        </>
    )
}

export default TeamPage