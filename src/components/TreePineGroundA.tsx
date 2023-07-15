/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 public/assets/models/tree_pineGroundA.glb -o src/components/TreePineGroundA.tsx -t -s -r public
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    tree_pineGroundA: THREE.Mesh
  }
  materials: {
    leafsDark: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/assets/models/tree_pineGroundA.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.tree_pineGroundA.geometry} material={materials.leafsDark} position={[0, -0.05, 0]} />
    </group>
  )
}

useGLTF.preload('/assets/models/tree_pineGroundA.glb')