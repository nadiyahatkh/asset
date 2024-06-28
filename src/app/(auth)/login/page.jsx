'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: value.email,
        password: value.password,
      });
      if (res && !res.error) {
        const session = await getSession(); // Fetch the session to ensure it has the updated role
        const userRole = session?.user?.role_id;
        console.log('User Role:', userRole);
        const redirectUrl = userRole === 1 ? '/dashboard' : '/';
        router.push(redirectUrl);
      } else {
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  


    return (
        <div className="w-full h-screen flex">
            <div className="relative w-1/2 h-full">
                <img src="./maskgroup.png" alt="" className="w-full h-full object-cover"/>
            </div>

            <div className="w-1/2 h-full flex flex-col justify-center p-20">
                <div className="w-full max-w-md mx-auto">
                    <div className="mb-5 text-center">
                        <Label className="text-2xl font-semibold mb-4 block">Sign In</Label>
                    </div>
                    <form className="space-y-2" onSubmit={handleLogin}>
                        <Input 
                            placeholder="name@example.com" 
                            type="email" 
                            id="email" 
                            className="w-full shadow-sm" 
                            onChange={(e) => {
                                setValue({ ...value, email: e.target.value });
                              }}
                        />
                        <Input 
                            type="password" 
                            id="password" 
                            placeholder="*****" 
                            className="w-full shadow-sm" 
                            onChange={(e) => {
                                setValue({ ...value, password: e.target.value });
                              }}
                        />
                        <div className="flex flex-col items-center space-y-4">
                            <Button style={{ backgroundColor: '#F9B421' }} className="text-gray-800 w-full" type="submit">
                                Sign In
                            </Button>
                            <Label className="text-sm text-muted-foreground">Don’t have an account? 
                                <Link href="./register" style={{ color: '#F9B421' }} className="ml-1 underline">Sign Up</Link>
                            </Label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
