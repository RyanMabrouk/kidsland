import { Sign } from "crypto";
import SignupForm from "./components/SignupForm";

export default async function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignupForm />
    </div>
  );
}
