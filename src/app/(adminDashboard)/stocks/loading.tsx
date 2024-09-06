"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

export default function Loading() {
  return (
    <div className="ml-[20rem] mt-[10rem]">
      <Player
        className="m-auto"
        autoplay
        loop
        src="/AnimationLoading.json"
        style={{ height: "20rem", width: "20rem" }}
      />
    </div>
  );
}
