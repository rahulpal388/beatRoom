"use client"
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { motion, AnimatePresence } from "motion/react"


type IInputForm = {
    username: string,
    email: string,
    password: string
}


export function AuthPage() {
    const [viewPassowrd, setViewPassword] = useState<boolean>(false);
    const [isForm, setIsForm] = useState<boolean>(true);
    const { register, handleSubmit } = useForm<IInputForm>();

    const onSubmit: SubmitHandler<IInputForm> = (data) => {
        console.log(data)
        setIsForm(false)
    }

    return <>
        <div className=" grid grid-cols-2  h-full " >
            <div className="col-span-1 h-full bg-red-400 max-xs:hidden ">
                hello world
            </div>
            <div className="col-span-1 max-xs:col-span-2 flex items-center justify-center px-12 ">
                <div className="border  border-black rounded p-4 min-w-60 ">
                    {isForm ?
                        <AnimatePresence>

                            <motion.div
                                initial={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    x: -120,
                                    opacity: 0,
                                }}

                            >

                                <h1 className="text-center text-3xl font-bold text-neutral-800  ">Create an Account</h1>
                                <p className="text-center text-sm text-neutral-600 " >Enter username, email, password to create BeatRoom account.</p>

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
                        </AnimatePresence>
                        :
                        <div >
                            <h1 className="text-center text-2xl font-bold text-neutral-8001 ">Enter the OTP</h1>
                            <p className="text-center text-sm text-neutral-700 font-medium  ">Enter the 6 digits OTP sent to your email to complete verification.</p>
                            <div className="flex gap-3 mt-10 justify-center ">
                                <div className="border border-black rounded p-2 w-8 h-10"></div>
                                <div className="border border-black rounded p-2 w-8 h-10"></div>
                                <div className="border border-black rounded p-2 w-8 h-10"></div>
                                <div className="border border-black rounded p-2 w-8 h-10"></div>
                                <div className="border border-black rounded p-2 w-8 h-10"></div>
                            </div>
                            <p className="mt-4">Timing : 1:50</p>
                            <button className="mt-6 w-full bg-green-600 rounded py-1 text-white cursor-pointer  "
                                onClick={() => {
                                    setIsForm(true)
                                }}
                            >Verify otp</button>
                        </div>
                    }
                </div>
            </div>
        </div>

    </>

}



