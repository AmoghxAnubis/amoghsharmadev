'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import { skills } from '@/data/portfolio';
import * as THREE from 'three';

// ─── Single floating label on the sphere ──────────────────
function SkillLabel({ text, position, color }) {
  return (
    <Text
      position={position}
      fontSize={0.2}
      color={color}
      anchorX="center"
      anchorY="middle"
      fillOpacity={0.9}
      fontWeight={600}
    >
      {text}
    </Text>
  );
}

// ─── Slowly rotating group containing all labels ──────────
function SkillSphere() {
  const groupRef = useRef();

  // Flatten all skills and compute positions on a sphere
  const labels = useMemo(() => {
    const allSkills = skills.flatMap((cat) =>
      cat.items.map((item) => ({
        name: item.name,
        color: cat.color,
      }))
    );

    const radius = 3.5;
    const count = allSkills.length;

    return allSkills.map((skill, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      return {
        ...skill,
        position: [x, y, z],
      };
    });
  }, []);

  // Gentle idle rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {labels.map((label, i) => (
        <SkillLabel
          key={i}
          text={label.name}
          position={label.position}
          color={label.color}
        />
      ))}
    </group>
  );
}

// ─── Exported component with Canvas ───────────────────────
export default function SkillOrb() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000000, 0);
        scene.background = null;
      }}
    >
      <ambientLight intensity={0.6} />
      <SkillSphere />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </Canvas>
  );
}
