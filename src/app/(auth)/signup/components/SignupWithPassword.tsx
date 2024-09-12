"use client";
import signUp from "@/actions/auth/signup";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryLink from "@/components/SecondaryLink";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";

const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string(),
    policies: z.boolean().refine((val) => val, {
      message: "You must agree to the terms and policies",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords must match",
    path: ["confirm"],
  });

export default function SignupWithPassword() {
  const router = useRouter();
  const [errors, setErrors] = React.useState<string[]>([]);
  const [successMessage, setSuccessMessage] = React.useState<string>("");
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const formObject = Object.fromEntries(formData) as {
        email: string;
        password: string;
        confirm: string;
        policies: string;
      };

      const policies = formObject.policies === "on";

      // Create an object with the converted policies
      const data = {
        email: formObject.email,
        password: formObject.password,
        confirm: formObject.confirm,
        policies,
      };

      // Validate data with Zod
      try {
        schema.parse(data);
        setErrors([]); // Clear errors if validation is successful
      } catch (err) {
        setSuccessMessage("");
        if (err instanceof z.ZodError) {
          // Set the errors from Zod validation
          setErrors(err.errors.map((e) => e.message));
        } else {
          setErrors(["An unexpected error occurred"]);
        }
        throw err; // rethrow the error to stop further processing
      }

      // Proceed with signup if validation passes
      const { email, password } = data;
      const { error } = await signUp({ email, password });
      if (error?.message) {
        setErrors([error.message]);
        throw error;
      }
    },
    onSuccess: () => {
      setSuccessMessage("An email has been sent to confirm your account...");
    },
  });

  return (
    <form className="flex-1 space-y-6" action={mutate}>
      <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>

      <Input
        name="email"
        label="Email"
        type="email"
        required
        placeholder="Enter Your Email"
      />
      <Input
        name="password"
        label="Password"
        type="password"
        required
        placeholder="Enter Password"
      />
      <Input
        name="confirm"
        label="Confirm Password"
        type="password"
        required
        placeholder="Confirm Password"
      />

      <div className="flex items-center space-x-4">
        <input name="policies" type="checkbox" id="terms" required />
        <label htmlFor="terms" className="text-sm text-gray-600">
          By marking this field, you agree with the{" "}
          <a href="/terms" className="text-blue-500 hover:underline">
            terms of use
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>{" "}
          of this online store.
        </label>
      </div>
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>
      )}
      {successMessage && (
        <p className="text-sm text-green-500">{successMessage}</p>
      )}
      <div className="flex justify-between gap-4 max-sm:flex-col">
        <PrimaryButton className="max-sm:w-full" loading={isPending}>
          Sign Up
        </PrimaryButton>
        <SecondaryLink href={"/login"} className="max-sm:w-full">
          You have an account
        </SecondaryLink>
      </div>
    </form>
  );
}
