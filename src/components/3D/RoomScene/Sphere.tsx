"use client";

import { JSX } from "react";
import { Float } from "@react-three/drei";

interface SphereProps {
    color?: string;
    floatIntensity?: number;
    position?: [number, number, number];
    scale?: number;
  }
  
  export default function Sphere({
    color = "white",
    floatIntensity = 15,
    position = [0, 5, -8],
    scale = 1,
  }: SphereProps): JSX.Element {
    return (
      <Float floatIntensity={floatIntensity}>
        <mesh castShadow position={position} scale={scale}>
          <sphereGeometry />
          <meshBasicMaterial color={color} />
        </mesh>
      </Float>
    );
  }