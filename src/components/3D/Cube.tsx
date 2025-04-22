"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { RefObject, useMemo, useRef } from "react";
import {
  BoxGeometry,
  BufferGeometry,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  NormalBufferAttributes,
  Object3DEventMap,
  Vector3,
} from "three";

export default function Cube(props: {
  size?: number;
  position?: Vector3 | [number, number, number];
  ref?: RefObject<Mesh<BufferGeometry<NormalBufferAttributes>> | null>;
  groupRef?: RefObject<Group<Object3DEventMap> | null>;
  isFloating?: RefObject<boolean>;
}) {
  const mesh = useRef<Mesh<BufferGeometry<NormalBufferAttributes>>>(null);
  const { viewport } = useThree();

  const floatSpeed = 1.2;
  const floatAmplitude = 0.2;
  const d = useRef<number>(0);

  const geometry = useMemo(() => new BoxGeometry(), []);
  const material = useMemo(
    () =>
      new MeshPhysicalMaterial({
        metalness: 1,
        roughness: 0.01,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0,
        color: "white",
        toneMapped: false,
      }),
    []
  );

  useFrame((state, delta) => {
    const ref = props.ref ? props.ref : mesh;
    if (!ref.current) return;

    ref.current.rotation.y += 0.2 * delta;
    ref.current.rotation.z += 0.2 * delta;

    if (!props.isFloating) return;

    const floatOffset = Math.sin(d.current * floatSpeed) * floatAmplitude;

    if (props.isFloating.current) {
      d.current += 1 * delta;
      d.current %= 360;
      ref.current.position.y = floatOffset;
    } else {
      d.current = 0;
    }
  });

  return (
    <group ref={props.groupRef} scale={viewport.width / 7}>
      <mesh
        ref={props.ref ? props.ref : mesh}
        scale={props.size ? props.size : 1}
        position={props.position ?? [0, 0, 0]}
        geometry={geometry}
        material={material}
      ></mesh>
    </group>
  );
}
