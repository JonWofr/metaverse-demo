/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 public/assets/models/tree_pineTallB.glb -o src/components/TreePineTallB.tsx -t -s -r public
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Mesh_tree_pineTallB: THREE.Mesh
    Mesh_tree_pineTallB_1: THREE.Mesh
  }
  materials: {
    leafsDark: THREE.MeshStandardMaterial
    woodBarkDark: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/assets/models/tree_pineTallB.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group position={[0, -0.05, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh_tree_pineTallB.geometry} material={materials.leafsDark} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_tree_pineTallB_1.geometry} material={materials.woodBarkDark} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/tree_pineTallB.glb')
