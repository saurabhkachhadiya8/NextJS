import { PageHeader } from '@/components/dashboard-page-header/pageHeader'
import React from 'react'

const CustomerListPage = () => {
    return (
        <>
            <PageHeader
                title="Customer List"
                breadcrumbs={[
                    { name: "Customer" },
                    { name: "List", current: true }
                ]}
            />

            {/* Page content goes here */}
            <div>
                <p>Welcome to the Customer List page.</p>
            </div>
        </>
    )
}

export default CustomerListPage