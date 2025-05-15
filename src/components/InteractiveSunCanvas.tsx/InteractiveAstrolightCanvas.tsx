"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import Mouse from "./Mouse";
import InstancedAstrolights from "./InstancedAstrolights";
import Borders from "./Borders";

export default function InteractiveAstrolightCanvas() {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
      <Physics gravity={[0, -20, 0]}>
        <group position={[0, 0, -10]}>
          <Mouse />
          <Borders />
          <InstancedAstrolights />
        </group>
      </Physics>
    </Canvas>
  );
}
