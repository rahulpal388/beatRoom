"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../ui/input-otp";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { Button } from "@/ui/button";
import { useToastNotification } from "@/context/toastNotificationContext";
import { userSignUp } from "@/api/auth/userSignUp";
import { IAuthFormData } from "@/types/authType";
import { verifyOtp } from "@/api/auth/verifyOpt";
import { resendOtp } from "@/api/auth/resendOtp";
import Link from "next/link";

export default function SingUp() {
  const [viewPassowrd, setViewPassword] = useState<boolean>(false);
  const [isForm, setIsForm] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [user, setUser] = useState<IAuthFormData | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthFormData>();
  const router = useRouter();
  const { authenticateUser } = useAuth();
  const { toastMessage } = useToastNotification();

  const onSubmit: SubmitHandler<IAuthFormData> = async (data) => {
    setUser(data);
    setLoading(true);

    const response = await userSignUp(data);
    if (!response.success) {
      toastMessage({
        message: response.message,
        type: "error",
      });
      setLoading(false);
      if (response.redirect) {
        router.push("/login");
      }
      return;
    }

    if (response.success) {
      toastMessage({
        message: "Otp Send",
        type: "success",
      });
      setIsForm(false);
    }

    setLoading(false);
  };

  const optResend = async () => {
    if (user) {
      const isEmailSent = await resendOtp(user);

      if (isEmailSent) {
        toastMessage({
          message: "OTP Resend",
          type: "success",
        });
      }
    } else {
      toastMessage({
        message: "Error Sending OTP",
        type: "error",
      });
    }
  };

  const verifyOtpFunction = async () => {
    if (otp.length === 6 && user) {
      // task 1 : call the API to verify the user
      if (!loading) {
        setLoading(true);
        const response = await verifyOtp({ ...user, otp });

        if (response.success) {
          authenticateUser(response.user);
          router.push("/");
        } else {
          toastMessage({
            message: response.message,
            type: "error",
          });
          setLoading(false);
        }
      }
    }
  };
  return (
    <>
      <div className=" dark:bg-froground dark:text-background  h-screen ">
        <div className="  h-full flex items-center justify-center dark:shadow-accent-foreground ">
          <div className=" max-xs:col-span-2  px-12  ">
            <div className="overflow-hidden border-[1px]  border-card-border shadow-soft rounded p-4  w-[28rem]  flex items-center justify-center ">
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
                    <h1 className="text-center text-text-heading text-3xl font-semibold font-heading   ">
                      Create an Account
                    </h1>
                    <p className=" mt-1 text-text-muted font-body text-center text-[14px] ">
                      Enter username, email, password to create BeatRoom
                      account.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mt-4  px-4 flex flex-col gap-2 ">
                        <div>
                          <label
                            htmlFor="username"
                            className="text-xl font-heading text-text-heading cursor-pointer "
                          >
                            Username
                          </label>
                          <input
                            className="mt-1 text-black px-2 py-px rounded w-full border-[1px] border-card-border focus:border-primary outline-none  h-8 "
                            type="text"
                            id="username"
                            placeholder="Enter username "
                            {...register("username", {
                              required: "Username is require",
                              minLength: {
                                value: 3,
                                message: "Minimum 3 characters",
                              },
                              maxLength: {
                                value: 10,
                                message: "Minimum 10 characters",
                              },
                            })}
                          />
                          <p className="text-red-500 text-xs ">
                            {errors.username?.message}
                          </p>
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="text-xl font-heading text-text-heading cursor-pointer "
                          >
                            Email
                          </label>
                          <input
                            className="mt-1 text-black px-2 py-px rounded w-full border-[1px] border-card-border focus:border-primary outline-none  h-8 "
                            type="text"
                            id="email"
                            placeholder="Enter email "
                            {...register("email", {
                              required: "Email is required",
                            })}
                          />
                          <p className="text-red-500 text-xs">
                            {errors.email?.message}
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="text-xl font-heading text-text-heading cursor-pointer "
                          >
                            Password
                          </label>
                          <div className="flex gap-1 items-center border-[1px] border-card-border focus-within:border-primary px-2 rounded ">
                            <input
                              className="mt-1 text-black  py-px rounded w-full outline-none  h-8 "
                              type={viewPassowrd ? "text" : "password"}
                              id="password"
                              placeholder="Enter password "
                              {...register("password", {
                                required: "Password is require",
                                pattern: {
                                  value:
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,10}$/,
                                  message:
                                    "Password must be 6-10 characters and include uppercase, lowercase, number and special character",
                                },
                              })}
                            />
                            {viewPassowrd ? (
                              <Eye
                                className="cursor-pointer stroke-[1.5px] stroke-primary "
                                onClick={() => {
                                  setViewPassword((prev) => (prev = !prev));
                                }}
                              />
                            ) : (
                              <EyeOff
                                className="cursor-pointer stroke-[1.5px] stroke-primary "
                                onClick={() => {
                                  setViewPassword((prev) => (prev = !prev));
                                }}
                              />
                            )}
                          </div>
                          <p className=" text-red-600 text-xs ">
                            {errors.password?.message}
                          </p>
                        </div>
                        <Button
                          name={`${!loading ? "Submit" : "Sending OTP.........."}`}
                          type="submit"
                          btnType="Primary"
                        />
                        <div className="mt-2 text-black flex items-center justify-center  ">
                          <span>Already have account ? </span>
                          <Link href={"/login"} className=" underline  ">
                            Login
                          </Link>
                        </div>
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
                  <h1 className="text-center text-text-heading text-3xl font-semibold font-heading   ">
                    Enter the OTP
                  </h1>
                  <p className=" mt-1 text-center text-sm text-text-muted   ">
                    Enter the 6 digits OTP sent to your email to complete
                    verification.
                  </p>
                  <form onSubmit={handleSubmit(verifyOtpFunction)}>
                    <div className="flex gap-3 mt-10 justify-center ">
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => {
                          setOtp(value);
                        }}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot
                            id="0"
                            index={0}
                            autoFocus
                            className="  border-primary text-black "
                          />
                          <InputOTPSlot
                            id="1"
                            index={1}
                            className=" border-primary text-black "
                          />
                          <InputOTPSlot
                            id="2"
                            index={2}
                            className=" border-primary text-black "
                          />
                          <InputOTPSlot
                            id="3"
                            index={3}
                            className=" border-primary text-black "
                          />
                          <InputOTPSlot
                            id="4"
                            index={4}
                            className=" border-primary text-black "
                          />
                          <InputOTPSlot
                            id="5"
                            index={5}
                            className=" border-primary text-black "
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    <div className=" text-black flex justify-end items-center mt-2 ">
                      <span className=" text-sm pr-1 ">
                        Don&apos;t Receive OTP?
                      </span>
                      <button
                        className=" underline cursor-pointer "
                        onClick={optResend}
                      >
                        Resend
                      </button>
                    </div>

                    <Button
                      name={!loading ? "Verify" : "Verifying OTP.........."}
                      type="submit"
                      btnType="Primary"
                      className=" w-full mt-4 "
                    />
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
