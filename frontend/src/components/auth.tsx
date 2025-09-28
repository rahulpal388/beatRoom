"use client"
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { motion, AnimatePresence } from "motion/react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import axios from "axios";
import { useRouter } from "next/navigation";


type IInputForm = {
    username: string,
    email: string,
    password: string
}


export function AuthPage() {
    const [viewPassowrd, setViewPassword] = useState<boolean>(false);
    const [isForm, setIsForm] = useState<boolean>(true);
    const [otp, setOtp] = useState<string>("");
    const [user, setUser] = useState<IInputForm | null>(null)
    const { register, handleSubmit } = useForm<IInputForm>();
    const router = useRouter()

    const onSubmit: SubmitHandler<IInputForm> = async (data) => {
        setUser(data);
        console.log(data)
        try {
            console.log("------------------------------------------")
            const response = await axios.post(`http://localhost:8080/api/v1/auth/signin`, data)
            console.log(response);
            setIsForm(false)
        } catch (error) {
            console.log(error)
        }
    }

    const onClick = async () => {

        window.location.href = "http://localhost:8080/api/v1/auth/signin/google"

    }

    return <>
        <div className=" grid grid-cols-2  h-full " >
            <div className="col-span-1 h-full bg-red-400 max-xs:hidden ">
                hello world
            </div>
            <div className="col-span-1 max-xs:col-span-2 flex items-center justify-center px-12 ">
                <div className="border overflow-hidden border-black  rounded p-4 min-w-60 max-w-96 h-[30rem] flex items-center justify-center ">
                    <AnimatePresence>
                        {isForm &&

                            <motion.div
                                initial={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    x: -300,
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut"
                                }}
                                className=" min-w-full "

                            >

                                <h1 className="text-center text-3xl font-bold text-neutral-800  ">Create an Account</h1>
                                <p className="text-center text-sm text-neutral-600 " >Enter username, email, password to create BeatRoom account.</p>
                                <div className=" mt-4 ">
                                    <button className="cursor-pointer bg-green-800 text-black px-6 py-2 rounded-lg  "
                                        onClick={onClick}
                                    >Google</button>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="mt-10  px-4 flex flex-col gap-4 ">
                                        <div >
                                            <label htmlFor="username" className="text-lg font-medium " >Username</label>
                                            <input className="px-2 py-px rounded w-full border border-black outline-blue-900 h-8 " type="text" id="username" placeholder="Enter username "  {...register("username", { required: true })} />
                                        </div>
                                        <div >
                                            <label htmlFor="email" className="text-lg font-medium " >email</label>
                                            <input className="px-2 py-px rounded w-full border border-black outline-blue-900 h-8 " type="text" id="email" placeholder="Enter email " {...register("email", { required: true })} />
                                        </div>
                                        <div >

                                            <label htmlFor="password" className="text-lg font-medium " >password</label>
                                            <div className="flex gap-1 items-center border border-black px-2 rounded ">

                                                <input className=" py-px rounded w-full  outline-none h-8 " type={viewPassowrd ? "text" : "password"} id="password" placeholder="Enter password "{...register("password", { required: true })} />
                                                {viewPassowrd ?
                                                    <Eye className="cursor-pointer stroke-[1.5px] "
                                                        onClick={() => {
                                                            setViewPassword(prev => prev = !prev);
                                                        }}
                                                    />
                                                    :
                                                    <EyeOff className="cursor-pointer stroke-[1.5px] "
                                                        onClick={() => {
                                                            setViewPassword(prev => prev = !prev);
                                                        }}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <button type="submit" className=" bg-green-600 rounded py-1 text-white cursor-pointer  "  >Submit</button>

                                    </div>

                                </form>

                            </motion.div>
                        }
                    </AnimatePresence>


                    {!isForm &&
                        <motion.div

                            initial={{
                                x: 300,
                                opacity: 0

                            }}

                            animate={{
                                x: 0,
                                opacity: 1
                            }}

                            transition={{
                                duration: 1,
                                ease: "easeInOut"
                            }}
                        >
                            <h1 className="text-center text-2xl font-bold text-neutral-8001 ">Enter the OTP</h1>
                            <p className="text-center text-sm text-neutral-700 font-medium  ">Enter the 6 digits OTP sent to your email to complete verification.</p>
                            <div className="flex gap-3 mt-10 justify-center ">
                                <InputOTP
                                    maxLength={6}
                                    value={otp}
                                    onChange={(value) => {
                                        setOtp(value);
                                    }}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot id="0" index={0} />
                                        <InputOTPSlot id="1" index={1} />
                                        <InputOTPSlot id="2" index={2} />
                                        <InputOTPSlot id="3" index={3} />
                                        <InputOTPSlot id="4" index={4} />
                                        <InputOTPSlot id="5" index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            <p className="mt-4">Timing : 1:50</p>
                            <button className="mt-6 w-full bg-green-600 rounded py-1 text-white cursor-pointer  "
                                onClick={async () => {
                                    if (otp.length === 6 && user) {
                                        // task 1 : call the API to verify the user
                                        const response = await axios.post(`http://localhost:8080/api/v1/auth/verify_otp_sigin`, {
                                            email: user.email,
                                            username: user.username,
                                            password: user.password,
                                            otp
                                        })
                                        console.log(response.data)
                                        if (response.status === 200) {
                                            localStorage.setItem("token", response.data.token)
                                            router.push(`/dashboard/${response.data.userId}`)
                                        }

                                    }
                                }}
                            >Verify otp</button>
                        </motion.div>
                    }
                </div>
            </div>
        </div>

    </>

}



