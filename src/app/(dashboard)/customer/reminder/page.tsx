import { PageHeader } from '@/components/dashboard-page-header/pageHeader'
import React from 'react'

const ReminderPage = () => {
    return (
        <>
            <PageHeader
                title="Reminder"
                breadcrumbs={[
                    { name: "Customer" },
                    { name: "Reminder", current: true }
                ]}
            />

            {/* Page content goes here */}
            <div>
                <p>Welcome to the Reminder page.</p>
            </div>
        </>
    )
}

export default ReminderPage