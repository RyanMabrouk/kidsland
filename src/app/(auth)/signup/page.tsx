import SignupForm from "@/components/SignupForm";

import { Sign } from "crypto";

export default async function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignupForm />
    </div>
  );
}
