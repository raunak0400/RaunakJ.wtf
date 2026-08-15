"use client";

/* eslint-disable react-hooks/immutability -- react-three-fiber's performance model requires
   mutating three.js objects (including the camera returned by useThree()) directly inside
   useFrame rather than routing every frame through React state. */

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { techNodes, techEdges, techCategoryColor, type TechNode } from "@/content/profile";

interface SceneProps {
  progressRef: React.MutableRefObject<number>;
}

const BASE_COLOR = new THREE.Color("#35363f");
const OFF_EMISSIVE = new THREE.Color("#000000");

function Node({
  node,
  index,
  total,
  progressRef,
}: {
  node: TechNode;
  index: number;
  total: number;
  progressRef: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const activeColor = useMemo(
    () => new THREE.Color(techCategoryColor[node.category]),
    [node.category],
  );
  const threshold = index / Math.max(total - 1, 1);

  useFrame((state, delta) => {
    const progress = progressRef.current;
    const active = progress >= threshold - 0.02;
    const t = state.clock.elapsedTime;

    if (meshRef.current) {
      meshRef.current.position.y = node.position[1] + Math.sin(t * 0.6 + index * 1.7) * 0.06;
      const targetScale = active ? 1 : 0.7;
      const nextScale = THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 4, delta);
      meshRef.current.scale.setScalar(nextScale);
    }
    if (materialRef.current) {
      materialRef.current.color.lerp(active ? activeColor : BASE_COLOR, 0.06);
      materialRef.current.emissive.lerp(active ? activeColor : OFF_EMISSIVE, 0.06);
      materialRef.current.emissiveIntensity = THREE.MathUtils.damp(
        materialRef.current.emissiveIntensity,
        active ? 0.9 : 0,
        4,
        delta,
      );
    }
  });

  return (
    <group position={node.position}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.16, 1]} />
        <meshStandardMaterial ref={materialRef} color={BASE_COLOR} roughness={0.35} metalness={0.4} />
      </mesh>
      <Html center distanceFactor={7} style={{ pointerEvents: "none" }}>
        <span className="border-ink-700 bg-void/70 text-paper whitespace-nowrap rounded-full border px-2 py-1 font-mono text-[9px] tracking-[0.15em] uppercase backdrop-blur-sm">
          {node.label}
        </span>
      </Html>
    </group>
  );
}

function Edge({
  from,
  to,
  threshold,
  progressRef,
}: {
  from: [number, number, number];
  to: [number, number, number];
  threshold: number;
  progressRef: React.MutableRefObject<number>;
}) {
  const lineRef = useRef<{ material: THREE.Material & { opacity: number } } | null>(null);

  useFrame((_, delta) => {
    const progress = progressRef.current;
    const active = progress >= threshold - 0.02;
    const material = lineRef.current?.material;
    if (material) {
      material.opacity = THREE.MathUtils.damp(material.opacity, active ? 0.45 : 0.04, 4, delta);
    }
  });

  return (
    // @ts-expect-error -- drei's Line ref type is polymorphic across segment/fat-line modes
    <Line ref={lineRef} points={[from, to]} color="#0a84ff" transparent opacity={0.04} lineWidth={1} />
  );
}

function Rig({
  progressRef,
  children,
}: {
  progressRef: React.MutableRefObject<number>;
  children: React.ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
    const targetZ = THREE.MathUtils.lerp(10, 7.5, progressRef.current);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2, delta);
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function TechStackScene({ progressRef }: SceneProps) {
  const nodeById = useMemo(
    () => new Map(techNodes.map((node, index) => [node.id, { node, index }])),
    [],
  );

  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#0a84ff" />
      <pointLight position={[-5, -3, -5]} intensity={18} color="#ff6a39" />

      <Rig progressRef={progressRef}>
        {techEdges.map(([fromId, toId]) => {
          const fromEntry = nodeById.get(fromId);
          const toEntry = nodeById.get(toId);
          if (!fromEntry || !toEntry) return null;
          const threshold =
            Math.max(fromEntry.index, toEntry.index) / Math.max(techNodes.length - 1, 1);
          return (
            <Edge
              key={`${fromId}-${toId}`}
              from={fromEntry.node.position}
              to={toEntry.node.position}
              threshold={threshold}
              progressRef={progressRef}
            />
          );
        })}

        {techNodes.map((node, index) => (
          <Node
            key={node.id}
            node={node}
            index={index}
            total={techNodes.length}
            progressRef={progressRef}
          />
        ))}
      </Rig>
    </Canvas>
  );
}
