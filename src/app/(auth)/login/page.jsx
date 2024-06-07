'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


export default function LoginPage(){
    return(
        <div className="flex justify-between">
            <div>
                <img src="./maskgroup.png" alt="" />
            </div>
            <form action="">
                <Input placeholder="name@example.com"/>
                <Input type="password" id="password" placeholder="*****"/>
                <Button className="bg-yellow-300 text-gray-500">SignIn</Button>
            </form>
        </div>
    )
}