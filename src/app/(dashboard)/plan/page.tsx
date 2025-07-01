import { PageHeader } from '@/components/dashboard-page-header/pageHeader'
import React from 'react'

const PlanPage = () => {
    return (
        <>
            <PageHeader
                title="Plan"
                breadcrumbs={[
                    { name: "Plan" }
                ]}
            />

            {/* Page content goes here */}
            <div>
                <p>Welcome to the Plan page.</p>
            </div>
        </>
    )
}

export default PlanPage