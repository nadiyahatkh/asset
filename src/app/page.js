'use client'
import { useRouter } from "next/navigation";
import User from "./user/page";
import { useSession } from "next-auth/react";
import { useEffect } from "react";



export default function Home(){

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/sign-in');
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return(
    <User />
  )
}