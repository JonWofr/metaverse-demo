'use client';

import { Experience } from '@/components/Experience';
import { HUD } from '@/components/HUD';
import { KeyboardControlsEntry, KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export type Controls = 'forward' | 'backward' | 'left' | 'right' | 'interact';

export default function Home() {
  const map: KeyboardControlsEntry<Controls>[] = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'interact', keys: ['KeyE'] },
  ];

  return (
    <main className="h-screen">
      <Canvas shadows camera={{ position: [0, 1, 2] }}>
        <KeyboardControls map={map}>
          <Experience />
        </KeyboardControls>
      </Canvas>
      <HUD />
    </main>
  );
}
