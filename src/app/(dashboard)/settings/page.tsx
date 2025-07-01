import { PageHeader } from '@/components/dashboard-page-header/pageHeader'
import React from 'react'

const SettingsPage = () => {
    return (
        <>
            <PageHeader
                title="Settings"
                breadcrumbs={[
                    { name: "Settings" }
                ]}
            />

            {/* Page content goes here */}
            <div>
                <p>Welcome to the Settings page.</p>
            </div>
        </>
    )
}

export default SettingsPage