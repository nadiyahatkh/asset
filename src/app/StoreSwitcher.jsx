'use client';

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, User, LogOut, LogIn } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchNavbarProfile } from "./apiService";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { TailSpin } from "react-loader-spinner";

export default function StoreSwitcher({ className, items = [] }) {
    const [open, setOpen] = useState(false);
    const [showDialogLogOut, setShowDialogLogOut] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { status, data: session } = useSession();
    const [foto, setFoto] = useState()
    const router = useRouter();
    const isAdmin = session?.user?.role === 1 ;  // Assuming role is stored in session
    const handleSignOut = () => {
        setIsLoading(true)
        signOut({ callbackUrl: '/sign-in' }); // Redirect to login page after sign out
    };

    

    useEffect(() => {
        const loadDataFoto = async () => {
            try{
                const profileData = await fetchNavbarProfile({token: session?.user?.token})
                setFoto(profileData.data.foto)
            } catch (error) {
                console.error('Failed to fetch data:', error);
              }
        }
        if (session?.user?.token) {
            loadDataFoto()
        }
    }, [session?.user?.token])

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
                    <Avatar className="w-4 h-4 rounded-full mr-2">
                        <AvatarImage src={foto} alt="@shadcn" />
                        <AvatarFallback>{session?.user?.name || 'Guest'}</AvatarFallback>
                    </Avatar>
                    {/* <img src={profileImage} alt="Profile Image" className="w-4 h-4 rounded-full mr-2" /> */}
                    {session?.user?.name || 'Guest'}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2">
                <div className="flex flex-col space-y-1">
                    {isAdmin && (
                        <>
                            <div className="px-2 py-1 text-sm font-medium text-gray-900">
                                My Account
                            </div>
                            <hr className="my-1 border-gray-200" />
                            <Link href="./profile" className="flex items-center p-1 rounded-md hover:bg-gray-100">
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </Link>
                        </>
                    )}
                    {status === 'authenticated' ? (
                        <button className="flex items-center p-1 rounded-md hover:bg-gray-100" onClick={() => setShowDialogLogOut(true)}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Log Out
                        </button>
                    ) : (
                        <button className="flex items-center p-1 rounded-md hover:bg-gray-100" onClick={() => router.push("/sign-in")}>
                            <LogIn className="mr-2 h-4 w-4" />
                            Log In
                        </button>
                    )}
                    <AlertDialog open={showDialogLogOut} onClose={() => setShowDialogLogOut(false)}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Anda Ingin Keluar Dari Akun {session?.user?.name}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setShowDialogLogOut(false)}>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSignOut}>
                                    {isLoading ? (
                                        <TailSpin
                                            height="20"
                                            width="20"
                                            color="#ffffff"
                                            ariaLabel="loading"
                                        />
                                    ) : (
                                        'Ya'
                                    )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                </div>
            </PopoverContent>
        </Popover>
    );
}
