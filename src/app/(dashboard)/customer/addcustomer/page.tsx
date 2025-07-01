import { PageHeader } from '@/components/dashboard-page-header/pageHeader'
import React from 'react'

const AddCustomerPage = () => {
    return (
        <>
            <PageHeader
                title="Add Customer"
                breadcrumbs={[
                    { name: "Customer" },
                    { name: "Add", current: true }
                ]}
            />

            {/* Page content goes here */}
            <div>
                <p>Welcome to the Add Customer page.</p>
            </div>
        </>
    )
}

export default AddCustomerPage