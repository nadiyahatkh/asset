'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { getSession, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

export default function LoginPage() {
  const router = useRouter();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Clear previous error
    setError("");
    
    // Validate fields
    if (!value.email || !value.password) {
      setError("Email and password are required");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: value.email,
        password: value.password,
      });

      if (res && !res.error) {
        const session = await getSession();
        const userRole = session?.user?.role;
        const redirectUrl = +userRole === 1 ? '/dashboard' : '/';
        router.push(redirectUrl);
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log('Handle login error:', error);
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role === 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    }
  }, [status, session, router]);

  return (
    <div className="w-full h-screen flex">
      <div className="relative w-1/2 h-full">
        <img src="./maskgroup.png" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="w-1/2 h-full flex flex-col justify-center p-20">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-5 text-center">
            <Label className="text-2xl font-semibold mb-4 block">Sign In</Label>
          </div>
          <form className="space-y-2" onSubmit={handleLogin}>
            {error && <div className="text-red-600 text-center mb-4">{error}</div>}
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
              <Button
                style={{ backgroundColor: '#F9B421' }}
                className="text-gray-800 w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                    <TailSpin
                    height="20"
                    width="20"
                    color="#ffffff"
                    ariaLabel="loading"
                    />
                ) : (
                    "Sign In"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
