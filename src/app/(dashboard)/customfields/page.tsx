import { PageHeader } from '@/components/dashboard-page-header/pageHeader'
import React from 'react'

const CustomFieldsPage = () => {
    return (
        <>
            <PageHeader
                title="Custom Fields"
                breadcrumbs={[
                    { name: "Custom Fields" }
                ]}
            />

            {/* Page content goes here */}
            <div>
                <p>Welcome to the Custom Fields page.</p>
            </div>
        </>
    )
}

export default CustomFieldsPage