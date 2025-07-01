import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
    title: string
    breadcrumbs: { name: string; href?: string; current?: boolean }[]
}

export function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
    return (
        <>
            {/* Top: Title and Breadcrumbs */}
            <div>
                <h1 className="text-xl font-semibold">{title}</h1>
                <Breadcrumb className="mt-1">
                    <BreadcrumbList>
                        {breadcrumbs.map((crumb, index) => (
                            <BreadcrumbItem key={crumb.name}>
                                {crumb.href ? (
                                    <BreadcrumbLink href={crumb.href}>{crumb.name}</BreadcrumbLink>
                                ) : (
                                    <BreadcrumbLink
                                        className={cn(
                                            "cursor-default",
                                            crumb.current && "font-medium text-foreground"
                                        )}
                                    >
                                        {crumb.name}
                                    </BreadcrumbLink>
                                )}
                                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                            </BreadcrumbItem>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Bottom: Separator with title aligned right */}
            <div className="relative my-4">
                <Separator />
                <span className="absolute right-20 -top-3 text-sm font-medium text-foreground bg-gray-50 px-4">
                    {title}
                </span>
            </div>
        </>
    )
}
