"use client";
import login from "@/actions/auth/login";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import useTranslation from "@/translation/useTranslation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { z } from "zod";

export default function LoginWithPassword() {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = React.useState<string>("");
  const { data: translation } = useTranslation();
  const loginSchema = z.object({
    email: z
      .string({
        message: translation?.lang["${ELEMENT} must be a string"].replace(
          "{ELEMENT}",
          "Email",
        ),
      })
      .email(translation?.lang["Invalid email address"]),
    password: z
      .string({
        message: translation?.lang["${ELEMENT} must be a string"].replace(
          "{ELEMENT}",
          "Password",
        ),
      })
      .min(6, translation?.lang["Password must be at least 6 characters"]),
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formObject: FormData) => {
      const data = Object.fromEntries(formObject) as {
        email: string;
        password: string;
      };

      try {
        loginSchema.parse(data);
        setErrors({});
      } catch (err) {
        setSuccessMessage("");
        if (err instanceof z.ZodError) {
          const errorObj: Record<string, string> = {};
          err.errors.forEach((e) => {
            if (e.path[0]) {
              errorObj[e.path[0] as string] = e.message;
            }
          });
          setErrors(errorObj);
        } else {
          setErrors({
            general: translation?.lang["An unexpected error occurred"] ?? "",
          });
        }
        throw err;
      }

      const email = formObject.get("email") as string;
      const password = formObject.get("password") as string;
      const { error } = await login({ email, password });

      if (error) {
        setErrors({ general: error.message });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      setSuccessMessage(translation?.lang["Login successful"] ?? "");
    },
  });

  return (
    <form className="w-full flex-1 space-y-6" action={mutate}>
      <h2 className="text-2xl font-bold text-gray-800">
        {translation?.lang["Login"]}
      </h2>
      <p className="text-gray-600">
        {
          translation?.lang[
            "If you have an account, log in with your email address."
          ]
        }
      </p>

      <Input
        name="email"
        label={translation?.lang["email"] ?? ""}
        type="email"
        required
        error={errors.email}
      />
      <Input
        name="password"
        label={translation?.lang["Password"] ?? ""}
        type="password"
        required
        error={errors.password}
      />

      {successMessage && (
        <p className="text-sm text-green-500">{successMessage}</p>
      )}

      {errors.general && (
        <p className="text-sm text-red-500">{errors.general}</p>
      )}

      <div className="flex items-center justify-between gap-4 max-sm:flex-col">
        <PrimaryButton className="max-sm:w-full" loading={isPending}>
          {translation?.lang["Sign In"]}
        </PrimaryButton>
        <Link
          href="/forget_password"
          className="text-sm text-blue-500 hover:underline"
        >
          {translation?.lang["Forgot your password?"]}
        </Link>
      </div>
    </form>
  );
}
