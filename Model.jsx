/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./public/model.glb 
*/

import React from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = React.useRef()
  const { nodes, materials, animations } = useGLTF('/model.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="wall_1" geometry={nodes.wall_1.geometry} material={nodes.wall_1.material} position={[13, -0.099, 0.982]} />
        <mesh name="spear_1" geometry={nodes.spear_1.geometry} material={nodes.spear_1.material} position={[1, 1.775, -0.224]} rotation={[0.842, 0, 0]} />
        <mesh name="planeGround" geometry={nodes.planeGround.geometry} material={nodes.planeGround.material} position={[1, 0, -2]} />
        <mesh name="nArrow" geometry={nodes.nArrow.geometry} material={nodes.nArrow.material} position={[1.166, 1.588, 1.595]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh name="nWall" geometry={nodes.nWall.geometry} material={nodes.nWall.material} position={[5, 0, -2]} />
        <mesh name="ndecor1" geometry={nodes.ndecor1.geometry} material={nodes.ndecor1.material} position={[7.1, 0.002, -2]} />
        <mesh name="ndecor2" geometry={nodes.ndecor2.geometry} material={nodes.ndecor2.material} position={[3, 0.02, -2]} />
        <mesh name="key_1" geometry={nodes.key_1.geometry} material={nodes.key_1.material} position={[13.002, 0.83, -2]} />
        <mesh name="crate_1" geometry={nodes.crate_1.geometry} material={nodes.crate_1.material} position={[9.005, 1.002, -2]} />
        <mesh name="nbarrier" geometry={nodes.nbarrier.geometry} material={nodes.nbarrier.material} position={[14.992, 0.001, -2]}>
          <mesh name="nbarrierplane" geometry={nodes.nbarrierplane.geometry} material={nodes.nbarrierplane.material} position={[11.582, 0.912, -8.009]} rotation={[Math.PI / 2, Math.PI / 2, 0]} />
        </mesh>
        <mesh name="nmob1" geometry={nodes.nmob1.geometry} material={nodes.nmob1.material} position={[10.087, 0.701, -2.005]}>
          <mesh name="nmob1_hand_l" geometry={nodes.nmob1_hand_l.geometry} material={nodes.nmob1_hand_l.material} position={[0.639, -0.473, -0.066]} />
          <mesh name="nmob1_hand_r" geometry={nodes.nmob1_hand_r.geometry} material={nodes.nmob1_hand_r.material} position={[-0.639, -0.494, 0]} />
          <mesh name="nmob1head" geometry={nodes.nmob1head.geometry} material={nodes.nmob1head.material} />
          <mesh name="nmob1horn" geometry={nodes.nmob1horn.geometry} material={nodes.nmob1horn.material} />
        </mesh>
        <mesh name="key2" geometry={nodes.key2.geometry} material={nodes.key2.material} position={[18.002, 1.019, -2.018]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh name="ndoor" geometry={nodes.ndoor.geometry} material={nodes.ndoor.material} position={[20.969, 0.009, -2.018]}>
          <mesh name="door_1_face1" geometry={nodes.door_1_face1.geometry} material={nodes.door_1_face1.material} position={[-0.01, 1.132, -0.693]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[0.862, 1, 0.761]} />
          <mesh name="door_1_face2" geometry={nodes.door_1_face2.geometry} material={nodes.door_1_face2.material} position={[0.705, 1.137, 0.008]} rotation={[0, 0, -Math.PI / 2]} scale={[0.862, 1, 0.75]} />
          <mesh name="door_1_face3" geometry={nodes.door_1_face3.geometry} material={nodes.door_1_face3.material} position={[-0.72, 1.119, 0.024]} rotation={[-Math.PI, 0, Math.PI / 2]} scale={[0.862, 1, 0.75]} />
          <mesh name="door_1_face4" geometry={nodes.door_1_face4.geometry} material={nodes.door_1_face4.material} position={[-0.008, 1.138, 0.736]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[0.862, 1, 0.761]} />
        </mesh>
        <mesh name="pheal_1" geometry={nodes.pheal_1.geometry} material={nodes.pheal_1.material} position={[38, 0.146, -5]} />
        <mesh name="playerBullet_3" geometry={nodes.playerBullet_3.geometry} material={nodes.playerBullet_3.material} position={[40, 1.046, -5]} />
        <mesh name="pmob_1" geometry={nodes.pmob_1.geometry} material={nodes.pmob_1.material} position={[34, 0.007, -3]} />
      </group>
    </group>
  )
}

useGLTF.preload('/model.glb')
