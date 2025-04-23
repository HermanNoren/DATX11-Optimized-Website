"use client";

import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  Environment,
} from "@react-three/drei";
import { Vector3 } from "three";
import AstrolightModel from "./AstrolightModel";


interface AstrolightSceneProps {
  scale?: number;
  position?: Vector3 | [number, number, number];
}

export default function AstrolightScene({
  scale,
  position,
}: AstrolightSceneProps) {
  return (
    <Canvas className="hover:cursor-grab" shadows camera={{ fov: 45 }}>
      <AstrolightModel scale={scale} position={position} />
      <CameraControls
        makeDefault
        dollySpeed={0}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      <directionalLight
        position={[5, 5, -15]}
        castShadow
        intensity={50}
        shadow-mapSize={2048}
        shadow-bias={-0.001}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
        />
      </directionalLight>
      <directionalLight
        position={[5, 5, 15]}
        castShadow
        intensity={50}
        shadow-mapSize={2048}
        shadow-bias={-0.001}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
        />
      </directionalLight>
      <Environment preset="studio" />
    </Canvas>
  );
}
