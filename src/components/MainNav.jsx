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
            href: `/Dashboard`,
            label: `Dashboard`,
            active: pathname === `/Dashboard`
        },
        {
            href: `/dataaset`,
            label: `Data Aset`,
            active: pathname === `/dataaset`
        },
        {
            href: `/pengajuan`,
            label: `Pengajuan`,
            active: pathname === `/pengajuan`
        },
        {
            href: `/mk`,
            label: `Manajemen Karyawan`,
            active: pathname === `/mk`
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
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
            >
                {route.label}
            </Link>
        ))}
    </nav>
 )
}