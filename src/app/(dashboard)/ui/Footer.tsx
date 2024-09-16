import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { menuItems } from "../home/constants/menuItems";
import Link from "next/link";

export default function Footer() {
  const kidsLandLinks = ["About Us", "Contact Us", "Privacy Policy"];
  return (
    <footer className="flex flex-row items-start justify-center gap-[3rem] bg-gray-100 px-[2rem] pb-12 pt-10">
      <Image
        src="/logo/logo-2.png"
        alt="logo"
        width={100}
        height={100}
        className="py-3"
      />
      <div className="flex flex-col items-center gap-2">
        <div className="mb-2 text-xl font-bold">Categories</div>
        {menuItems
          .find((e) => e.title === "Toys")
          ?.subItems?.map((category, i) => (
            <Link
              href={`/products?${category.filter}`}
              className="cursor-pointer leading-6 transition-all ease-linear hover:font-medium hover:text-slate-500 hover:underline"
              key={i}
            >
              {category.title}
            </Link>
          ))}
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="mb-2 text-xl font-bold">KidsLand</div>
        {kidsLandLinks.map((link, i) => (
          <div
            className="cursor-pointer leading-6 transition-all ease-linear hover:font-medium hover:text-slate-500 hover:underline"
            key={i}
          >
            {link}
          </div>
        ))}
      </div>
      <div className="-mr-[5rem] flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="text-xl font-bold">Follow Us</div>
          <div className="flex flex-row gap-2 [&>*]:size-[1.5rem] [&>*]:cursor-pointer">
            <FaFacebook />
            <FaInstagram />
            <MdEmail />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="w-[70%] text-center">
            Sign up for our newsletter and always be the first to find out about
            all current offers and news!
          </span>
          <form className="flex flex-row items-center justify-center">
            <input
              className="h-[2.5rem] rounded-l-sm border border-slate-500 border-r-transparent px-3 py-2 text-sm font-semibold capitalize text-slate-700 placeholder:text-gray-300 focus:outline-none"
              type="email"
              placeholder="Enter your email Address"
            />
            <button
              className={`flex h-[2.5rem] w-[10rem] items-center justify-center rounded-r-sm border border-slate-700 bg-white px-3 py-2 text-center text-sm font-semibold capitalize text-slate-700 transition-all ease-linear hover:bg-slate-700 hover:text-white`}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
