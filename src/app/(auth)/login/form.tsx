"use client";
import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import PasswordInput from "../ui/PasswordInput";
import TextInput from "../ui/TextInput";
import { useMutation } from "@tanstack/react-query";
import login from "@/actions/auth/login";

export default function Form() {
  const { mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      const payload = {
        email: String(formData.get("Email")),
        password: String(formData.get("Password")),
      };
      const { error } = await login(payload);
      if (error) throw new Error(error.message);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-x-hidden scroll-smooth bg-slate-100">
      <form
        className="flex w-fit min-w-[25rem] flex-col items-center justify-center gap-4 rounded-lg border bg-white px-6 py-8"
        action={mutate}
      >
        <TextInput name="Email" label="Email" />
        <PasswordInput name="Password" label="Password" />
        <div className="mt-10 flex w-full flex-row items-center justify-between">
          <Link href="/" className="text-blue-500">
            <Button type="button">Cancel</Button>
          </Link>
          <Button type="submit" variant="contained" className="capitalize">
            login
          </Button>
        </div>
      </form>
    </div>
  );
}
