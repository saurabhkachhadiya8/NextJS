import { PageHeader } from '@/components/dashboard-page-header/pageHeader'
import React from 'react'

const ProductPage = () => {
    return (
        <>
            <PageHeader
                title="Product"
                breadcrumbs={[
                    { name: "Product" }
                ]}
            />

            {/* Page content goes here */}
            <div>
                <p>Welcome to the Product page.</p>
            </div>
        </>
    )
}

export default ProductPage