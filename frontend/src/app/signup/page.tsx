"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm, UseFormRegisterReturn } from "react-hook-form";
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
  const [otp, setOtp] = useState<string>("");
  const [user, setUser] = useState<IAuthFormData | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<IAuthFormData>();
  const router = useRouter();
  const { authenticateUser } = useAuth();
  const { toastMessage } = useToastNotification();

  const onSubmit: SubmitHandler<IAuthFormData> = async (data) => {
    setUser(data);

    const response = await userSignUp(data);
    if (response.success) {
      toastMessage({
        message: response.message,
        type: "success",
      });
    }

    if (!response.success) {
      toastMessage({
        message: response.message,
        type: "error",
      });
      if (response.redirect) {
        router.push("/login");
      }
    }
  };

  const optResend = async () => {
    if (user) {
      const isEmailSent = await resendOtp(user);

      toastMessage({
        message: isEmailSent.message,
        type: isEmailSent.success ? "success" : "error",
      });
    }
  };

  const verifyOtpFunction = async () => {
    if (otp.length === 6 && user) {
      if (!isSubmitting) {
        const response = await verifyOtp({ ...user, otp });

        if (response.success) {
          authenticateUser(response.user);
          router.push("/");
          toastMessage({
            message: "SignUp Successfull",
            type: "success",
          });
        } else {
          toastMessage({
            message: response.message,
            type: "error",
          });
        }
      }
    }
  };
  return (
    <>
      <div className=" dark:bg-froground dark:text-background  h-screen  ">
        <div className="  h-full flex items-center justify-center dark:shadow-accent-foreground ">
          <div className=" max-xs:col-span-2  px-2  ">
            <div className="overflow-hidden border-[1px]  border-card-border/20 shadow-lg rounded-md p-4 max-sm:py-4 sm:p-8   max-w-[40rem]  flex items-center justify-center ">
              <AnimatePresence>
                {!isSubmitSuccessful && (
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
                    <h1 className="text-center text-text-heading text-xl sm:text-3xl font-semibold font-heading   ">
                      Create Your <span className="text-primary">BeatRoom</span>{" "}
                      Account
                    </h1>
                    <p className=" mt-1 text-text-muted font-body text-center text-[10px] sm:text-[14px] ">
                      Enter your username, email, and password to get started.
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
                            className="mt-1 text-black px-2 py-px rounded w-full border-[1px] border-card-border/20 focus:border-primary outline-none  h-8 "
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
                            className="mt-1 text-black px-2 py-px rounded w-full border-[1px] border-card-border/20 focus:border-primary outline-none  h-8 "
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
                          <div className="flex gap-1 items-center border-[1px] border-card-border/20 focus-within:border-primary px-2 rounded ">
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
                                    "6–10 chars, include A–Z, a–z, 0–9, and a special character",
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
                          <p className=" text-red-600  text-[8px] sm:text-xs ">
                            {errors.password?.message}
                          </p>
                        </div>
                        <Button
                          name={`${!isSubmitting ? "Submit" : "Sending OTP.........."}`}
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
              {isSubmitSuccessful && (
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
                    <div className=" text-black flex justify-end items-center mt-4 ">
                      <span className=" text-sm pr-1 ">
                        Don&apos;t Receive OTP?
                      </span>
                      <button
                        className=" underline cursor-pointer "
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          optResend();
                        }}
                      >
                        Resend
                      </button>
                    </div>

                    <Button
                      name={
                        !isSubmitting ? "Verify" : "Verifying OTP.........."
                      }
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
