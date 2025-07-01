import { PageHeader } from '@/components/dashboard-page-header/pageHeader'
import React from 'react'

const PartnerPage = () => {
    return (
        <>
            <PageHeader
                title="Partner"
                breadcrumbs={[
                    { name: "Partner-Team" },
                    { name: "Partner", current: true }
                ]}
            />

            {/* Page content goes here */}
            <div>
                <p>Welcome to the Partner page.</p>
            </div>
        </>
    )
}

export default PartnerPage