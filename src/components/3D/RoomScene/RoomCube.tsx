"use client";

import { CubeCamera } from "@react-three/drei";
import type { Texture, Vector3 } from "three";

interface CubeProps {
  scale: number;
  position: Vector3 | [number, number, number];
}

export default function RoomCube({ scale, position }: CubeProps) {
  return (
    <CubeCamera receiveShadow resolution={1028} frames={1}>
      {(texture: Texture | Readonly<Texture | null | undefined>) => (
        <mesh scale={scale} position={position} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            envMap={texture}
            metalness={1}
            roughness={0.05}
            color="silver"
            reflectivity={1}
            clearcoat={1}
            clearcoatRoughness={0.5}
          />
        </mesh>
      )}
    </CubeCamera>
  );
}