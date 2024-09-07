import Image from "next/image";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import PrimaryLink from "./PrimaryLink";
import Link from "next/link";
import SecondaryButton from "./SecondaryButton";

export default function LoginForm() {
  return (
    <div className="mx-auto flex h-fit w-full max-w-[75rem] flex-col rounded-lg border bg-white p-10 shadow-lg max-sm:h-full max-sm:justify-center">
      {/* Banner Section */}

      <div className="relative mb-8 h-64 w-full max-lg:h-40 max-sm:hidden max-sm:h-28">
        <Image
          src="/bgBanner.jpg"
          alt="Login Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />

        <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-black bg-opacity-25">
          <h1 className="text-shadow text-3xl font-bold text-white max-sm:text-2xl">
            Join Us and Explore!
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        <form className="w-full flex-1 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <p className="text-gray-600">
            If you have an account, log in with your email address.
          </p>
          <Input label="Your email" type="email" required />
          <Input label="Password" type="password" required />
          <div className="flex items-center justify-between gap-4 max-sm:flex-col">
            <PrimaryButton className="max-sm:w-full">Login</PrimaryButton>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
        <div className="hidden lg:block lg:w-px lg:bg-gray-200" />
        <hr className="hidden max-lg:block" />
        <div className="flex-1 space-y-4 text-center lg:w-1/2 lg:text-left">
          <h2 className="text-2xl font-semibold text-gray-800">New Users</h2>
          <p className="text-gray-600">
            Create an account to shop faster, manage multiple addresses, and
            much more.
          </p>
          <div>
            <Link href="/signup">
              <SecondaryButton className="">Create an account</SecondaryButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
