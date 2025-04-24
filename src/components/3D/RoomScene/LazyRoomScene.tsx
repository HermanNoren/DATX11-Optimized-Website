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
    let handle: number;
    const callback = () => {
      startTransition(() => setMounted(true));
    };

    if (typeof window.requestIdleCallback === "function") {
      handle = window.requestIdleCallback(callback);
      return () => {
        window.cancelIdleCallback(handle);
      };
    }

    handle = window.setTimeout(callback, 200);
    return () => {
      window.clearTimeout(handle);
    };
  }, []);

  return mounted ? (
    <RoomScene />
  ) : (
    <div style={{ height: "100%", width: "100%" }} />
  );
}
