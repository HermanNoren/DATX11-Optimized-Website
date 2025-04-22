"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import type {
  BufferGeometry,
  Group,
  Mesh,
  NormalBufferAttributes,
  Vector3,
} from "three";
import { easing } from "maath";

interface AstrolightModelProps {
  scale?: number;
  position?: Vector3 | [number, number, number];
}

export default function AstrolightModel({
  scale,
  position,
}: AstrolightModelProps) {
  const gltf = useGLTF("/astrolight3d2.glb");
  const { viewport } = useThree();

  const sphere = useRef<Mesh<BufferGeometry<NormalBufferAttributes>>>(null);
  const planeInner = useRef<Mesh<BufferGeometry<NormalBufferAttributes>>>(null);
  const planeOuter = useRef<Mesh<BufferGeometry<NormalBufferAttributes>>>(null);
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!sphere.current) return;

    sphere.current.rotation.y += 0.2 * delta;

    if (!planeInner.current) return;

    planeInner.current.rotation.x -= 0.145 * delta;
    planeInner.current.rotation.y = 0.233 * delta;

    if (!planeOuter.current) return;

    planeOuter.current.rotation.x -= 0.31 * delta;
    planeOuter.current.rotation.y -= 0.233 * delta;

    if (!group.current) return;

    const tx = state.pointer.x * 0.2;
    const ty = -state.pointer.y * 0.2;

    easing.dampE(group.current.rotation, [ty, tx, 0], 0.2, delta);
  });

  return (
    <group ref={group} scale={viewport.width / 7}>
      <mesh
        ref={sphere}
        geometry={gltf.meshes.Icosphere.geometry}
        scale={scale ?? 1}
        position={position ?? [0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          metalness={1}
          roughness={0}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          color="silver"
        />
      </mesh>
      <mesh
        ref={planeInner}
        geometry={gltf.meshes.Plane.geometry}
        scale={scale ?? 1}
        position={position ?? [0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          metalness={1}
          roughness={0}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          color="silver"
        />
      </mesh>
      <mesh
        ref={planeOuter}
        geometry={gltf.meshes.Plane001.geometry}
        scale={scale ?? 1}
        position={position ?? [0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          metalness={1}
          roughness={0}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          color="silver"
        />
      </mesh>
    </group>
  );
}