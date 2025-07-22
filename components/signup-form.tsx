"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import API from "@/API"
import { SignupFormData } from "@/types"
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export function 
SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState,
    watch
  } = useForm<SignupFormData>();

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    const res = await API.signup(data.name, data.email, data.password);
    if (res.status === "success") {
      router.push("/login");
    } else {
      toast.error(res.message)
    }
  };

  const password = watch("password")

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Signup for a new account</CardTitle>
          <CardDescription>
            Enter your details below to signup for an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                   }
                   })}
                />
                {formState.errors.email && (
                <p className="pl-3 text-danger text-sm">{formState.errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                {formState.errors.name && (
                <p className="pl-3 text-danger text-sm">{formState.errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" {...register("password", { required: "Password is required" })} />
                {formState.errors.password && (
                  <p className="pl-3 text-danger text-sm">{formState.errors.password.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm password</Label>
                </div>
                <Input id="confirm password" type="password" {...register("confirmPassword", { required: "Confirm password is required", validate: (value) => value === password || "Passwords do not match"})} />
                {formState.errors.confirmPassword && (
                  <p className="pl-3 text-danger text-sm">{formState.errors.confirmPassword.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer">
                  {formState.isSubmitting ? <LoaderCircle className="animate-spin" />: null}
                  Signup
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
