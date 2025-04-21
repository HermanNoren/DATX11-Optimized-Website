"use client";

import { Canvas } from "@react-three/fiber";
import { SoftShadows, CameraControls, Sky } from "@react-three/drei";
import { useControls } from "leva";
import Light from "./Light";
import Room from "./Room";
import Sphere from "./Sphere";
import RoomCube from "./RoomCube";

export default function RoomScene() {
  /*
  const { enabled, ...config } = useControls({
    debug: true,
    enabled: false,
    size: { value: 35, min: 0, max: 100, step: 0.1 },
    focus: { value: 0.5, min: 0, max: 2, step: 0.1 },
    samples: { value: 15, min: 1, max: 100, step: 1 },
  }); */
  return (
    <Canvas shadows camera={{ position: [5, 2, 3.5], fov: 50 }}>
      <CameraControls
        makeDefault
        dollySpeed={0}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />
      {/*{enabled && <SoftShadows {...config} />}*/}
      <color attach="background" args={["#d0d0d0"]} />
      <ambientLight intensity={1} />
      <Light pos={[5, 5, -8]} intensity={50} />
      <Room scale={0.5} position={[0, -1, 0]} />
      <RoomCube scale={0.75} position={[0.25, -0.215, -0.25]} />
      <Sphere />
      <Sphere position={[2, 4, -8]} scale={0.9} />
      <Sphere position={[-2, 2, -8]} scale={0.8} />
      <Sky inclination={0.52} />
    </Canvas>
  );
}
