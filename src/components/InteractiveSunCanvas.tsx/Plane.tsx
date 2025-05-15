'use client'

import { PlaneProps, Triplet, usePlane } from '@react-three/cannon'
import { useEffect } from 'react'

interface PlaneComponentProps extends PlaneProps {
  /** initial position as [x, y, z] */
  position?: Triplet
}

export default function Plane({ position = [0, 0, 0], ...props }: PlaneComponentProps) {
  const [, api] = usePlane(() => ({ ...props }))
  useEffect(() => api.position.set(...position), [api, position])

  return null
}
