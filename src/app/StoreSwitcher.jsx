"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Store, User, LogOut } from "lucide-react";

export default function StoreSwitcher({ className, items = [] }) {
    const [open, setOpen] = useState(false);

    return (
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
                    Alicia
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2">
                <div className="flex flex-col space-y-1">
                    <div className="px-2 py-1 text-sm font-medium text-gray-900">
                        My Account
                    </div>
                    <hr className="my-1 border-gray-200" />
                    <button className="flex items-center p-1 rounded-md hover:bg-gray-100">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </button>
                    <button className="flex items-center p-1 rounded-md hover:bg-gray-100">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
