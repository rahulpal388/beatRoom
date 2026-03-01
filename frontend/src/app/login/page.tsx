"use client";
import { loginUser } from "@/api/auth/loginUser";
import { useAuth } from "@/context/authContext";
import { useToastNotification } from "@/context/toastNotificationContext";
import { ILoginData } from "@/types/authType";
import { Button } from "@/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();
  const router = useRouter();
  const { isAuthenticated, authenticateUser } = useAuth();
  const { toastMessage } = useToastNotification();

  const onSubmit: SubmitHandler<ILoginData> = async (data) => {
    setLoading(true);
    const response = await loginUser(data);

    if (response.success) {
      toastMessage({
        message: response.message,
        type: "success",
      });
      authenticateUser(response.user!);
      router.push("/");
    } else {
      toastMessage({
        message: response.message,
        type: "error",
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/`);
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return <div>Redirecting.........</div>;
  }

  return (
    <>
      <div className="  h-screen flex items-center justify-center dark:shadow-accent-foreground ">
        <div className=" max-xs:col-span-2  px-12 ">
          <div className="overflow-hidden border-[1px]  border-card-border shadow-soft rounded p-4  w-[28rem]  flex items-center justify-center ">
            <div className=" min-w-full ">
              <h1 className="text-center text-text-heading text-3xl font-semibold font-heading   ">
                Login to Account
              </h1>
              <p className=" mt-1 text-text-muted font-body text-center text-[14px] ">
                Enter email and password to login to your account.
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4  px-4 flex flex-col gap-2 ">
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
                        type={viewPassword ? "text" : "password"}
                        id="password"
                        placeholder="Enter password "
                        {...register("password", { required: true })}
                      />
                      {viewPassword ? (
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
                    name={loading ? "Verifying......" : "Login"}
                    type="submit"
                    btnType="Primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
