'use client'

import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'

export default function Mouse() {
  const { viewport } = useThree()
  const [, api] = useSphere(() => ({ type: 'Kinematic', args: [1] }))

  useFrame((state) =>
    api.position.set(
      (state.pointer.x * viewport.width) / 2,
      (state.pointer.y * viewport.height) / 2,
      0,
    ),
  )

  return null
}

/*

export default function Mouse() {
  const { viewport } = useThree()

  // Store dynamic radius in React state
  const [radius, setRadius] = useState(1)

  // Track last pointer‐world pos & time to compute speed
  const prev = useRef({ x: 0, y: 0, t: 0 })

  // Recreate the kinematic sphere whenever `radius` changes
  const [, api] = useSphere(
    () => ({
      type: 'Kinematic',
      args: [radius],
    }),
    undefined,
    // dependency array ensures hook tears down+rebuilds body when radius updates
    [radius],
  )

  useFrame((state) => {
    const { pointer, clock } = state
    const now = clock.getElapsedTime()

    // Map NDC pointer coords → world coords
    const x = (pointer.x * viewport.width) / 2
    const y = (pointer.y * viewport.height) / 2

    // Compute delta‐time & speed
    const dt = now - prev.current.t
    let speed = 0
    if (dt > 0) {
      const dx = x - prev.current.x
      const dy = y - prev.current.y
      speed = Math.hypot(dx / dt, dy / dt)
    }

    // Remap speed → [minR, maxR]
    const minR = 0.1
    const maxR = 1
    const maxSpeed = 10
    const t = THREE.MathUtils.clamp(speed / maxSpeed, 0, 1)
    const newR = THREE.MathUtils.lerp(minR, maxR, t)

    // Update state (this will trigger useSphere to rebuild with new radius)
    setRadius(newR)

    // Teleport the kinematic body to follow the pointer
    api.position.set(x, y, 0)

    // Save for next frame
    prev.current = { x, y, t: now }
  })

  return null
}
*/
