import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function register() {
    return(
        <div className="w-full h-screen flex">
            <div className="relative w-1/2 h-full">
                <img src="./maskgroup.png" alt="" className="w-full h-full object-cover"/>
            </div>

            <div className="w-1/2 h-full flex flex-col justify-center p-20">
                <div className="w-full max-w-md mx-auto">
                    <div className="mb-5 text-center">
                        <Label className="text-2xl font-semibold mb-4 block">Sign Up</Label>
                    </div>
                    <div className="space-y-2">
                        <Input placeholder="name" type="name" id="name" className="w-full shadow-sm" />
                        <Input placeholder="name@example.com" type="email" id="email" className="w-full shadow-sm" />
                        <Input type="password" id="password" placeholder="*****" className="w-full shadow-sm" />
                        <div className="flex flex-col items-center space-y-4">
                            <Button style={{ backgroundColor: '#F9B421' }} className="text-gray-800 w-full">Sign Up</Button>
                            <Label className="text-sm text-muted-foreground">Do you have account? 
                                <Link href="./login" style={{ color: '#F9B421' }} className="ml-1 underline">Sign In</Link>
                            </Label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}