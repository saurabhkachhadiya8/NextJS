import { PageHeader } from '@/components/dashboard-page-header/pageHeader'
import React from 'react'

const ProfilePage = () => {
    return (
        <>
            <PageHeader
                title="Profile"
                breadcrumbs={[
                    { name: "Profile" }
                ]}
            />

            {/* Page content goes here */}
            <div>
                <p>Welcome to the Profile page.</p>
            </div>
        </>
    )
}

export default ProfilePage