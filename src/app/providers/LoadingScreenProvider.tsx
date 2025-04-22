"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import LoadingScreen from "@/components/LoadingScreen";

export default function LoadingScreenProviders(props: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [renderChildren, setRenderChildren] = useState(false);
  return (
    <main
      className={cn(
        "relative",
        isLoading ? "w-screen h-screen overflow-hidden" : ""
      )}
    >
      <LoadingScreen
        onFinish={() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
          setRenderChildren(true);
        }}
        renderChildren={() => setRenderChildren(true)}
      />
      {props.children}
    </main>
  );
}
