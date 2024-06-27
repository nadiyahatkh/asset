'use client'

import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation"

export function MainNav(props) {
    const { className, ...restProps } = props;
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/dashboard`,
            label: `Dashboard`,
            active: pathname.startsWith(`/dashboard`)
        },
        {
            href: `/asetData`,
            label: `Data Aset`,
            active: pathname.startsWith(`/asetData`)
        },
        {
            href: `/submission`,
            label: `Pengajuan`,
            active: pathname.startsWith(`/submission`)
        },
        {
            href: `/EmployeeManagement`,
            label: `Manajemen Karyawan`,
            active: pathname.startsWith(`/EmployeeManagement`)
        }
    ]
 return(
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
        {routes.map((route) => (
            <Link 
                key={route.href}
                href={route.href}
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    route.active
                    ? "active-route"
                    : "text-muted-foreground"
                )}
            >
                {route.label}
            </Link>
        ))}
    </nav>
 )
}