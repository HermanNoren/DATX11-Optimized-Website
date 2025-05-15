'use client'

import { useThree } from '@react-three/fiber'
import Plane from './Plane'

export default function Borders() {
  const { viewport } = useThree()
  return (
    <>
      {/*<Plane position={[0, viewport.height / 2, 0]} rotation={[Math.PI / 2, 0, 0]} />*/}
      <Plane position={[0, viewport.height / 2, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <Plane position={[0, -viewport.height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <Plane position={[-viewport.width / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Plane position={[viewport.width / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Plane position={[0, 0, -1]} rotation={[0, 0, 0]} />
      <Plane position={[0, 0, 1]} rotation={[0, -Math.PI, 0]} />
    </>
  )
}
