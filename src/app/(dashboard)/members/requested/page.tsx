import { PageHeader } from '@/components/dashboard-page-header/pageHeader'
import React from 'react'

const RequestedPage = () => {
    return (
        <>
            <PageHeader
                title="Requested Members"
                breadcrumbs={[
                    { name: "Members" },
                    { name: "Requested", current: true }
                ]}
            />

            {/* Page content goes here */}
            <div>
                <p>Welcome to the Requested Members page.</p>
            </div>
        </>
    )
}

export default RequestedPage