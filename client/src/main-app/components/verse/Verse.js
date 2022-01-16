import React, { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Box, OrbitControls, useTexture, Text, Ring } from "@react-three/drei";
import Grid from "./Grid";
import { Data } from "../../Data";
import Recommender from "../recommender/Recommender";
import "./Verse.css";

let lastPress = 0;

const onAmazon = (link) => {
  const time = new Date().getTime();
  const delta = time - lastPress;

  const DOUBLE_PRESS_DELAY = 400;
  if (delta < DOUBLE_PRESS_DELAY) {
    window.open(link);
  }
  lastPress = time;
};

const onAssistant = (interact) => {
  const time = new Date().getTime();
  const delta = time - lastPress;

  const DOUBLE_PRESS_DELAY = 400;
  if (delta < DOUBLE_PRESS_DELAY) {
    interact(true);
  }
  lastPress = time;
};

const Light = ({ shoeId, link, position, intensity }) => {
  const ref = useRef();
  const texture = useTexture(`assets/main-app/shoes/${shoeId}.jpg`);
  return (
    <group position={position} ref={ref}>
      <sprite
        onClick={(e) => {
          e.stopPropagation();
          onAmazon(link);
        }}
      >
        <spriteMaterial
          attach="material"
          map={texture}
          transparent={false}
          // transparent
          opacity={1}
        />
      </sprite>
      <pointLight intensity={intensity} decay={2} distance={20} />
    </group>
  );
};

const Sign = ({ position, intensity }) => {
  const ref = useRef();
  const texture = useTexture(`assets/main-app/sign.png`);
  return (
    <group position={position} ref={ref}>
      <sprite scale={[8.2, 5, 5]}>
        <spriteMaterial
          attach="material"
          map={texture}
          transparent
          opacity={1}
        />
      </sprite>
      <pointLight intensity={intensity} decay={2} distance={20} />
    </group>
  );
};

const Assisstant = ({ position, intensity, interact }) => {
  const ref = useRef();
  const texture = useTexture(`assets/main-app/assistant.png`);
  return (
    <group position={position} ref={ref}>
      <sprite
        scale={[10.4, 5, 5]}
        onClick={(e) => {
          e.stopPropagation();
          onAssistant(interact);
        }}
      >
        <spriteMaterial
          attach="material"
          map={texture}
          transparent
          opacity={1}
        />
      </sprite>
      <pointLight intensity={intensity} decay={2} distance={20} />
    </group>
  );
};

const Highlight = ({ position, intensity }) => {
  const ref = useRef();
  const texture = useTexture(`assets/main-app/highlight.png`);
  return (
    <group position={position} ref={ref}>
      <sprite scale={[5, 5, 5]}>
        <spriteMaterial
          attach="material"
          map={texture}
          transparent
          opacity={1}
        />
      </sprite>
      <pointLight intensity={intensity} decay={2} distance={20} />
    </group>
  );
};

export default function Verse() {
  const [openModal, setOpenModal] = useState(false);
  const [highlight, setHighlight] = useState([]);

  return (
    <>
      {openModal ? (
        <Recommender setHighlight={setHighlight} setOpenModal={setOpenModal} />
      ) : undefined}
      <Canvas camera={{ position: [0, 2, 10] }} className="gradient__bg">
        <Suspense
          fallback={
            <Text
              color="white" // default
              anchorX="center" // default
              anchorY="middle"
              fontSize={0.8} // default
            >
              Loading
            </Text>
          }
        >
          <OrbitControls />
          <directionalLight intensity={0.5} position={[6, 2, 1]} />
          <Grid size={10} />
          <Sign position={[3, 20, 0]} intensity={2} />
          <Assisstant
            position={[6, 5, 16]}
            intensity={2}
            interact={setOpenModal}
          />
          {highlight.length === 3 ? (
            <Highlight position={highlight} intensity={2} />
          ) : undefined}

          {Data.map((shoe, index) => {
            console.log(index)
            return (
              <Light
                shoeId={index}
                link={shoe.link}
                position={shoe.feats}
                intensity={2}
              />
            );
          })}
        </Suspense>
      </Canvas>
    </>
  );
}
