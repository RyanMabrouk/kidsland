"use client";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import useProducts from "@/hooks/data/products/useProducts";
import Image from "next/image";
import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function SearchBar() {
  const [value, setValue] = useState(null as string | null);
  const limit = 6;
  const page = 1;
  const { data: products } = useProducts({
    limit,
    page,
    search: value
      ? {
          column: "title",
          value: value,
        }
      : undefined,
  });
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: value !== null ? "20ch" : "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  const isEmptyResult = !products?.data || products.data.length === 0;
  return (
    <>
      <Search className="relative max-[400px]:w-[50%]">
        <SearchIconWrapper>
          <IoSearchSharp className="z-[70] h-5 w-5 text-slate-500 group-focus-within:text-slate-900" />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search..."
          className={`z-[60] h-9 rounded-3xl border border-gray-400 bg-white placeholder-gray-400 shadow-sm transition-all ease-linear focus-within:shadow-md`}
          inputProps={{ "aria-label": "search" }}
          value={value ?? ""}
          autoFocus={value !== null}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        {value && (
          <div
            className={`absolute  transition-all ease-in duration-200 top-[110%] z-[70] flex h-fit w-[125%] flex-col rounded-b-lg rounded-t-sm bg-white max-[400px]:-right-[70%] max-[400px]:w-[200%] ${
              isEmptyResult ? "min-h-60 w-full right-0 justify-center items-center" : "w-[125%] -right-[12.5%]"
            }`}
          >
            {!isEmptyResult ? (
              products.data?.map((product) => (
                <Link
                  href={`/products/${product?.id}`}
                  key={product?.id}
                  className="flex cursor-pointer flex-row items-start gap-2 border-b border-gray-300 p-2 hover:bg-gray-100"
                  onClick={() => {
                    setValue(null);
                  }}
                >
                  <Image
                    src={product?.image_url ?? ""}
                    alt=""
                    className="overflow-clip rounded-sm bg-clip-border"
                    width={75}
                    height={75}
                  />
                  <div className="mt-2 flex-col">
                    <p className="font-semibold">{product?.title}</p>
                    <p className="line-clamp-2 text-sm">
                      {product?.description}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <Player
                src={
                  "https://lottie.host/85fb7313-2848-45c2-bdb9-2b729f57afc2/AwfmWMtW8n.json"
                }
                className="h-40 w-40"
                loop
                autoplay
              />
            )}
          </div>
        )}
      </Search>
      {value && (
        <div
          onClick={() => {
            setValue(null);
          }}
          className="fixed right-0 top-0 z-[50] h-screen min-w-screen cursor-pointer bg-black opacity-35"
        ></div>
      )}
    </>
  );
}
