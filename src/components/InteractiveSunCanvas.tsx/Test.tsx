'use client'

import { Box, OrbitControls, Sphere, Torus } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import {
  Physics,
  RigidBody,
  CuboidCollider,
  InstancedRigidBodies,
  InstancedRigidBodyProps,
  RapierRigidBody,
} from '@react-three/rapier'
import { Suspense, useEffect, useMemo, useRef } from 'react'

const SCALE = 0.2

export default function SunScene() {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
      <OrbitControls enableZoom={false} />
      <Suspense>
        <Physics debug gravity={[0, -20, 0]} colliders={'hull'}>
          {/*
                    <RigidBody colliders="ball" restitution={1} scale={[SCALE, SCALE, SCALE]}>
            <Sphere position={[0, 1, 0]} />
          </RigidBody>
          <RigidBody colliders="ball" restitution={1} scale={[SCALE, SCALE, SCALE]}>
            <Sphere position={[1, 1, 0]} />
          </RigidBody>
          <RigidBody colliders="ball" restitution={1} scale={[SCALE, SCALE, SCALE]}>
            <Sphere position={[1, 0, 0]} />
          </RigidBody>
          <RigidBody colliders="ball" restitution={1} scale={[SCALE, SCALE, SCALE]}>
            <Sphere position={[0, 2, 0]} />
          </RigidBody>
          <RigidBody colliders="ball" restitution={1} scale={[SCALE, SCALE, SCALE]}>
            <Sphere position={[2, 2, 0]} />
          </RigidBody>
          <RigidBody colliders="ball" restitution={1} scale={[SCALE, SCALE, SCALE]}>
            <Sphere position={[2, 0, 0]} />
          </RigidBody>
          */}

          <InstancedSpheres />
          <Borders />
        </Physics>
      </Suspense>
    </Canvas>
  )
}

const COUNT = 10

function InstancedSpheres() {
  const rigidBodies = useRef<RapierRigidBody[]>(null)

  // We can set the initial positions, and rotations, and scales, of
  // the instances by providing an array of InstancedRigidBodyProps
  // which is the same as RigidBodyProps, but with an additional "key" prop.
  const instances = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = []

    for (let i = 0; i < COUNT; i++) {
      instances.push({
        key: 'instance_' + i,
        position: [i / 10, i / 10, 0],
        rotation: [0, 0, 0],
        scale: 0.2,
      })
    }

    return instances
  }, [])

  return (
    <InstancedRigidBodies ref={rigidBodies} instances={instances} colliders="ball">
      <instancedMesh args={[undefined, undefined, COUNT]} count={COUNT} />
    </InstancedRigidBodies>
  )
}

function Borders() {
  const { viewport } = useThree()
  const THICKNESS = 2
  return (
    <>
      <CuboidCollider
        position={[0, viewport.height / 2 + THICKNESS, 0]}
        args={[viewport.width, THICKNESS, 0.5]}
      />
      <CuboidCollider
        position={[0, -viewport.height / 2 - THICKNESS, 0]}
        args={[viewport.width, THICKNESS, 0.5]}
      />
      <CuboidCollider
        position={[viewport.width / 2 + THICKNESS, 0, 0]}
        args={[THICKNESS, viewport.height, 0.5]}
      />
      <CuboidCollider
        position={[-viewport.width / 2 - THICKNESS, 0, 0]}
        args={[THICKNESS, viewport.height, 0.5]}
      />
      <CuboidCollider position={[0, 0, SCALE]} args={[viewport.width, viewport.height, 0]} />
      <CuboidCollider position={[0, 0, -SCALE]} args={[viewport.width, viewport.height, 0]} />
    </>
  )
}
