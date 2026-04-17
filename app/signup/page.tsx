'use client';
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldDescription,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUpSchema, signUpSchemaType } from "@/lib/validator/schema_validator/sign-up.schema";
import { useSignUp } from "@clerk/nextjs/legacy";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const page = () => {
  const [verifying, setVerifying] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [resendInterval, setResendInterval] = useState<number>(0);
  const [authError, setAuthError] = useState<string|null>(null);
  const [verificationError, setVerificationError] = useState<string|null>(null);
  const [code, setCode] = useState<string>("");
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: signUpSchemaType) => {
    if(!isLoaded) return;
    setAuthError(null);
    try {
      await signUp.create({emailAddress: data.email, password: data.password});
      await signUp.prepareEmailAddressVerification({strategy: "email_code"});
      setVerifying(true);
    } catch (err: any) {
      setAuthError(err.errors?.[0]?.longMessage ?? `Unknown error occured: ${err}`);
    }
  }

  const handleVerification = async () => {
    if(!isLoaded) return;
    setVerificationError(null);
    setIsVerifying(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({code: code});
      if(result.status === "complete") {
        await setActive({session: result.createdSessionId});
        await toast.promise(
          fetch("/api/user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: signUp.emailAddress})
          }).then(async res => {
            const body = await res.json();
            if(!res.ok) throw new Error(body.message);
            return body.message;
          }),
          {
            loading: "Setting up your account...",
            success: data => data,
            error: (err: Error) => err.message ?? "Failed to sync account. You can retry sync on your next login"
          }
        );
        router.push("/home");
      } else {
        setVerificationError("Verification failed. Please try again");
      }
    } catch (err: any) {
      setVerificationError(err.errors?.[0]?.longMessage ?? `Unknown error occurred: ${err}`);
    } finally {
      setIsVerifying(false);
    }
  }

  const handleResend = async () => {
    if(!isLoaded || resendInterval > 0) return;
    setVerificationError(null);
    try {
      setResendInterval(60);
      await signUp?.prepareEmailAddressVerification({strategy: "email_code"});
      const interval = setInterval(() => {
        setResendInterval(prev => {
          if(prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      setVerificationError(err.errors?.[0]?.longMessage ?? `Unknown error occured: ${err}`);
    }
  }

  if(verifying) {
    return (
      <div
        className="flex flex-col justify-center items-center w-full min-h-dvh p-10 max-sm:p-6"
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verification</CardTitle>
            <CardDescription>We have sent a 6-digit code to your email address.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="code">Verification Code</FieldLabel>
                <Input
                  id="code"
                  maxLength={6}
                  placeholder="Enter your 6-digit code."
                  required
                  value={code ?? ""}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Field>
              {verificationError && 
              <Field>
                <p className="text-sm text-destructive text-left">{verificationError}</p>
              </Field>}
              <Field>
                <Button
                  type="button"
                  variant="default"
                  className="w-full p-4"
                  disabled={isVerifying}
                  onClick={handleVerification}
                >
                  {isVerifying? "Verifying...":"Verify"}
                </Button>
                <FieldDescription className="text-sm text-muted-foreground text-center">
                  Didn't recive code?{" "}
                  {resendInterval > 0 ? (
                    <span>{`00:${String(resendInterval).padStart(2,"0")}`}</span>
                  ):(
                    <a 
                      onClick={handleResend}
                      className="cursor-pointer hover:text-foreground hover:underline underline-offset-1"
                    >
                      resend
                    </a>
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
        className='flex flex-col justify-center items-center w-full min-h-dvh'
    >
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>Enter your details to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} id="signupform">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      {...register("email")}
                    />
                    {errors.email && <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      required
                      {...register("password")}
                    />
                    {errors.password && <p className="text-sm text-destructive">
                      {errors.password.message}
                    </p>}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="passwordConfirm">Confirm Password</FieldLabel>
                    <Input
                      id="passwordConfirm"
                      type="password"
                      placeholder="********"
                      required
                      {...register("passwordConfirm")}
                    />
                    {errors.passwordConfirm && <p className="text-sm text-destructive">
                      {errors.passwordConfirm.message}
                    </p>}
                  </Field>
                  {authError && 
                  <Field>
                    <p className="text-sm text-destructive text-left">
                      {authError}
                    </p>
                  </Field>}
                  <Field>
                    <div id="clerk-captcha" 
                      data-cl-theme="dark" 
                      data-cl-size="flexible" 
                      data-cl-language="en-us" 
                    />
                    <Button
                      type="submit"
                      form="signupform"
                      variant="default"
                      disabled={isSubmitting}
                      className="p-4 w-full"
                    >
                      {isSubmitting ? "Creating Account...":"Sign Up"}
                    </Button>
                    <FieldDescription className="text-sm text-center text-muted-foreground">
                      Already have an account?{" "}
                      <a href="/login">Sing In</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default page