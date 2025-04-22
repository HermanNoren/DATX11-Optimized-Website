"use client";

import { Canvas } from "@react-three/fiber";
import { CameraControls, Sky } from "@react-three/drei";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Room = dynamic(() => import("./Room"), { ssr: false });
const RoomCube = dynamic(() => import("./RoomCube"), { ssr: false });
const Sphere = dynamic(() => import("./Sphere"), { ssr: false });
const Light = dynamic(() => import("./Light"), { ssr: false });

export default function RoomScene() {
  return (
    <Canvas
      shadows
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ position: [5, 2, 3.5], fov: 50 }}
    >
      <Suspense fallback={null}>
        <CameraControls
          makeDefault
          dollySpeed={0}
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
      <Suspense fallback={null}></Suspense>

      <Suspense fallback={null}>
        <color attach="background" args={["#d0d0d0"]} />
      </Suspense>

      <Suspense fallback={null}>
        <ambientLight intensity={1} />
      </Suspense>

      <Suspense fallback={null}>
        <Light pos={[5, 5, -8]} intensity={50} />
      </Suspense>

      <Suspense fallback={null}>
        <Room scale={0.5} position={[0, -1, 0]} />
      </Suspense>

      <Suspense fallback={null}>
        <RoomCube scale={0.75} position={[0.25, -0.215, -0.25]} />
      </Suspense>

      <Suspense fallback={null}>
        <Sphere />
        <Sphere position={[2, 4, -8]} scale={0.9} />
        <Sphere position={[-2, 2, -8]} scale={0.8} />
      </Suspense>

      <Suspense fallback={null}>
        <Sky inclination={0.52} />
      </Suspense>
    </Canvas>
  );
}
