import { Controls } from '@/app/page';
import { PointerLockControls, useKeyboardControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MOVEMENT_SPEED = 5;

export const FirstPersonControls = () => {
  const [_, getKeyboardControls] = useKeyboardControls<Controls>();
  const camera = useThree((state) => state.camera);

  useFrame((_, delta) => {
    move(delta);
  });

  const move = (delta: number) => {
    const { forward, backward, left, right } = getKeyboardControls();
    const velocityX =
      (left && !right ? -MOVEMENT_SPEED : !left && right ? MOVEMENT_SPEED : 0) *
      delta;
    const velocityZ =
      (forward && !backward
        ? MOVEMENT_SPEED
        : !forward && backward
        ? -MOVEMENT_SPEED
        : 0) * delta;

    const newCameraPosition = new THREE.Vector3();
    camera.getWorldPosition(newCameraPosition);

    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);

    // Retrieve the vector that is perpendicular to the camera direction and the y-axis in order to be able to move left/right
    const cameraDirectionNormal = new THREE.Vector3().copy(cameraDirection);
    const yAxis = new THREE.Vector3(0, 1, 0);
    cameraDirectionNormal.cross(yAxis);

    newCameraPosition.add(
      new THREE.Vector3(cameraDirectionNormal.x, 0, cameraDirectionNormal.z)
        .normalize()
        .multiplyScalar(velocityX)
    );
    newCameraPosition.add(
      new THREE.Vector3(cameraDirection.x, 0, cameraDirection.z)
        .normalize()
        .multiplyScalar(velocityZ)
    );

    camera.position.copy(newCameraPosition);
  };

  return <PointerLockControls />;
};
