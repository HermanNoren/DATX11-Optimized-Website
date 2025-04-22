"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Cube from "./Cube";
import { RefObject, Suspense } from "react";
import {
  BufferGeometry,
  Group,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
  Vector3,
} from "three";

export default function CubeScene(props: {
  cubeSize?: number;
  cubePosition?: Vector3 | [number, number, number];
  cubeRef?: RefObject<Mesh<BufferGeometry<NormalBufferAttributes>> | null>;
  groupRef?: RefObject<Group<Object3DEventMap> | null>;
  isFloating?: RefObject<boolean>;
}) {
  return (
    <Canvas camera={{ fov: 45 }}>
      <Suspense fallback={null}>
        <Cube
          size={props.cubeSize}
          position={props.cubePosition}
          ref={props.cubeRef}
          groupRef={props.groupRef}
          isFloating={props.isFloating}
        />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
