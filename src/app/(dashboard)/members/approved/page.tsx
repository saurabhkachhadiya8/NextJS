import { PageHeader } from '@/components/dashboard-page-header/pageHeader'
import React from 'react'

const ApprovedPage = () => {
    return (
        <>
            <PageHeader
                title="Approved Members"
                breadcrumbs={[
                    { name: "Members" },
                    { name: "Approved", current: true }
                ]}
            />

            {/* Page content goes here */}
            <div>
                <p>Welcome to the Approved Members page.</p>
            </div>
        </>
    )
}

export default ApprovedPage