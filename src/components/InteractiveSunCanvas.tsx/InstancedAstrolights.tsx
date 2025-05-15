"use client";

import * as THREE from "three";
import { useLayoutEffect, useMemo } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { TextureLoader } from "three";

export default function InstancedAstrolights() {
  const astroTex = useLoader(TextureLoader, "/astrolight_3d.png");
  astroTex.format = THREE.RGBAFormat;

  const instances = 250;
  const scale = 0.4;

  const planeGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1, 1);
    geo.rotateX(Math.PI);
    return geo;
  }, []);

  const { viewport } = useThree();
  const [ref, api] = useSphere((i) => ({
    mass: 200,
    args: [scale / 2.2],
    //position: [4 - Math.random() * 8, viewport.height / 1.2 + Math.random() * 0.1, 0],
    position: [4 - Math.random() * 8, viewport.height / 3, 0],
    linearFactor: [1, 1, 0],
  }));

  // scale each instance
  useLayoutEffect(() => {
    for (let i = 0; i < instances; i++) {
      api.at(i).scaleOverride([scale, scale, scale]);
    }
  }, [api, instances]);

  return (
    <instancedMesh ref={ref} args={[planeGeo, undefined, instances]}>
      <meshBasicMaterial
        map={astroTex}
        toneMapped={false}
        transparent
        alphaTest={0.5}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}
