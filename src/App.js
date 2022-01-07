import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Box, OrbitControls, useTexture, Text } from "@react-three/drei";
import Grid from "./Grid";
import "./styles.css";

const ids = [1, 26, 38, 79, 106, 107, 108, 109, 110, 111, 112];
const positions = [
  [-3, -3, -3],
  [3, 2, 1],
  [0, 0, 2],
  [-2, 1, 3],
  [0, 2, 0],
  [1, 3, 3],
  [3, 1, 2],
  [1, 1, 1],
  [5, 5, -2],
  [-1, -2, 2],
];

const Light = ({ shoeId, position, intensity }) => {
  const ref = useRef();
  const texture = useTexture(`shoes/${shoeId}.jpg`);
  return (
    <group position={position} ref={ref}>
    <sprite>
      <spriteMaterial attach="material" map={texture} transparent opacity={1} />
    </sprite>
      <pointLight intensity={intensity} decay={2} distance={20} />
    </group>
  );
};

function Image() {
  const texture = useTexture(`shoes/1.jpg`);
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
}

export default function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 2, 10] }}>
        <Suspense
          fallback={
            <Text
              color="white" // default
              anchorX="center" // default
              anchorY="middle" // default
            >
              Loading
            </Text>
          }
        >
          <OrbitControls />
          <directionalLight intensity={0.5} position={[6, 2, 1]} />
          <Grid size={10} />
          {/* <Image /> */}
          {
            ids.map((id, idx) => {
              return (
              <Light key={id} shoeId={id} position={positions[idx]} intensity={2} />
              )
            })
          }
        </Suspense>
      </Canvas>
    </>
  );
}
