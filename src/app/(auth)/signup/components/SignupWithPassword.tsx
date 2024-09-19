"use client";
import signUp from "@/actions/auth/signup";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryLink from "@/components/SecondaryLink";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";

// Zod schema for validation
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
  const [fieldErrors, setFieldErrors] = React.useState({
    email: "",
    password: "",
    confirm: "",
    policies: "",
  });
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

      const data = {
        email: formObject.email,
        password: formObject.password,
        confirm: formObject.confirm,
        policies,
      };

      // Validate data with Zod
      try {
        schema.parse(data);
        setFieldErrors({
          email: "",
          password: "",
          confirm: "",
          policies: "",
        });
      } catch (err) {
        setSuccessMessage("");
        if (err instanceof z.ZodError) {
          const errors = {
            email: "",
            password: "",
            confirm: "",
            policies: "",
          };

          // Map each error to the corresponding field
          err.errors.forEach((e) => {
            errors[e.path[0] as keyof typeof errors] = e.message;
          });
          setFieldErrors(errors);
        } else {
          setFieldErrors({
            email: "",
            password: "",
            confirm: "",
            policies: "An unexpected error occurred",
          });
        }
        throw err;
      }

      // Proceed with signup if validation passes
      const { email, password } = data;
      const { error } = await signUp({ email, password });
      if (error?.message) {
        setFieldErrors({
          ...fieldErrors,
          email: error.message,
        });
        throw error;
      }

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
        error={fieldErrors.email} // Pass email error
      />
      <Input
        name="password"
        label="Password"
        type="password"
        required
        placeholder="Enter Password"
        error={fieldErrors.password} // Pass password error
      />
      <Input
        name="confirm"
        label="Confirm Password"
        type="password"
        required
        placeholder="Confirm Password"
        error={fieldErrors.confirm} // Pass confirm password error
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
      {fieldErrors.policies && (
        <p className="text-sm text-red-500">{fieldErrors.policies}</p>
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
