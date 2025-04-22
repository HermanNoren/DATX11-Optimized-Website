"use client";

import { useState, useEffect, startTransition } from "react";
import dynamic from "next/dynamic";

const RoomScene = dynamic(() => import("./RoomScene"), {
  ssr: false,
  loading: () => <p>Loading room…</p>,
});

export default function LazyRoomScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = (
      "requestIdleCallback" in window
        ? requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 200)
    )(() => {
      startTransition(() => setMounted(true));
    });
    return () => {
      if ("cancelIdleCallback" in window) cancelIdleCallback(handle);
      else clearTimeout(handle);
    };
  }, []);

  return mounted ? (
    <RoomScene />
  ) : (
    <div style={{ height: "100%", width: "100%" }} />
  );
}
