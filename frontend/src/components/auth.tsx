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
import { Button } from "@/ui/button";
import { useToastNotification } from "@/context/toastNotificationContext";

type IInputSignUPForm = {
  username?: string;
  email: string;
  password: string;
};
type AuthType = "signup" | "login";

export function AuthPage({ type }: { type: AuthType }) {
  const [viewPassowrd, setViewPassword] = useState<boolean>(false);
  const [isForm, setIsForm] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [user, setUser] = useState<IInputSignUPForm | null>(null);
  const { register, handleSubmit } = useForm<IInputSignUPForm>();
  const router = useRouter();
  const { setCurrentUser, setAuthenticated } = useAuth();
  const { success, error } = useToastNotification();

  const onSubmit: SubmitHandler<IInputSignUPForm> = async (data) => {
    setUser(data);
    console.log(data);
    setLoading(true);
    const endpoint = type === "signup" ? "signup" : "login";

    await axios
      .post(`http://localhost:8080/api/v1/auth/${endpoint}`, data, {
        withCredentials: true,
      })
      .then((response) => {
        if (type === "signup") {
          success("OTP Send");
          setIsForm(false);
        }
        console.log(response);
        setLoading(false);

        if (type === "login") {
          console.log(response);
          if (response.status === 200) {
            const { username, userId, profile } = response.data;
            setCurrentUser({
              username,
              userId,
              profile,
            });
            success("Logged In");
            setAuthenticated(true);
            router.push(`/dashboard`);
          }
        }
      })
      .catch((e) => {
        const response = e.response;
        setLoading(false);
        if (response.status === 302) {
          router.push(response.data.redirect);
          error(response.data.message);
        } else {
          success(response.data.message);
        }
      });
  };

  return (
    <>
      <div className="  h-full flex items-center justify-center dark:shadow-accent-foreground ">
        <div className=" max-xs:col-span-2  px-12 ">
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
                    {type === "signup"
                      ? "Create an Account"
                      : "Login to Account"}
                  </h1>
                  <p className=" mt-1 text-text-muted font-body text-center text-[14px] ">
                    {type === "signup"
                      ? "Enter username, email, password to create BeatRoom account."
                      : "Enter email and password to login to your account."}
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-12  px-4 flex flex-col gap-4 ">
                      {type === "signup" && (
                        <div>
                          <label
                            htmlFor="username"
                            className="text-xl font-heading text-text-heading cursor-pointer "
                          >
                            Username
                          </label>
                          <input
                            className="mt-1 px-2 py-px rounded w-full border-[1px] border-card-border focus:border-primary outline-none  h-8 "
                            type="text"
                            id="username"
                            placeholder="Enter username "
                            {...register("username", { required: true })}
                          />
                        </div>
                      )}
                      <div>
                        <label
                          htmlFor="email"
                          className="text-xl font-heading text-text-heading cursor-pointer "
                        >
                          Email
                        </label>
                        <input
                          className="mt-1 px-2 py-px rounded w-full border-[1px] border-card-border focus:border-primary outline-none  h-8 "
                          type="text"
                          id="email"
                          placeholder="Enter email "
                          {...register("email", { required: true })}
                        />
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
                            className="mt-1  py-px rounded w-full outline-none  h-8 "
                            type={viewPassowrd ? "text" : "password"}
                            id="password"
                            placeholder="Enter password "
                            {...register("password", { required: true })}
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
                      </div>
                      {!loading ? (
                        <Button
                          name="Submit"
                          type="submit"
                          btnType="Primary"
                          onClick={() => { }}
                        />
                      ) : (
                        <Button
                          name={
                            type === "login"
                              ? "Logging........."
                              : "Sending OTP.........."
                          }
                          type="button"
                          btnType="Loading"
                          onClick={() => { }}
                        />
                      )}
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
                        className=" border-primary "
                      />
                      <InputOTPSlot
                        id="1"
                        index={1}
                        className=" border-primary "
                      />
                      <InputOTPSlot
                        id="2"
                        index={2}
                        className=" border-primary "
                      />
                      <InputOTPSlot
                        id="3"
                        index={3}
                        className=" border-primary "
                      />
                      <InputOTPSlot
                        id="4"
                        index={4}
                        className=" border-primary "
                      />
                      <InputOTPSlot
                        id="5"
                        index={5}
                        className=" border-primary "
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className=" flex justify-end items-center mt-2 ">
                  <span className=" text-sm pr-1 ">Don't Receive OTP?</span>
                  <button className=" underline cursor-pointer ">Resend</button>
                </div>
                {!loading ? (
                  <Button
                    name="Verify"
                    type="button"
                    btnType="Primary"
                    className=" w-full mt-4 "
                    onClick={async () => {
                      if (otp.length === 6 && user) {
                        // task 1 : call the API to verify the user
                        setLoading(true);
                        await axios
                          .post(
                            `http://localhost:8080/api/v1/auth/verify_otp_sigin`,
                            {
                              username: user.username,
                              password: user.password,
                              email: user.email,
                              otp,
                            },
                            { withCredentials: true }
                          )
                          .then((response) => {
                            const { username, userId, profile } = response.data;
                            setCurrentUser({
                              userId,
                              username,
                              profile,
                            });
                            setAuthenticated(true);
                            setLoading(false);
                            success("Logged In");
                            router.push(`/dashboard`);
                          })
                          .catch(() => {
                            setLoading(false);
                            error("Incorrect OTP");
                          });
                      }
                    }}
                  />
                ) : (
                  <Button
                    name="Verifying OTP.........."
                    btnType="Loading"
                    type="button"
                    className=" w-full mt-4 "
                    onClick={() => { }}
                  />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
