import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Enviroment Site",
    url: "https://environmentsolutions.ro",
    image: "projects/enviroment.jpeg",
    description:
      "Developed a responsive business website for Environment Solutions, featuring a modern UI, optimized performance, and a clean presentation of services.",
  },
  {
    title: "Restaurant Website ",
    url: "https://lafratirestaurant.com",
    image: "projects/fastfood.jpeg",
    description:
      "Built a fully responsive front-end website for a fast-food restaurant with React, Vite, and Tailwind CSS, including image galleries and smooth animations.",
  },
  {
    title: "Booking Platform ",
    url: "https://nailsbykarina.com",
    image: "projects/nails.jpeg", // (fixed extension)
    description:
      "Created a full-stack booking platform for a nail salon with React, Node.js, and MongoDB. Implemented appointment scheduling, authentication, and admin management.",
  },
  {
    title: "Full-Stack Rent App",
    url: "https://github.com/AnnaIon/rentApp_Fullstack",
    image: "projects/rentapp.jpeg",
    description:
      "Developed a full-stack MERN application for apartment rentals. Features include user authentication, favorites, chat system, admin dashboard, and property management.",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    if (background.current)
      background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        {/* Bigger container */}
        <planeGeometry args={[4, 5]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>

      {/* Bigger image */}
      <Image
        scale={[3, 1.8, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.5}
      />

      <Text
        maxWidth={3.2} // slightly wider than image width
        anchorX="center"
        anchorY="center"
        fontSize={0.3}
        position={[0, -0.8, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={3.2}
        anchorX="center"
        anchorY="top" // so text starts below the title
        fontSize={0.15}
        position={[0, -1.1, 0.1]} // slightly adjusted
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(0);

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  const gap = 4.5;

  return (
    <group position-y={-viewport.height * 2 - 1.1}>
      {projects.map((project, index) => {
        const offset = index - currentProject; // relative position to highlighted project
        return (
          <motion.group
            key={"project_" + index}
            position={[offset * gap, 0, offset === 0 ? 0 : -1]} // z = 0 for main, -1 for others
            animate={{
              x: offset * gap,
              y: 0,
              z: offset === 0 ? 0 : -1,
            }}
          >
            <Project project={project} highlighted={offset === 0} />
          </motion.group>
        );
      })}
    </group>
  );
};

