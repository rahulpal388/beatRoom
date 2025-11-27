"use client"
import { AuthPage } from "@/components/auth";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function Login() {
    const { isAuthenticated, currentUser } = useAuth();
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated) {
            router.push(`dashboard/${currentUser?.userId}`)
        }
    }, [isAuthenticated])

    if (isAuthenticated) {
        return <div>Redirecting.........</div>
    }


    return <>

        <div className=" dark:bg-froground dark:text-background  h-screen ">
            <AuthPage type="login" />
        </div>

    </>

}
