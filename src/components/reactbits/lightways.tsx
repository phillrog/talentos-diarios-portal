import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Lines({ count = 40, colors = ['#3b82f6', '#1e40af', '#60a5fa'] }) {
  const lines = useMemo(() => {
    return Array.from({ length: count }, () => {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      )
      const points = []
      for (let i = 0; i < 20; i++) {
        points.push(new THREE.Vector3(i * 0.5, Math.sin(i * 0.3) * 0.5, Math.cos(i * 0.3) * 0.5))
      }
      const curve = new THREE.CatmullRomCurve3(points)
      return {
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.02 + 0.01,
        curve,
        offset: Math.random() * 100
      }
    })
  }, [count, colors])

  return (
    <group>
      {lines.map((line, i) => (
        <Line key={i} {...line} />
      ))}
    </group>
  )
}

function Line({ curve, color, speed, offset }: any) {
    const ref = useRef<THREE.Mesh>(null!) 
  
    useFrame((state) => {
      if (!ref.current) return;
      
      const t = state.clock.getElapsedTime() * speed + offset

      ref.current.position.x = ((t * 2) % 20) - 10
      ref.current.rotation.x = t * 0.2
    })
  
    return (
      <mesh ref={ref}>
        <tubeGeometry args={[curve, 20, 0.01, 8, false]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
    )
  }

export default function Lightways() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'transparent' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <Lines />
      </Canvas>
    </div>
  )
}