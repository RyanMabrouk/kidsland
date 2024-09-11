"use client";
import signInWithOAuth from "@/actions/auth/signInWithOAuth";
import FcGoogle from "@/components/icons/FcGoogle";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function LoginWithGoogle() {
  const { mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await signInWithOAuth({ provider: "google" });
      console.log(error);
      if (error) throw error;
      else console.log("Signed in with Google");
    },
  });
  return (
    <form
      className={
        "flex w-64 cursor-pointer items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-200 ease-in-out hover:border-gray-400 hover:bg-gray-100 hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-400 max-sm:w-full"
      }
      action={mutate}
    >
      <FcGoogle size={20} />
      <span className="text-sm">Login with Google</span>
    </form>
  );
}
