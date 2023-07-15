import { Model as AdvancedCharacter } from './AdvancedCharacter';
import SpeechBubble from './SpeechBubble';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboardControls } from '@react-three/drei';
import { Controls } from '@/app/page';
import { useAccount } from 'wagmi';
import { useMint } from '@/hooks/useMint';

export const Vendor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [distanceToCamera, setDistanceToCamera] = useState(0);
  const { camera } = useThree();
  const advancedCharacterRef = useRef<THREE.Group>(null);
  const [subscribeToKeyboardEvents, getKeyboardControls] =
    useKeyboardControls<Controls>();
  const { isConnected } = useAccount();
  const { transactionStatus, setTransactionStatus, mint } = useMint();

  useFrame(() => {
    const { forward, backward, left, right } = getKeyboardControls();
    if (forward || backward || left || right) {
      updateDistanceToCamera();
    }
  });

  useEffect(() => {
    if (
      !isConnected ||
      !isHovered ||
      distanceToCamera >= 3.5 ||
      transactionStatus === 'confirming' ||
      transactionStatus === 'minting'
    )
      return;

    return subscribeToKeyboardEvents(
      (state) => state.interact,
      (isPressed) => {
        if (isPressed) {
          if (mint) {
            mint();
            setTransactionStatus('confirming');
          }
        }
      }
    );
  }, [
    subscribeToKeyboardEvents,
    isConnected,
    isHovered,
    distanceToCamera,
    mint,
    setTransactionStatus,
    transactionStatus,
  ]);

  const onPointerOver = () => {
    setIsHovered(true);
  };

  const onPointerOut = () => {
    setIsHovered(false);
  };

  const updateDistanceToCamera = () => {
    const advancedCharacter = advancedCharacterRef.current;
    if (!advancedCharacter)
      throw new Error('Ref for advanced character is not set');

    const distance = getDistanceToCamera(advancedCharacter);
    setDistanceToCamera(distance);
  };

  const getDistanceToCamera = (advancedCharacter: THREE.Group) => {
    const cameraPosition = new THREE.Vector3();
    camera.getWorldPosition(cameraPosition);
    const distance = cameraPosition.distanceTo(advancedCharacter.position);
    return distance;
  };

  return (
    <AdvancedCharacter
      scale={0.08}
      rotation={[0, -0.1, 0]}
      position={[0.7508242325314055, 0, -0.9590807472709626]}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      ref={advancedCharacterRef}
    >
      {isHovered && distanceToCamera < 3.5 && (
        <SpeechBubble
          position={[2.54, 21.54, 2.2]}
          transactionStatus={transactionStatus}
        />
      )}
    </AdvancedCharacter>
  );
};
