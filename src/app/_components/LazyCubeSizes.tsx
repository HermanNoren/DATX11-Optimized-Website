"use client";

import dynamic from "next/dynamic";

const CubeSizes = dynamic(() => import("./CubeSizes"), {
  ssr: false,
  loading: () => <p>Loading Cube Sizes…</p>,
});

export default function LazyCubeSizes() {
  return <CubeSizes />;
}
