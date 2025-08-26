import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Background = () => {
  const material = useRef();
  const color = useRef({
    color: "#b3d9ff", // starting baby blue
  });
  const data = useScroll();
  const tl = useRef();

  useFrame(() => {
    if (tl.current) tl.current.progress(data.scroll.current);
    if (material.current) material.current.color = new THREE.Color(color.current.color);
  });

  useEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(color.current, { color: "#212121", duration: 1 }); // light baby blue
    tl.current.to(color.current, { color: "#88cfff", duration: 1 }); // medium baby blue
    tl.current.to(color.current, { color: "#b3d9ff", duration: 1 }); // back to starting
  }, []);

  return (
    <group>
      <Sphere scale={[30, 30, 30]}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
};
