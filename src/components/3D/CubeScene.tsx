"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Cube from "./Cube";
import { RefObject } from "react";
import {
  BufferGeometry,
  Group,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";

export default function CubeScene(props: {
  cubeSize?: number;
  cubeRef?: RefObject<Mesh<BufferGeometry<NormalBufferAttributes>> | null>;
  groupRef?: RefObject<Group<Object3DEventMap> | null>;
  isFloating?: RefObject<boolean>;
}) {
  return (
    <Canvas camera={{ fov: 45 }}>
      <Cube
        size={props.cubeSize ? props.cubeSize : 1}
        ref={props.cubeRef}
        groupRef={props.groupRef}
        isFloating={props.isFloating}
      />
      <Environment /*files="/skybox.exr"*/ preset="studio" />
    </Canvas>
  );
}