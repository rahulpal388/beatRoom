"use client";
import { Eye, EyeOff } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/authContext";

type IInputSignUPForm = {
  username?: string;
  email: string;
  password: string;
};
type AuthType = "signup" | "login";

export function AuthPage({ type }: { type: AuthType }) {
  const [viewPassowrd, setViewPassword] = useState<boolean>(false);
  const [isForm, setIsForm] = useState<boolean>(true);
  const [otp, setOtp] = useState<string>("");
  const [user, setUser] = useState<IInputSignUPForm | null>(null);
  const { register, handleSubmit } = useForm<IInputSignUPForm>();
  const router = useRouter();
  const { setCurrentUser, setAuthenticated } = useAuth();

  const onSubmit: SubmitHandler<IInputSignUPForm> = async (data) => {
    setUser(data);
    console.log(data);

    const endpoint = type === "signup" ? "signup" : "login";

    await axios
      .post(`http://localhost:8080/api/v1/auth/${endpoint}`, data, {
        withCredentials: true,
      })
      .then((response) => {
        if (type === "signup") {
          setIsForm(false);
        }
        console.log(response);
        if (type === "login") {
          if (response.status === 200) {
            const { username, userId, profile } = response.data;
            setCurrentUser({
              username,
              userId,
              profile,
            });
            setAuthenticated(true);
            router.push(`/dashboard/${response.data.userId}`);
          }
        }
      })
      .catch((error) => {
        const response = error.response;
        if (response.status === 302) {
          router.push(response.data.redirect);
        }
      });
  };

  const onClick = async () => {
    window.location.href = "http://localhost:8080/api/v1/auth/signin/google";
  };

  return (
    <>
      <div className="  h-full flex items-center justify-center dark:shadow-accent-foreground ">
        <div className=" max-xs:col-span-2  px-12 ">
          <div className="border overflow-hidden border-black dark:bg-accent-foreground/40 rounded p-4 min-w-60 max-w-96  flex items-center justify-center ">
            <AnimatePresence>
              {isForm && (
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
                    ease: "easeInOut",
                  }}
                  className=" min-w-full "
                >
                  <h1 className="text-center text-3xl font-bold dark:text-accent  ">
                    {type === "signup"
                      ? "Create an Account"
                      : "Login to Account"}
                  </h1>
                  <p className="text-center text-sm dark:text-accent/70 ">
                    {type === "signup"
                      ? "Enter username, email, password to create BeatRoom account."
                      : "Enter email and password to login to your account."}
                  </p>
                  <div className=" mt-4 flex w-full flex-col gap-4 justify-center items-center ">
                    <a
                      href="http://localhost:8080/api/v1/auth/signin/google"
                      className="cursor-pointer  text-black px-6 py-px rounded-lg bg-background  flex justify-center items-center "
                    >
                      <Image
                        src="/google.png"
                        alt="image"
                        height={50}
                        width={50}
                        className=" rounded p-2  "
                      />
                    </a>
                    <p className=" font-bold ">OR</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4  px-4 flex flex-col gap-4 ">
                      {type === "signup" && (
                        <div>
                          <label
                            htmlFor="username"
                            className="text-lg font-medium "
                          >
                            Username
                          </label>
                          <input
                            className="px-2 py-px rounded w-full border dark:border-background outline-none  h-8 "
                            type="text"
                            id="username"
                            placeholder="Enter username "
                            {...register("username", { required: true })}
                          />
                        </div>
                      )}
                      <div>
                        <label htmlFor="email" className="text-lg font-medium ">
                          Email
                        </label>
                        <input
                          className="px-2 py-px rounded w-full border dark:border-background outline-none  h-8 "
                          type="text"
                          id="email"
                          placeholder="Enter email "
                          {...register("email", { required: true })}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="text-lg font-medium "
                        >
                          Password
                        </label>
                        <div className="flex gap-1 items-center border  border-background px-2 rounded ">
                          <input
                            className=" py-px rounded w-full  outline-none h-8 "
                            type={viewPassowrd ? "text" : "password"}
                            id="password"
                            placeholder="Enter password "
                            {...register("password", { required: true })}
                          />
                          {viewPassowrd ? (
                            <Eye
                              className="cursor-pointer stroke-[1.5px] "
                              onClick={() => {
                                setViewPassword((prev) => (prev = !prev));
                              }}
                            />
                          ) : (
                            <EyeOff
                              className="cursor-pointer stroke-[1.5px] "
                              onClick={() => {
                                setViewPassword((prev) => (prev = !prev));
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className=" bg-green-600 rounded py-1 text-white cursor-pointer  "
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {!isForm && (
              <motion.div
                initial={{
                  x: 300,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
              >
                <h1 className="text-center text-2xl font-bold text-neutral-8001 ">
                  Enter the OTP
                </h1>
                <p className="text-center text-sm text-neutral-700 font-medium  ">
                  Enter the 6 digits OTP sent to your email to complete
                  verification.
                </p>
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
                <button
                  className="mt-6 w-full bg-green-600 rounded py-1 text-white cursor-pointer  "
                  onClick={async () => {
                    if (otp.length === 6 && user) {
                      // task 1 : call the API to verify the user
                      const response = await axios.post(
                        `http://localhost:8080/api/v1/auth/verify_otp_sigin`,
                        {
                          username: user.username,
                          password: user.password,
                          email: user.email,
                          otp,
                        },
                        { withCredentials: true }
                      );
                      console.log(response);
                      if (response.status === 200) {
                        const { username, userId, profile } = response.data;
                        setCurrentUser({
                          userId,
                          username,
                          profile,
                        });
                        setAuthenticated(true);
                        router.push(`/dashboard/${response.data.userId}`);
                      }
                    }
                  }}
                >
                  Verify otp
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
