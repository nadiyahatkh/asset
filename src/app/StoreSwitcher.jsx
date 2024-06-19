"use client"

import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Store } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";


export default function StoreSwitcher({ className, items = [] }) {
    const [open, setOpen] = useState(false)

    return(
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button 
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <Store className="mr-2 h-4 w-4" />
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
        </Popover>
    )
}