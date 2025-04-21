import React, { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh, Material } from "three";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: Mesh;
    Object_3: Mesh;
    Object_4: Mesh;
    Object_6: Mesh;
    Object_7: Mesh;
    Object_8: Mesh;
    Object_9: Mesh;
    Object_10: Mesh;
    Object_11: Mesh;
    Object_12: Mesh;
    Object_13: Mesh;
    Object_14: Mesh;
    Object_15: Mesh;
    Object_17: Mesh;
    Object_18: Mesh;
  };
  materials: {
    Material: Material;
    "Material.002": Material;
    "Material.003": Material;
    "Material.005": Material;
    "Material.006": Material;
    "Material.004": Material;
    krzeslo_1: Material;
    krzeslo_okno: Material;
    krzeslo_prawe: Material;
    krzeslo_srodek: Material;
    podloga: Material;
    sciana_okno: Material;
    "stolik.001": Material;
    mata: Material;
    stolik: Material;
  };
};

export default function Room(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/room_model.glb"
  ) as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials.krzeslo_1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials.krzeslo_okno}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials.krzeslo_prawe}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_9.geometry}
          material={materials.krzeslo_srodek}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_10.geometry}
          material={materials.podloga}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_11.geometry}
          material={materials.sciana_okno}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_12.geometry}
          material={materials["stolik.001"]}
        />
        <mesh geometry={nodes.Object_13.geometry}>
          <meshStandardMaterial transparent opacity={0.5} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_14.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_15.geometry}
          material={materials["Material.005"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_17.geometry}
          material={materials.mata}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_18.geometry}
          material={materials.stolik}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/room_model.glb");