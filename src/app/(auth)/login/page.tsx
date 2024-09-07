import LoginForm from "@/components/LoginForm";
import React from "react";

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="absolute inset-0 bg-black/5"></div>

      {/* Content */}
      <div className="z-10 w-full">
        <LoginForm />
      </div>
    </div>
  );
}
