"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useProducts from "@/hooks/data/products/useProducts";
import { SelectGeneric } from "@/app/ui/SelectGeneric";
import Image from "next/image";
import { Tables } from "@/types/database.types";
import { StepProvider, useStep } from "./context/useStep";
import UserInfo from "./userInfo";
import Navbar from "./navbar";
import OrderContent from "./orderContent";


function AddOrderContent() {
  const {step , setStep} = useStep();
  function RenderStep() {
    switch (step) {
      case 1:
        return <UserInfo />;
      case 2:
        return <OrderContent />;
      default:
        return <UserInfo />;

    }

  }
  return (
    <Dialog>
      <DialogTrigger>
        <button className=" w-[7rem] rounded border border-slate-700 bg-slate-100 p-2 px-4 font-bold text-slate-700 duration-300 ease-in-out hover:bg-slate-600 hover:text-slate-200">Add Order</button>
      </DialogTrigger>
      <DialogContent className="w-[30rem]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-row items-center justify-center gap-3">
              <Image
                src="/home/icons/flower_yellow.png"
                alt="Decorative flower"
                height={15}
                width={15}
              />
              <div className="text-xl font-bold uppercase text-color5 sm:text-2xl">
                Add Order
              </div>
              <Image
                src="/home/icons/flower_yellow.png"
                alt="Decorative flower"
                height={15}
                width={15}
              />
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-4 mt-5">
              <Navbar/>
              <div className="px-4">
                <RenderStep/>
              </div>
            </div>

          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>  );

}
export default function AddOrder() {
 return (
  <StepProvider>
    <AddOrderContent />
  </StepProvider>
 )
}
