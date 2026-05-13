'use client'
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
  FieldLabel,
  FieldDescription
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs/legacy";
import { signInSchema, signInSchemaType } from "@/lib/validator/schema_validator/sign-in.schema";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserItem } from "@/lib/types";

const page = () => {
  const [authError, setAuthError] = useState<string|null>(null);
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async(data: signInSchemaType) => {
    if(!isLoaded) return;
    setAuthError(null);
    try {
      const result = await signIn.create({identifier: data.identifier, password: data.password});
      if(result.status === "complete") {
        await setActive({session: result.createdSessionId});
        const res = await fetch("/api/user");
        if(res.status === 404) {
          toast.warning("User not synced.");
          await toast.promise(
            fetch("/api/user", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({email: data.identifier})
            }).then(async res => {
              const body = await res.json();
              if(!res.ok) throw new Error(body.message);
              return body.message;
            }),
            {
              loading: "Syncing now...",
              success: data => data,
              error: (err: Error) => err.message ?? "Failed to sync account. You can retry sync on your next login"
            }
          );
        }
        
      } else {
        setAuthError(`Status: ${result.status}`);
        // setAuthError("Authentication failed. Please try again.");
      }
    } catch (err: any) {
      setAuthError(err.errors?.[0]?.longMessage ?? `Unknown error occurred: ${err}`);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-dvh p-10 max-sm:p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} id="loginform">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("identifier")}
                />
                {errors.identifier && <p className="text-sm text-destructive">
                  {errors.identifier.message}
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
              {authError && <Field>
                <p className="text-sm text-destructive text-left">
                  {authError}
                </p>
              </Field>}
              <Field>
                <Button
                  type="submit"
                  form="loginform"
                  variant="default"
                  disabled={isSubmitting}
                  className="p-4 w-full"
                >
                  {isSubmitting? "Authenticating...":"Login"}
                </Button>
                <FieldDescription className="text-sm text-muted-foreground text-center">
                  Already have an account?{" "}
                  <a href="/signup">Sign Up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default page;