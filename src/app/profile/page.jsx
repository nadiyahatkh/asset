'use client'
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from 'zod';
import { fetchProfileAdminId, updateProfile } from '../apiService';
import { useSession } from 'next-auth/react';
import { Form, FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify'



const FormSchema = z.object({
    username: z.string().min(1, { message: "Nama karyawan is required." }),
    email: z.string().min(1, { message: "Email is required." }),
    password: z.string().min(1, { message: "Password wajib diisi." }),
    password_confirmation: z.string().min(1, { message: "Password wajib diisi." })
  });


export default function ProfilAdmin() {
    const [profileImage, setProfileImage] = useState();
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const form = useForm({
        resolver: zodResolver(FormSchema),
      });


    const onSubmit = async (data) => {
        console.log(data)
        try {
          const result = await updateProfile({ data, token });
          toast.success("Employee created successfully");
          form.reset();
          router.push('/dashboard');
        } catch (error) {
          toast.error("Failed to create employee.");
          console.error('Error creating employee:', error);
        }
      };

    useEffect(() => {
        const fetchData = async () => {
            if(token) {
                const response = await fetchProfileAdminId({ token });
                console.log(response)
                form.setValue('username', response.data.username)
                form.setValue('email', response.data.email)
                setProfileImage(response.data.foto);
            }
        };
        fetchData()
      }, [token, form])

      const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="py-4">
            <div className="w-full max-w-7xl mx-auto">
                <p className="title font-manrope font-bold text-2xl leading-10">Profile</p>
                <p className="title text-muted-foreground text-sm mb-5">Manage your account setting and set e-mail preferences</p>
                <hr className="mb-4" />
                <div className="flex items-start">
                    {/* Left Side - Profile Button */}
                    <div className="flex flex-col items-center">
                        <div className="profile">
                            Profile
                        </div>
                    </div>
                    
                    {/* Right Side - Change Profile Form */}
                    <div className="ml-5 w-full max-w-lg">
                        <p className="title font-manrope font-bold text-lg">Profile</p>
                        <p className="title text-muted-foreground text-sm mb-5">This is how others will see you on the site</p>
                        <hr className="mb-4" />
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <p className="font-bold text-sm mb-2">Profile Image</p>
                                    <div className="flex items-center">
                                    <img src={profileImage} name="foto" alt="Profile Image" className="w-12 h-12 rounded-full mr-4" />
                                        <input
                                            name="foto"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProfileImageChange}
                                            style={{ display: 'none' }}
                                            id="fileInput"
                                        />
                                            <button type="button" onClick={() => document.getElementById('fileInput').click()} className="px-4 py-2 font-semibold shadow-sm border rounded-md">Change</button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <Label className="block font-bold text-sm mb-2" htmlFor="username">Username</Label>
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <Input {...field} placeholder="username" type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                                        )}
                                        />
                                </div>
                                <div className="mb-4">
                                    <Label className="block font-bold text-sm mb-2">Email</Label>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <Input {...field} placeholder="name@example.com" type="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                                        )}
                                        />
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between items-center">
                                        <div className="w-full mr-2">
                                            <Label className="block font-bold text-sm mb-2" htmlFor="password">Password</Label>
                                            <div className="relative">
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <Input {...field} placeholder="" type={showPassword ? "text" : "password"} id="password" name="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                                                )}
                                                />
                                                    <button type='button' className="absolute top-0 right-0 mt-2 mr-3" onClick={togglePasswordVisibility}>
                                                        {showPassword ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                            </svg> 
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                            </div>
                                        </div>
                                        <div className="w-full ml-2">
                                            <Label className="block font-bold text-sm mb-2" htmlFor="confirmPassword">Confirm Password</Label>
                                                <FormField
                                                    control={form.control}
                                                    name="password_confirmation"
                                                    render={({ field }) => (
                                                        <Input {...field} placeholder="" type={showPassword ? "text" : "password"} id="password_confirmation" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                                                    )}
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" onClick={() => (console.log(form))} className="px-4 py-2 font-semibold rounded-lg" style={{ background: "#F9B421" }}>Save Profile</button>
                                </div>

                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
