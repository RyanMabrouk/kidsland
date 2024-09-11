import { Sign } from "crypto";
import SignupForm from "./components/SignupForm";
import getSession from "@/api/getSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const { session } = await getSession();

  if (session) redirect("/home");
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignupForm />
    </div>
  );
}
