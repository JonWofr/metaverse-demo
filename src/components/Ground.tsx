import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const WIDTH = 100;
const HEIGHT = 100;

export const Ground = () => {
  const texture = useTexture('/assets/textures/mapTile_022.png');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(WIDTH, HEIGHT);

  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow>
      <planeGeometry args={[WIDTH, HEIGHT]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};
